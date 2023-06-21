const fs = require('fs')
const path = require('path')
const request = require('request')
const playwright = require('playwright')
const chromium = playwright.chromium

const owner = 'levy9527'
const repo = 'image-holder'
const githubPrefix = `https://raw.githubusercontent.com/${owner}/${repo}/main/`

const yuquePrefix = 'https://cdn.nlark.com'
const imageDir = 'download-images'
const imageSuffix = 'png'

const accessToken = process.env.GITHUB_TOKEN
if (!accessToken) {
  console.error('GITHUB_TOKEN is undefined')
  process.exit(1)
}
let pathToMarkdownFile
if (process.argv.length < 3) {
  console.error('Markdown file is not specified')
  process.exit(1)
}
pathToMarkdownFile = process.argv[2]
if (!fs.existsSync(pathToMarkdownFile)) {
  console.error('Markdown file is not exist')
  process.exit(1)
}

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}
const args = require('minimist')(process.argv.slice(2))

console.log('Processing ', pathToMarkdownFile)

replaceLocalImagesInMarkdown()
replaceYuqueImagesInMarkdown()

/**
 upload download-images/img*.png
 get its github url
 find local images by startWiths(../)
 replace
 remove local images
*/
async function replaceLocalImagesInMarkdown() {
  let markdownContent = fs.readFileSync(pathToMarkdownFile).toString()
  let imageUrls = extractImageUrls(markdownContent, '../')
  if (!imageUrls.length) {
    console.log('No local image need to be replaced!')
    return
  }

  const directoryPath = path.join(__dirname, imageDir);
  const localImages = fs.readdirSync(directoryPath)

  if (imageUrls.length !== localImages.length) {
    console.error('Markdown images count is not equal to local images count', imageUrls.length, localImages.length)
    process.exit(1)
  }
  for (let i = 0; i < localImages.length; i++) {
    const imageUrl = imageUrls[i]
    const imagePath = imageDir + '/' + localImages[i]

    let retry = true
    while (retry)	{
      try {
        githubImageUrl = await uploadImage(imagePath, pathToMarkdownFile)
        retry = false
      } catch(e) {
        console.log(e, '\nRetry uploading')
      }
    }

    githubImageUrl = githubImageUrl.replace('githubusercontent', 'gitmirror')
    markdownContent = markdownContent.replace(imageUrl, githubImageUrl)

    console.log('Rewriting md file...\n')
    fs.writeFileSync(pathToMarkdownFile, markdownContent)
  }

  // TODO delete images
  console.log('Replacing local images is done!')
}

async function replaceYuqueImagesInMarkdown(isLocal) {
  let markdownContent = fs.readFileSync(pathToMarkdownFile).toString()
  const imageUrls = extractImageUrls(markdownContent, yuquePrefix)
  const directoryPath = path.join(__dirname, imageDir);
  const localImages = fs.readdirSync(directoryPath)

  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i]
    if (imageUrl.startsWith(yuquePrefix)) {
      const imagePath = imageDir + '/' + new Date().getTime() + '.' + imageSuffix
      try {
        let githubImageUrl = ''
        if (!isLocal) {
          console.log('Downloading image: ', imageUrl)
          await downloadImage(imageUrl, imagePath)

          let retry = true
          while (retry)	{
            try {
              githubImageUrl = await uploadImage(imagePath, pathToMarkdownFile)
              retry = false
            } catch(e) {
              console.log(e, '\nRetry uploading')
            }
          }
        }
        else {
          console.log('Using local image...')
          if (localImages[i]) {
            githubImageUrl = githubPrefix + getDirWithForwardSlash(pathToMarkdownFile) + getFileName(localImages[i])
          }
          else {
            break;
          }
        }
        // use proxy address
        githubImageUrl = githubImageUrl.replace('githubusercontent', 'gitmirror')
        markdownContent = markdownContent.replace(imageUrl, githubImageUrl)

        // save ASAP, in case of github api connecting timeout
        console.log('Rewriting md file...\n')
        fs.writeFileSync(pathToMarkdownFile, markdownContent)
      } catch(e) {
        console.error(e)
        process.exit(1)
      }
    }
  }

  // TODO remove all local images
  console.log('Replacing all images is done!')
}


async function downloadImage(imageUrl, imagePath) {
  const browser = await chromium.launch({headless: !args['headed']});
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

function extractImageUrls (markdownContent, imagePrefix) {
  const imageMarks = markdownContent.match(/!\[.*\]\((.+)\)/g)
  if (!imageMarks) {
    console.log('No image needs to be replaced!')
    process.exit(0)
  }

  return imageMarks.map(mark => {
    // mark format: ![](url)
    const array = mark.split('(')
    const imgFullUrl = array[1].substring(0, array[1].length - 1)
    return imgFullUrl
    //return imgFullUrl.split('#')[0]
  }).filter(v => v.startsWith(imagePrefix))
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
