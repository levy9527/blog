import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/daily/": "structure",
  "/english": [
    "let-chatgpt-be-your-foreign-language-teacher",
    "how-to-self-evaluate-english-level",
    "learning-7000-words-task-completed",
    "everyone-can-learn-english-1-overview",
    "everyone-can-learn-english-2-pronunciation",
    "everyone-can-learn-english-3-words",
    "everyone-can-learn-english-4-listening-and-speaking",
    "everyone-can-learn-english-5-reading-and-writing",
    "contemporary-college-english-1",
    "contemporary-college-english-2",
    "contemporary-college-english-3",
    "contemporary-college-english-4",
    "contemporary-college-english-5",
    "contemporary-college-english-6",
  ],
  "/": [
    {
      text: "实用工具",
      prefix: "/tools/",
      children: [
        "how-to-connect-to-internet"
      ]
    },
    {
      text: "LLM",
      prefix: "/llm",
      children: [
        'evaluate-llm-app-with-ragas',
        'llm-with-recordation-review-of-regulations',
      ]
    },
    {
      text: "Python",
      prefix: "/python",
      children: [
        'add-logging-for-llm-app',
        "mr.py",
        "export-mysql-table-into-excel",
      ]
    },
    {
      text: "Git相关",
      prefix: "/git/",
      children: [
        "git-useful-commands",
        "git-definitive-guide-to-merge-code",
        "git-history-two-tricks-in-idea",
        "gitlab-ci",
        "rethinking-git-flow",
        "git-best-pratices",
        "use-command-line-tool-to-manage-gitlab-merge-request",
      ]
    },
    {
      text: "软件测试",
      prefix: "/software-testing/",
      children: [
        'unit-testing-overview',
        "use-postman-for-api-testing",
        "use-RestAssured-for-api-testing",
        "use-pytest-for-regression-testing-in-llm-app",
        "use-jest-for-test-driven-development",
        "use-playwright-for-ui-testing",
        "use-cypress-for-e2e-testing",
      ]
    },
    {
      text: "DevOps",
      prefix: "/devops",
      children: [
        'docker-build-and-push-script',
        'reduce-python-image-size',
        'what-is-the-difference-between-sh-and-bash',
        'about-arm-things-you-need-to-know',
        'common-solutions-of-object-storage-for-static-assets',
      ]
    },
    {
      text: "Java",
      prefix: "/java",
      children: [
        "Resolving-Common-Problems-in-IntelliJ-IDEA",
        "Resolving-Common-Problems-in-Maven.md",
        "using-enum-in-java",
        "which-one-is-better-Boolean-or-boolean",
        "which-one-is-better-forEach-or-map",
        "recommend-practices-for-collections-naming-convention",
        "recommend-practices-for-writing-good-functions",
        "avoid-sending-password-in-plaintext",
        "recommend-practices-for-query-by-date-range",
        "common-practices-for-handling-excel",
        "check-if-name-exists",
        "how-to-convert-snapshot-into-release-jar-without-source-code",
        "why-i-prefer-fastjson-instead-of-jackson",
        "why-is-it-so-hard-to-upgrade-dependencies",
      ]
    },
    {
      text: "MySQL",
      prefix: "/mysql",
      children: [
        "mysql-backup-case-study-mysqldump-in-action",
        "mysql-data-migration-case-study-add-auto-increment",
        "mysql-details-you-should-know-when-execute-sql-in-command-line",
      ]
    },
    {
      text: "前端技术",
      prefix: "/frontend",
      children: ["old-articles", "performance-optimization-in-action"]
    }
  ],
});
