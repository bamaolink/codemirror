import { markdown } from "@codemirror/lang-markdown";
import { cpp } from "@codemirror/lang-cpp"; // C++语言模式
import { json } from "@codemirror/lang-json"; // json语言模式
import { java } from "@codemirror/lang-java"; // java
import { vue } from "@codemirror/lang-vue"; // vue
import { html } from "@codemirror/lang-html"; // html
import { javascript } from "@codemirror/lang-javascript"; // javascript

import { vsCodeDark } from "@fsegurai/codemirror-theme-vscode-dark";
import { vsCodeLight } from "@fsegurai/codemirror-theme-vscode-light";

// import { logLanguageSupport as log } from "./lang-log";

export const langs = {
  markdown,
  cpp,
  json,
  java,
  vue,
  html,
  javascript,
  // log,
};

export type LangModel = keyof typeof langs;

export const getLangModel = (lang: LangModel) => {
  if (!langs[lang]) {
    throw new Error(`${lang} is not supported`);
  }
  return lang === "javascript"
    ? langs[lang]({ jsx: true, typescript: true })
    : langs[lang]();
};

export const getTheme = (theme: "light" | "dark") => {
  if (theme === "light") {
    return vsCodeLight;
  }
  return vsCodeDark;
};
