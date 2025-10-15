import { ThemeProvider } from '@/components/Theme/Provider'
import Editor from './editor'
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  ForwardRefRenderFunction,
} from 'react'
import type {
  BaMaoCodeMirrorImperativeHandleType,
  BaMaoCodeMirrorProps,
} from './typing'

import { Toaster } from '@/components/ui/sonner'

const BaMaoCodeMirror: ForwardRefRenderFunction<
  BaMaoCodeMirrorImperativeHandleType,
  BaMaoCodeMirrorProps
> = ({ value = '', onChange, options = {} }, forwardedRef) => {
  const editorRef = useRef<BaMaoCodeMirrorImperativeHandleType>(null)
  useImperativeHandle(forwardedRef, () => ({
    setValue: (value: string) => {
      editorRef.current?.setValue(value)
    },
    getValue: () => {
      return editorRef.current?.getValue() || ''
    },
  }))
  return (
    <ThemeProvider
      defaultTheme={options.theme || 'dark'}
      storageKey="bamao-code-mirror-theme"
    >
      <Editor
        options={options}
        value={value}
        onChange={onChange}
        ref={editorRef}
      />
      <Toaster position="top-center" />
    </ThemeProvider>
  )
}

export default forwardRef(BaMaoCodeMirror)
