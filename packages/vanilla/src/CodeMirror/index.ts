import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from './basic'
import { chinese } from './langs/chinese'
import {
  themeConf,
  languageConf,
  getTheme,
  getLangModel,
  editableConf,
  lineWrappingConf,
  themeStyleConf,
  baseStyles,
} from './extensions'
import { emitter } from './events'

import type {
  EditorOptions,
  EmitterEvents,
  ThemeType,
  LangModelType,
} from './types'

export class BamaoLinkCodeMirror {
  readonly emitter = emitter

  options: EditorOptions
  element: HTMLElement

  state: EditorState
  view: EditorView
  constructor(
    element: HTMLElement | string,
    options: Partial<EditorOptions> = {}
  ) {
    this.options = {
      value: '',
      theme: 'light',
      lang: 'javascript',
      editable: true,
      lineWrapping: true,
      width: '100%',
      height: '100%',
      classNames: [],
      ...options,
    }
    this.element =
      typeof element === 'string' ? document.querySelector(element)! : element

    const { state, view } = this.initEditor()
    this.state = state
    this.view = view
  }
  private initEditor() {
    const {
      value,
      theme,
      lang: langMode,
      editable,
      lineWrapping,
      width,
      height,
    } = this.options
    const { emitter } = this
    const lang = getLangModel(langMode)
    const state = EditorState.create({
      doc: value || '',
      extensions: [
        basicSetup,
        EditorState.phrases.of(chinese),
        themeConf.of(getTheme(theme!)),
        languageConf.of(lang),
        editableConf.of(EditorView.editable.of(editable)),
        lineWrappingConf.of(lineWrapping ? EditorView.lineWrapping : []),
        themeStyleConf.of(
          EditorView.theme({
            ...baseStyles,
            '&': {
              width,
              height,
            },
          })
        ),
        EditorView.domEventHandlers({
          focus(event, view) {
            emitter.emit('focus', { event, view })
          },
          blur(event, view) {
            emitter.emit('blur', { event, view })
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emitter.emit('change', {
              value: update.state.doc.toString(),
              view: update.view,
            })
          }
        }),
      ],
    })
    const view = new EditorView({
      state: state,
      parent: this.element,
    })
    return {
      state,
      view,
    }
  }
  on(event: keyof EmitterEvents, callback: (...args: any[]) => void) {
    this.emitter.on(event, callback)
  }
  off(event: keyof EmitterEvents, callback: (...args: any[]) => void) {
    this.emitter.off(event, callback)
  }

  setValue(value: string) {
    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: value,
      },
    })
  }
  getValue() {
    return this.view.state.doc.toString()
  }
  getTheme() {
    return this.options.theme
  }
  setTheme(theme: ThemeType) {
    this.options.theme = theme
    this.view.dispatch({
      effects: themeConf.reconfigure(getTheme(theme)),
    })
  }
  getLang() {
    return this.options.lang
  }
  setLang(lang: LangModelType) {
    this.options.lang = lang
    this.view.dispatch({
      effects: languageConf.reconfigure(getLangModel(lang)),
    })
  }
  getEditable() {
    return this.options.editable
  }
  setEditable(editable: boolean) {
    this.options.editable = editable
    this.view.dispatch({
      effects: editableConf.reconfigure(EditorView.editable.of(editable)),
    })
  }
  getLineWrapping() {
    return this.options.lineWrapping
  }
  setLineWrapping(lineWrapping: boolean) {
    this.options.lineWrapping = lineWrapping
    this.view.dispatch({
      effects: lineWrappingConf.reconfigure(
        lineWrapping ? EditorView.lineWrapping : []
      ),
    })
  }
  getWidth() {
    return this.options.width
  }
  setWidth(width: string) {
    this.options.width = width
    this.view.dispatch({
      effects: themeStyleConf.reconfigure(
        EditorView.theme({
          ...baseStyles,
          '&': {
            width,
          },
        })
      ),
    })
  }
  getHeight() {
    return this.options.height
  }
  setHeight(height: string) {
    this.options.height = height
    this.view.dispatch({
      effects: themeStyleConf.reconfigure(
        EditorView.theme({
          ...baseStyles,
          '&': {
            height,
          },
        })
      ),
    })
  }
  destroy() {
    this.view.destroy()
  }
}

export default BamaoLinkCodeMirror
