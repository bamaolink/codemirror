import { langs as chinese } from './langs/chinese'

import { Compartment } from '@codemirror/state'
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark'
import { vsCodeLight } from '@fsegurai/codemirror-theme-vscode-light'
import { markdown } from '@codemirror/lang-markdown'
import { cpp } from '@codemirror/lang-cpp' // C++语言模式
import { json } from '@codemirror/lang-json' // json语言模式
import { java } from '@codemirror/lang-java' // java
import { vue } from '@codemirror/lang-vue' // vue
import { html } from '@codemirror/lang-html' // html
import { javascript } from '@codemirror/lang-javascript' // javascript

export { chinese }
export { themeStyles } from './basic/theme'
export { basicSetup, minimalSetup, EditorView } from './basic'

export const languageConf = new Compartment()
export const editableConf = new Compartment()
export const themeConf = new Compartment()
export const lineWrappingConf = new Compartment()

export const langs = {
  markdown,
  cpp,
  json,
  java,
  vue,
  html,
  javascript,
}

export type LangModelType = keyof typeof langs
export type ThemeType = 'light' | 'dark'

export const getLangModel = (lang: LangModelType) => {
  if (!langs[lang]) {
    throw new Error(`${lang} is not supported`)
  }
  return lang === 'javascript'
    ? langs[lang]({ jsx: true, typescript: true })
    : langs[lang]()
}

export const getTheme = (theme: ThemeType) => {
  if (theme === 'light') {
    return vsCodeLight
  }
  return vsCodeDark
}
