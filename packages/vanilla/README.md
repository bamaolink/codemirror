# @bamaolink/codemirror

A CodeMirror 6 wrapper library for BamaoLink, providing a simple and powerful code editor interface.

## Features

- 🎨 **Theme Support**: Light, dark, and system themes
- 🌍 **Multi-language Support**: Support for 20+ programming languages
- ⚡ **Event System**: Built-in event emitter for editor interactions
- 🎯 **Easy to Use**: Simple API with TypeScript support
- 📱 **Responsive**: Configurable width and height
- 🔧 **Customizable**: Editable, line wrapping, and custom class names

## Installation

```bash
npm install @bamaolink/codemirror
```

## Quick Start

```javascript
import BamaoLinkCodeMirror from '@bamaolink/codemirror'

// Create an editor instance
const editor = new BamaoLinkCodeMirror('#app', {
  value: 'console.log("Hello, World!");',
  theme: 'light',
  lang: 'javascript'
})

// Listen for changes
editor.on('change', ({ value, view }) => {
  console.log('Content changed:', value)
})

// Listen for focus events
editor.on('focus', ({ event, view }) => {
  console.log('Editor focused')
})

// Listen for blur events
editor.on('blur', ({ event, view }) => {
  console.log('Editor blurred')
})
```

## API Reference

### Constructor

```typescript
new BamaoLinkCodeMirror(element: HTMLElement | string, options?: Partial<EditorOptions>)
```

#### Parameters

- `element`: DOM element or CSS selector for the editor container
- `options`: Optional configuration object

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `value` | `string` | `''` | Initial editor content |
| `theme` | `'light' \| 'dark' \| 'system'` | `'light'` | Editor theme |
| `lang` | `LangModelType` | `'javascript'` | Programming language |
| `editable` | `boolean` | `true` | Whether the editor is editable |
| `lineWrapping` | `boolean` | `true` | Enable line wrapping |
| `width` | `string` | `'100%'` | Editor width |
| `height` | `string` | `'100%'` | Editor height |
| `classNames` | `string[]` | `[]` | Additional CSS class names |

### Supported Languages

- `javascript`
- `typescript`
- `python`
- `java`
- `cpp`
- `go`
- `rust`
- `php`
- `html`
- `css`
- `scss`
- `json`
- `markdown`
- `sql`
- `xml`
- `yaml`
- `vue`
- `angular`
- `jinja`
- `liquid`
- `wast`

### Events

The editor emits the following events:

- `initialization`: Fired when the editor is initialized
- `change`: Fired when the editor content changes
- `focus`: Fired when the editor gains focus
- `blur`: Fired when the editor loses focus

### Methods

#### `on(event, listener)`

Subscribe to editor events.

```typescript
editor.on('change', ({ value, view }) => {
  console.log('New value:', value)
})
```

#### `off(event, listener)`

Unsubscribe from editor events.

```typescript
const handleChange = ({ value }) => console.log(value)
editor.on('change', handleChange)
editor.off('change', handleChange)
```

#### `setValue(value)`

Set the editor content.

```typescript
editor.setValue('const x = 42;')
```

#### `getValue()`

Get the current editor content.

```typescript
const content = editor.getValue()
```

#### `setTheme(theme)`

Change the editor theme.

```typescript
editor.setTheme('dark')
```

#### `setLanguage(lang)`

Change the editor language.

```typescript
editor.setLanguage('python')
```

## Examples

### Basic Usage

```javascript
const editor = new BamaoLinkCodeMirror('#editor', {
  value: 'function hello() {\n  console.log("Hello!");\n}',
  lang: 'javascript',
  theme: 'light'
})
```

### Read-only Editor

```javascript
const editor = new BamaoLinkCodeMirror('#editor', {
  value: 'const readOnly = true;',
  editable: false,
  theme: 'dark'
})
```

### Custom Styling

```javascript
const editor = new BamaoLinkCodeMirror('#editor', {
  value: '.custom { color: red; }',
  lang: 'css',
  width: '600px',
  height: '400px',
  classNames: ['my-custom-editor']
})
```

## TypeScript Support

This package includes full TypeScript definitions:

```typescript
import BamaoLinkCodeMirror, { 
  type EditorOptions, 
  type EmitterEvents 
} from '@bamaolink/codemirror'

const options: Partial<EditorOptions> = {
  theme: 'dark',
  lang: 'typescript'
}

const editor = new BamaoLinkCodeMirror('#app', options)

editor.on('change', (event: EmitterEvents['change']) => {
  // TypeScript knows the shape of the event object
  console.log(event.value)
})
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## License

MIT License © [BamaoLink](https://github.com/bamaolink)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](https://github.com/bamaolink/codemirror)
- [Issues](https://github.com/bamaolink/codemirror/issues)
- [NPM Package](https://www.npmjs.com/package/@bamaolink/codemirror)