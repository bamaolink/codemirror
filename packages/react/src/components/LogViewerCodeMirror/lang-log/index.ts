import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { LRParser } from "@lezer/lr";
import { styleTags, tags } from "@lezer/highlight";

// 定义日志解析器
const logParser = new LRParser({
  rules: [
    { name: "LogFile", rule: "line*" },
    { name: "line", rule: "Timestamp LogLevel? Message" },
    { name: "Timestamp", rule: /\[\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2})?\]/ },
    { name: "LogLevel", rule: /(INFO|WARN|ERROR|DEBUG|FATAL|TRACE)/ },
    { name: "Message", rule: /[^\n]*/ },
  ],
  props: [
    styleTags({
      Timestamp: tags.comment,
      LogLevel: (ctx) => {
        const level = (ctx.match?.[0] || "").toUpperCase();
        const colors = {
          INFO: tags.keyword,
          WARN: tags.number,
          ERROR: tags.string,
          DEBUG: tags.name,
          FATAL: tags.operator,
          TRACE: tags.variableName,
        };
        return colors[level] || tags.keyword;
      },
      Message: tags.content,
    }),
  ],
});

// 定义语言
const logLanguage = LRLanguage.define({
  name: "log",
  parser: logParser,
});

// 导出语言支持
export function logLanguageSupport() {
  return new LanguageSupport(logLanguage);
}
