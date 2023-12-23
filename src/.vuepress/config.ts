import { searchPlugin } from '@vuepress/plugin-search'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {path} from '@vuepress/utils'

const GA = 'G-6HEW6B1S6B'
export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "levy",
  description: "levy's blog",

  theme,

  plugins: [
    searchPlugin({
      // options
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ],

  head: [
    [
        'meta',
        {
            name: 'google-site-verification',
            content:  'XSoaUnV59ACn-fVEvYre2y_5mka_7o_wEoMPBQpwo2M'
        }
    ],
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
