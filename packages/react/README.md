# @bamaolink/codemirror-react

codemirror 6 react 组件。

## 安装

```sh
npm install @bamaolink/codemirror-react
```

## 使用

```tsx
import { BaMaoCodeMirror } from '@/components/CodeMirror'

function App() {
  const [value, setValue] = useState(`console.log("hello world")`)
  const [options, setOptions] = useState({
    title: '代码编辑器',
    height: '600px',
    lineWrapping: false,
  })
  return (
    <div className="p-4">
      <BaMaoCodeMirror
        value={value}
        options={options}
        onChange={(value) => {
          console.log(value)
        }}
        onThemeChange={(theme) => {
          console.log(theme)
        }}
      />
    </div>
  )
}
```

### 明暗主题切换

```tsx
// root app
import { ThemeProvider } from '@/components/Theme/Provider'
const App = () => {
  return (
    <ThemeProvider
      defaultTheme={options.theme || 'dark'}
      storageKey="bamao-code-mirror-theme"
    >
      Hello World
    </ThemeProvider>
  )
}

// page
import { useTheme } from '@/components/Theme/Provider'
const Page = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '黑夜' : '白天'}
    </button>
  )
}
```

## 参数

```ts
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
  getEditor: () => EditorView | null
  getEditorRef: () => HTMLDivElement | null
}
```
