const fs = require('fs')
const path = require('path')
const request = require('request')
const playwright = require('playwright')
const chromium = playwright.chromium

const owner = 'levy9527'
const repo = 'image-holder'
const githubPrefix = `https://raw.githubusercontent.com/${owner}/${repo}/main/`

const sourcePrefix = 'https://cdn.nlark.com'
const pathToMarkdownFile = 'docs/tools/how-to-connect-to-internet.md'
const imageDir = 'images/'
const imageSuffix = 'png'

const accessToken = process.env.GITHUB_TOKEN
if (!accessToken) {
  console.error('GITHUB_TOKEN is undefined')
  process.exit(1)
}

async function downloadImage(imageUrl, imagePath) {
  const browser = await chromium.launch({headless: true});
  const context = await browser.newContext();
  const page = await context.newPage();

  const downloadPromise = page.waitForEvent('download');

  try {
    await page.goto(imageUrl);
  } catch(e) {
    // yuque 特殊情况处理：load 事件不会触发，只会直接下载图片
  }

  const download = await downloadPromise;
  console.log('downloaded', await download.path());
  await download.saveAs(imagePath);

  // Teardown
  await context.close();
  await browser.close();
}

async function uploadImage(imagePath, pathToMarkdownFile) {
  const content = fs.readFileSync(imagePath)
  const encodedContent = content.toString('base64')
  const distPath = getDirWithForwardSlash(pathToMarkdownFile) + getFileName(imagePath)

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${distPath}`
  const headers = {
    Authorization: `token ${accessToken}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'request',
  }
  const data = {
    message: 'Add image',
    content: encodedContent,
  }

  console.log(`Uploading image: ${imagePath}`)

  return new Promise((resolve, reject) => {
    request.put(
      {
        url,
        headers,
        body: JSON.stringify(data),
      },
      (error, response) => {
        if (error) {
          reject(error)
        } else {
          //console.log(JSON.parse(response.body))
          const githubImageUrl = JSON.parse(response.body).content.download_url
          console.log(`Uploaded image ${imagePath} to ${githubImageUrl}`)
          resolve(githubImageUrl)
        }
      }
    )
  })
}

function extractImageUrls (markdownContent) {
  const imageMarks = markdownContent.match(/!\[.*\]\((.+)\)/g)

  return imageMarks.map(mark => {
    // mark format: ![](url)
    const array = mark.split('(')
    const imgFullUrl = array[1].substring(0, array[1].length - 1)
    return imgFullUrl
    //return imgFullUrl.split('#')[0]
  })
}

async function replaceImagesInMarkdown(isLocal) {
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
  }
  let markdownContent = fs.readFileSync(pathToMarkdownFile).toString()
  const imageUrls = extractImageUrls(markdownContent)
  const localImages = fs.readdirSync(directoryPath)

  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i]
    if (imageUrl.startsWith(sourcePrefix)) {
      const imagePath = imageDir + new Date().getTime() + '.' + imageSuffix
      try {
        let githubImageUrl = ''
        if (!isLocal) {
          console.log('Downloading image file...')
          await downloadImage(imageUrl, imagePath)
          githubImageUrl = await uploadImage(imagePath, pathToMarkdownFile)
        }
        else {
          console.log('Using local image file...')
          const directoryPath = path.join(__dirname, imageDir);
          if (localImages[i]) {
            githubImageUrl = githubPrefix + getDirWithForwardSlash(pathToMarkdownFile) + getFileName(localImages[i])
          }
          else {
            break;
          }
        }
        markdownContent = markdownContent.replace(imageUrl, githubImageUrl)
      } catch(e) {
        console.error(e)
        process.exit(1)
      }
    }
  }

  console.log('rewriting md file...')
  fs.writeFileSync(pathToMarkdownFile, markdownContent)
  console.log('replacing images done!')
}

function getDirWithForwardSlash(path) {
  if (!path) return ''
  let lastSlashIndex = path.lastIndexOf('/');
  //substring exclusive end
  return path.substring(0, lastSlashIndex + 1);
}

function getFileName(path) {
  if (!path) return ''
  let lastSlashIndex = path.lastIndexOf('/');
  return path.substring(lastSlashIndex + 1);
}

replaceImagesInMarkdown()

