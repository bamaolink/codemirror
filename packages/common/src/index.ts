import { langs as chinese } from './langs/chinese'

import { Compartment } from '@codemirror/state'
import { vsCodeDark } from '@fsegurai/codemirror-theme-vscode-dark'
import { vsCodeLight } from '@fsegurai/codemirror-theme-vscode-light'

import { angular } from '@codemirror/lang-angular'
import { cpp } from '@codemirror/lang-cpp'
import { css } from '@codemirror/lang-css'
import { go } from '@codemirror/lang-go'
import { java } from '@codemirror/lang-java'
import { javascript } from '@codemirror/lang-javascript'
import { jinja } from '@codemirror/lang-jinja'
import { json } from '@codemirror/lang-json'
import { liquid } from '@codemirror/lang-liquid'
import { markdown } from '@codemirror/lang-markdown'
import { html } from '@codemirror/lang-html'
import { php } from '@codemirror/lang-php'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { sass } from '@codemirror/lang-sass'
import { sql } from '@codemirror/lang-sql'
import { vue } from '@codemirror/lang-vue'
import { wast } from '@codemirror/lang-wast'
import { xml } from '@codemirror/lang-xml'
import { yaml } from '@codemirror/lang-yaml'

export { chinese }
export { themeStyles } from './basic/theme'
export { basicSetup, minimalSetup, EditorView } from './basic'

export const languageConf = new Compartment()
export const editableConf = new Compartment()
export const themeConf = new Compartment()
export const themeStyleConf = new Compartment()
export const lineWrappingConf = new Compartment()

export const langs = {
  javascript,
  markdown,
  json,
  css,
  sass,
  html,
  angular,
  cpp,
  go,
  java,
  vue,
  jinja,
  liquid,
  php,
  python,
  rust,
  sql,
  wast,
  xml,
  yaml,
}

export type LangModelType = keyof typeof langs
export type ThemeType = 'dark' | 'light' | 'system'

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

export { capitalizeFirstLetter, copyToClipboard } from './utils'
