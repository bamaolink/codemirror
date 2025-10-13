import './index.scss'
import type { ForwardRefRenderFunction } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import {
  basicSetup,
  chinese,
  languageConf,
  editableConf,
  themeConf,
  lineWrappingConf,
  ThemeType,
  LangModelType,
  getTheme,
  getLangModel,
  themeStyles,
} from '@bamaolink/codemirror-common'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export interface BaMaoCodeMirrorProps {
  value?: string
  onChange?: (
    value: string,
    editor: EditorView,
    editorRef: HTMLDivElement
  ) => void
  options?: {
    theme?: ThemeType
    disabled?: boolean
    langMode?: LangModelType
    lineWrapping?: boolean
    height?: React.CSSProperties['height']
    width?: React.CSSProperties['width']
  }
}
export interface BaMaoCodeMirrorImperativeHandleType {
  getValue: () => string
  setValue: (value: string) => void
}

const BaMaoCodeMirror: ForwardRefRenderFunction<
  BaMaoCodeMirrorImperativeHandleType,
  BaMaoCodeMirrorProps
> = ({ value = '', onChange, options = {} }, forwardedRef) => {
  let isInitialize = false
  const {
    theme = 'dark',
    disabled = false,
    langMode = 'javascript',
    lineWrapping = true,
    width = '100%',
    height = '100%',
  } = options
  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<EditorView | null>(null)
  const triggerChange = (changedValue: string) => {
    if (!editor || !editorRef.current) {
      return
    }
    onChange?.(changedValue, editor, editorRef.current)
  }

  const getValue = () => {
    if (!editor) {
      return ''
    }
    return editor.state.doc.toString() || ''
  }

  const setValue = (value = '') => {
    if (!editor) {
      return
    }
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: value },
    })
  }

  const initializeEditor = () => {
    if (!editorRef.current || isInitialize) {
      return
    }
    const lang = getLangModel(langMode)
    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        EditorState.phrases.of(chinese),
        themeConf.of(getTheme(theme)),
        editableConf.of(EditorView.editable.of(!disabled)),
        languageConf.of(lang),
        lineWrappingConf.of(lineWrapping ? EditorView.lineWrapping : []),
        EditorView.theme({
          ...themeStyles,
          '&': {
            width,
            height,
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            triggerChange(update.state.doc.toString())
          }
        }),
      ],
    })

    const view = new EditorView({
      state: state,
      parent: editorRef.current!,
    })

    setEditor(view)
    isInitialize = true
  }

  useEffect(() => {
    initializeEditor()
    return () => {
      editor?.destroy()
    }
  }, [])

  useImperativeHandle(forwardedRef, () => ({
    setValue,
    getValue,
  }))

  return (
    <div className="bamao-code-mirror">
      <div className="toolbar"></div>
      <div className="eidtor" ref={editorRef}></div>
    </div>
  )
}

export default forwardRef(BaMaoCodeMirror)
