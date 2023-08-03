import { searchPlugin } from '@vuepress/plugin-search'
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

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
