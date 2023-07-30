import { searchPlugin } from '@vuepress/plugin-search'
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

const GA = 'G-6HEW6B1S6B'
export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "levy",
  description: "levy 的个人客",

  theme,

  plugins: [
    searchPlugin({
      // options
    }),
  ],

  head: [
    [
        'script',
        {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id='+GA,
        },
    ],
    [
        'script',
        {},
        [
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config','"+GA+"');",
        ],
    ],
  ]

  // Enable it with pwa
  // shouldPrefetch: false,
});
