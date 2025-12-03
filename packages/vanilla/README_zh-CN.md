# @bamaolink/codemirror

BamaoLink 的 CodeMirror 6 封装库，提供简单而强大的代码编辑器接口。

## 特性

- 🎨 **主题支持**: 亮色、暗色和系统主题
- 🌍 **多语言支持**: 支持 20+ 种编程语言
- ⚡ **事件系统**: 内置事件发射器用于编辑器交互
- 🎯 **易于使用**: 简单的 API 和 TypeScript 支持
- 📱 **响应式**: 可配置的宽度和高度
- 🔧 **可定制**: 可编辑、自动换行和自定义类名

## 安装

```bash
npm install @bamaolink/codemirror
```

## 快速开始

```javascript
import BamaoLinkCodeMirror from '@bamaolink/codemirror'

// 创建编辑器实例
const editor = new BamaoLinkCodeMirror('#app', {
  value: 'console.log("你好，世界！");',
  theme: 'light',
  lang: 'javascript'
})

// 监听内容变化
editor.on('change', ({ value, view }) => {
  console.log('内容已更改:', value)
})

// 监听聚焦事件
editor.on('focus', ({ event, view }) => {
  console.log('编辑器已聚焦')
})

// 监听失焦事件
editor.on('blur', ({ event, view }) => {
  console.log('编辑器已失焦')
})
```

## API 参考

### 构造函数

```typescript
new BamaoLinkCodeMirror(element: HTMLElement | string, options?: Partial<EditorOptions>)
```

#### 参数

- `element`: 编辑器容器的 DOM 元素或 CSS 选择器
- `options`: 可选的配置对象

### 选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `value` | `string` | `''` | 初始编辑器内容 |
| `theme` | `'light' \| 'dark' \| 'system'` | `'light'` | 编辑器主题 |
| `lang` | `LangModelType` | `'javascript'` | 编程语言 |
| `editable` | `boolean` | `true` | 编辑器是否可编辑 |
| `lineWrapping` | `boolean` | `true` | 启用自动换行 |
| `width` | `string` | `'100%'` | 编辑器宽度 |
| `height` | `string` | `'100%'` | 编辑器高度 |
| `classNames` | `string[]` | `[]` | 额外的 CSS 类名 |

### 支持的语言

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

### 事件

编辑器会触发以下事件：

- `initialization`: 编辑器初始化时触发
- `change`: 编辑器内容改变时触发
- `focus`: 编辑器获得焦点时触发
- `blur`: 编辑器失去焦点时触发

### 方法

#### `on(event, listener)`

订阅编辑器事件。

```typescript
editor.on('change', ({ value, view }) => {
  console.log('新值:', value)
})
```

#### `off(event, listener)`

取消订阅编辑器事件。

```typescript
const handleChange = ({ value }) => console.log(value)
editor.on('change', handleChange)
editor.off('change', handleChange)
```

#### `setValue(value)`

设置编辑器内容。

```typescript
editor.setValue('const x = 42;')
```

#### `getValue()`

获取当前编辑器内容。

```typescript
const content = editor.getValue()
```

#### `setTheme(theme)`

更改编辑器主题。

```typescript
editor.setTheme('dark')
```

#### `setLanguage(lang)`

更改编辑器语言。

```typescript
editor.setLanguage('python')
```

## 示例

### 基础用法

```javascript
const editor = new BamaoLinkCodeMirror('#editor', {
  value: 'function hello() {\n  console.log("你好！");\n}',
  lang: 'javascript',
  theme: 'light'
})
```

### 只读编辑器

```javascript
const editor = new BamaoLinkCodeMirror('#editor', {
  value: 'const readOnly = true;',
  editable: false,
  theme: 'dark'
})
```

### 自定义样式

```javascript
const editor = new BamaoLinkCodeMirror('#editor', {
  value: '.custom { color: red; }',
  lang: 'css',
  width: '600px',
  height: '400px',
  classNames: ['my-custom-editor']
})
```

## TypeScript 支持

此包包含完整的 TypeScript 类型定义：

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
  // TypeScript 知道事件对象的形状
  console.log(event.value)
})
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建
npm run preview
```

## 许可证

MIT 许可证 © [BamaoLink](https://github.com/bamaolink)

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 链接

- [GitHub 仓库](https://github.com/bamaolink/codemirror)
- [问题反馈](https://github.com/bamaolink/codemirror/issues)
- [NPM 包](https://www.npmjs.com/package/@bamaolink/codemirror)