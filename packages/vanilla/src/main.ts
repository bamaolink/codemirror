import BamaoLinkCodeMirror from './CodeMirror'

const editor = new BamaoLinkCodeMirror('#app', {
  value: 'Hello World',
  theme: 'light',
})
editor.on('change', (value) => {
  console.log('change', value)
})
