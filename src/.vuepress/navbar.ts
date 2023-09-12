import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "首页",
    icon: "house",
    link: "/",
  },
  {
    text: "分类",
    icon: "list",
    children: [
      {
        text: "软件研发",
        icon: "code",
        link: "/tools/how-to-connect-to-internet",
      },
      {
        text: "工作日常",
        icon: "briefcase",
        link: "/daily",
      },
      {
        text: "英语学习",
        icon: "globe",
        link: "/english",
      },
    ],
  },
  "/about",
]);
