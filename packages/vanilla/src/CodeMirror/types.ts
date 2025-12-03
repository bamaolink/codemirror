import { langs } from './extensions'
import { EditorView as CMEditorView } from '@codemirror/view'
import { EditorState as CMEditorState } from '@codemirror/state'

export type EditorView = CMEditorView
export type EditorState = CMEditorState
export type LangModelType = keyof typeof langs
export type ThemeType = 'dark' | 'light' | 'system'

export type EditorOptions = {
  value: string
  lang: LangModelType
  theme: ThemeType
  editable: boolean
  lineWrapping: boolean
  width: string
  height: string
  classNames: string[]
}

export type { Emitter } from 'mitt'
export type EmitterEvents = {
  initialization: string
  change: { value: string; view: EditorView }
  focus: { event: Event; view: EditorView }
  blur: { event: Event; view: EditorView }
}
