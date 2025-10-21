# @bamaolink/codemirror-vue

codemirror 6 vue3 component.

## Installation

```sh
npm install @bamaolink/codemirror-vue
```

## Usage

```tsx
import { onMounted, ref } from 'vue';
import BamaoCodeMirror from '@bamaolink/codemirror-vue'

const value = ref(`const { title = '',
  hideHeader = false,
  disabled = false,
  lineWrapping = true,
  width = '100%',
  height = '100%',
  classNames = [] } = options`)
const options = ref({})

onMounted(() => {
  setTimeout(() => {
    value.value = `const { title = '',
  hideHeader = false,
  disabled = false,
  lineWrapping = true,
  width = '100%',
  height = '100%',
  classNames = [] } = options || {}`
    options.value = {
      title: '测试标题',
      hideHeader: true,
      disabled: true,
      langMode: 'markdown',
    }
  }, 1000)
})

<template>
  <div class="p-2">
    <BamaoCodeMirror v-model="value" :options="options" />
  </div>
</template>
```

## Types

```ts
export interface BaMaoCodeMirrorProps {
  modelValue?: string
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
    themeStorageKey?: string
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
```
