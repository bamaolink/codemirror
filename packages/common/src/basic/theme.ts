export const themeStyles = {
  // 隐藏替换
  '& button[name=replaceAll], & button[name=replace], & button[name=close], & input[name=replace]':
    {
      display: 'none',
    },
  '.cm-search': {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  '.cm-search > label': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  '.cm-gutters': {
    fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  },
  // '.cm-gutters .cm-gutterElement > span[title~=Fold]': {
  //   transform: 'translateY(-4px)',
  //   display: 'block',
  // },
  // '.cm-gutters .cm-gutterElement > span[title~=折叠行]': {
  //   transform: 'translateY(-4px)',
  //   display: 'block',
  // },
  '.cm-content': {
    fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  },
}
