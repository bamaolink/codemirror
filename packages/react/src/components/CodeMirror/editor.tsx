import './index.css'
import type { ForwardRefRenderFunction } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import {
  basicSetup,
  chinese,
  languageConf,
  editableConf,
  themeConf,
  themeStyleConf,
  lineWrappingConf,
  getTheme,
  getLangModel,
  themeStyles,
  langs,
  capitalizeFirstLetter,
  copyToClipboard,
} from '@bamaolink/codemirror-common'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { SunIcon, MoonIcon, CopyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTheme } from '@/components/Theme/Provider'
import { toast } from 'sonner'

import type {
  BaMaoCodeMirrorImperativeHandleType,
  BaMaoCodeMirrorProps,
  LangModelType,
} from './typing'

const Editor: ForwardRefRenderFunction<
  BaMaoCodeMirrorImperativeHandleType,
  BaMaoCodeMirrorProps
> = ({ value = '', onChange, onThemeChange, options = {} }, forwardedRef) => {
  let isInitialize = false
  const { theme, setTheme } = useTheme()
  // const [theme, setTheme] = useState<ThemeType>(options.theme || 'dark')
  const [langMode, setLangMode] = useState<LangModelType>(
    options.langMode || 'javascript'
  )
  const {
    title,
    hideHeader = false,
    disabled = false,
    lineWrapping = true,
    width = '100%',
    height = '100%',
    classNames = [],
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
        themeStyleConf.of(
          EditorView.theme({
            ...themeStyles,
            '&': {
              width,
              height,
            },
          })
        ),
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

  const copyContent = async () => {
    try {
      const text = getValue()
      await copyToClipboard(text)
      toast.success('复制内容成功，请在剪切板中查看')
    } catch (error) {
      toast.error('复制失败，请手动复制')
      console.log(error)
    }
  }

  useEffect(() => {
    if (editor) {
      editor.dispatch({
        effects: themeConf.reconfigure(getTheme(theme)),
      })
      onThemeChange?.(theme)
    }
  }, [theme])
  useEffect(() => {
    if (editor) {
      const lang = getLangModel(langMode)
      editor.dispatch({
        effects: languageConf.reconfigure(lang),
      })
    }
  }, [langMode])
  useEffect(() => {
    if (!editor) {
      return
    }
    if (options.theme && theme !== options.theme) {
      setTheme(options.theme)
    }
    if (options.langMode && langMode !== options.langMode) {
      setLangMode(options.langMode)
    }
    if (typeof options.disabled === 'boolean') {
      editor.dispatch({
        effects: editableConf.reconfigure(
          EditorView.editable.of(!options.disabled)
        ),
      })
    }
    if (typeof options.lineWrapping === 'boolean') {
      editor.dispatch({
        effects: lineWrappingConf.reconfigure(
          options.lineWrapping ? EditorView.lineWrapping : []
        ),
      })
    }
    if (options.width !== width || options.height !== height) {
      editor.dispatch({
        effects: themeStyleConf.reconfigure(
          EditorView.theme({
            ...themeStyles,
            '&': {
              width: options.width || '100%',
              height: options.height || '100%',
            },
          })
        ),
      })
    }
  }, [options])

  useEffect(() => {
    if (value !== getValue()) {
      setValue(value)
    }
  }, [value])

  useEffect(() => {
    initializeEditor()
    return () => {
      editor?.destroy()
    }
  }, [])

  useImperativeHandle(forwardedRef, () => ({
    setValue,
    getValue,
    getEditor() {
      return editor
    },
    getEditorRef() {
      return editorRef.current
    },
  }))

  return (
    <div
      className={`bamao-code-mirror outline outline-gray-200 dark:outline-gray-800 overflow-hidden rounded-sm ${classNames.join(
        ' '
      )}`}
    >
      {hideHeader ? null : (
        <div className="flex items-center gap-2 p-2 w-full bg-wihte dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-800">
          <div className="title flex-1 text-sm p-1">{title}</div>
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            size="icon-sm"
            variant="outline"
          >
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button
            onClick={() => copyContent()}
            size="icon-sm"
            variant="outline"
            title="copy"
          >
            <CopyIcon />
          </Button>
          <Select
            onValueChange={(val) => setLangMode(val as LangModelType)}
            value={langMode}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(langs).map((lang) => {
                return (
                  <SelectItem value={lang} key={lang}>
                    {capitalizeFirstLetter(lang)}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="eidtor" ref={editorRef}></div>
    </div>
  )
}

export default forwardRef(Editor)
