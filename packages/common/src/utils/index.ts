// 首字母大写
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 复制文本到剪贴板
export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
}
