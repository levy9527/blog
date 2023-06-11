const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')
const docsDir = 'docs'

const patterns = [`${docsDir}/**/*.md`]
const docs = new Set(fg.sync(patterns))

let sidebar = []

// 生成 sidebar 数组
function generateSidebar() {
  let _sidebar = []
  const folders = fs.readdirSync(docsDir, { encoding: 'utf-8' })
	const isDirFile = (fullpath, dir) => fullpath.split('/')[1] == dir

  _sidebar = folders.map(folder => ({collapsable: false, children: [], folder}))

  docs.forEach(doc => {
    const name = path.basename(doc, '.md')

    _sidebar.forEach(item => {
      // 如果文件名以 '_' 开头说明是侧边栏的标题文件
      if (name.startsWith('_') && isDirFile(doc, item.folder)) {
        item.title = fs.readFileSync(doc, { encoding: 'utf-8' }).trim()
      } else if (isDirFile(doc, item.folder)) {
        item.children.push('/' + doc)
      }
    })
  })

	//console.log(_sidebar)

  return _sidebar
}

// 初始化sidebar
sidebar = generateSidebar()

module.exports = {
  title: "Levy's blog",
  description: 'think, speak, practice, create',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://avatars3.githubusercontent.com/u/39977793?s=200&v=4'
      }
    ],
    ['style', {}, 'img { display: block; }']
  ],
  //base: '/blog/',
  themeConfig: {
    repo: 'levy9527/blog',
    //editLinks: true,
    //editLinkText: '帮助我们完善此页面',
    sidebar // 传入配置项
  },
  // 站点配置
  plugins: []
}