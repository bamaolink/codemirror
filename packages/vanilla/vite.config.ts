import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: './src/index.ts',
      name: 'bamao-link-codemirror',
      fileName: (format) => {
        return format === 'es'
          ? 'bamao-link-codemirror.js'
          : `bamao-link-codemirror-${format}.cjs`
      },
      formats: ['es', 'umd'],
    },
  },
  server: {
    port: 3002,
  },
})
