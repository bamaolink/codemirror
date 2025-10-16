import type { EditorView } from '@codemirror/view'
import { ThemeType, LangModelType } from '@bamaolink/codemirror-common'
import React from 'react'

export interface BaMaoCodeMirrorProps {
  value?: string
  onChange?: (
    value: string,
    editor: EditorView,
    editorRef: HTMLDivElement
  ) => void
  onThemeChange?: (theme: ThemeType) => void
  options?: {
    title?: React.ReactNode
    hideHeader?: boolean
    theme?: ThemeType
    disabled?: boolean
    langMode?: LangModelType
    lineWrapping?: boolean
    height?: React.CSSProperties['height']
    width?: React.CSSProperties['width']
    classNames?: string[]
  }
}
export interface BaMaoCodeMirrorImperativeHandleType {
  getValue: () => string
  setValue: (value: string) => void
  getEditor: () => EditorView | null
  getEditorRef: () => HTMLDivElement | null
}

export type { ThemeType, LangModelType } from '@bamaolink/codemirror-common'
