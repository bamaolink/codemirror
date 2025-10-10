import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

// 基础高亮样式（备用方案）
export const logHighlightStyle = HighlightStyle.define([
  { tag: t.comment, color: "#888888", fontStyle: "italic" }, // 时间戳
  { tag: t.keyword, color: "#0074D9" }, // INFO
  { tag: t.number, color: "#FF851B" }, // WARN
  { tag: t.string, color: "#FF4136" }, // ERROR
  { tag: t.name, color: "#AAAAAA" }, // DEBUG
  { tag: t.operator, color: "#8B0000" }, // FATAL
  { tag: t.variableName, color: "#2E8B57" }, // TRACE
  { tag: t.content, color: "#333333" }, // 消息内容
]);

// 备用高亮方案（不依赖LRParser）
export function basicLogHighlighting() {
  return HighlightStyle.define([
    { regex: /\[\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2})?\]/, tag: t.comment },
    { regex: /INFO\b/, tag: t.keyword, color: "#0074D9" },
    { regex: /WARN\b/, tag: t.number, color: "#FF851B" },
    { regex: /ERROR\b/, tag: t.string, color: "#FF4136" },
    { regex: /DEBUG\b/, tag: t.name, color: "#AAAAAA" },
    { regex: /FATAL\b/, tag: t.operator, color: "#8B0000" },
    { regex: /TRACE\b/, tag: t.variableName, color: "#2E8B57" },
  ]);
}
