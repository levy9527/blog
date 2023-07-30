import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

const hostname = "https://levy.vip"
export default hopeTheme({
  hostname,

  author: {
    name: "levy",
  },
  pageInfo: ["Date", "Tag"],

  iconAssets: "fontawesome-with-brands",

  logo: "/logo.png",

  repo: "levy9527/blog",

  docsDir: "src",

  // navbar
  navbar,

  // sidebar
  sidebar,

  //footer: "默认页脚",

  displayFooter: true,

  editLink: false,
  darkmode: "disable",
  blog: {
    description: "Javascript/Java/Python\n都能撸的“全干工程师”",
    avatar: 'https://avatars.githubusercontent.com/u/9384365?v=4',
    roundAvatar: true,
    intro: "/about.html",
    medias: {
      GitHub: "https://github.com/levy9527",
      Email: "mailto:info@897895407@qq.com",
      Rss: hostname + "/rss.xml",
      //BiliBili: "https://example.com",
      //Youtube: "https://example.com",
      //Discord: "https://example.com",
      //Facebook: "https://example.com",
      //Instagram: "https://example.com",
      //Linkedin: "https://example.com",
      //Pinterest: "https://example.com",
      //Twitter: "https://example.com",
      //Wechat: "https://example.com",
      //Weibo: "https://example.com",
    },
  },

  // page meta
  metaLocales: {
    //editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    blog: true,
    feed: {
      rss: true,
    },

    comment: {
      // You should generate and use your own comment service
      //provider: "Waline",
      //serverURL: "https://waline-comment.vuejs.press",
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      delay: 300,
      align: true,
      attrs: true,
      //chart: true,
      codetabs: true,
      //demo: true,
      //echarts: true,
      gfm: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      //include: true,
      katex: true,
      mark: true,
      //mermaid: true,
      //playground: {
      //  presets: ["ts", "vue"],
      //},
      //presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        // {
        //   matcher: "Recommended",
        //   replacer: ({ tag }) => {
        //     if (tag === "em")
        //       return {
        //         tag: "Badge",
        //         attrs: { type: "tip" },
        //         content: "Recommended",
        //       };
        //   },
        // },
      ],
      sub: true,
      sup: true,
      tabs: true,
      //vuePlayground: true,
    },

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
