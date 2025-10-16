import './App.css'
import BaMaoCodeMirror from '@/components/CodeMirror'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState(`console.log("hello world")`)
  const [options, setOptions] = useState({
    title: '代码编辑器',
    height: '600px',
    lineWrapping: false,
  })
  setTimeout(() => {
    setValue(
      `import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])`
    )
    setOptions({
      title: '代码编辑器',
      height: '300px',
      lineWrapping: true,
    })
  }, 6000)
  return (
    <div className="p-4">
      <BaMaoCodeMirror
        value={value}
        options={options}
        onThemeChange={(theme) => {
          console.log(theme)
        }}
      />
    </div>
  )
}

export default App
