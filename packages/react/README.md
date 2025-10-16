# @bamaolink/codemirror-react

codemirror 6 react component.

## Installation

```sh
npm install @bamaolink/codemirror-react
```

## Usage

```tsx
import { BaMaoCodeMirror } from '@bamaolink/codemirror-react'

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

### Switch Light/Dark Theme

```tsx
// root app
import { ThemeProvider } from '@bamaolink/codemirror-react'
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
import { useTheme } from '@bamaolink/codemirror-react'
const Page = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
```

## Types

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
```
