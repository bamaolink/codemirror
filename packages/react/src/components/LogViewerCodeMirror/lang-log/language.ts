import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { LRParser } from "@lezer/lr";
import { styleTags, tags as t } from "@lezer/highlight";

// 日志级别映射和样式
const LOG_LEVELS = {
  INFO: { tag: t.keyword, color: "#0074D9" },
  WARN: { tag: t.number, color: "#FF851B" },
  ERROR: { tag: t.string, color: "#FF4136" },
  DEBUG: { tag: t.name, color: "#AAAAAA" },
  FATAL: { tag: t.operator, color: "#8B0000" },
  TRACE: { tag: t.variableName, color: "#2E8B57" },
};

// 构建日志解析器
const logParser = new LRParser({
  // 语法规则
  rules: [
    { name: "LogFile", rule: "line*" },
    { name: "line", rule: "Timestamp LogLevel? Message" },
    {
      name: "Timestamp",
      rule: /\[\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2}(?:\.\d+)?)?\]/,
    },
    { name: "LogLevel", rule: /(INFO|WARN|ERROR|DEBUG|FATAL|TRACE)/ },
    { name: "Message", rule: /[^\n]*/ },
  ],
  // 样式定义
  props: [
    styleTags({
      Timestamp: t.comment,
      LogLevel: (ctx) => {
        const level = ctx.match?.[0]?.toUpperCase();
        return LOG_LEVELS[level as keyof typeof LOG_LEVELS]?.tag || t.keyword;
      },
      Message: t.content,
    }),
  ],
});

// 语言定义
const logLanguage = LRLanguage.define({
  name: "log",
  parser: logParser,
  languageData: {
    commentTokens: { line: "#" },
    closeBrackets: { brackets: [] },
  },
});

export function logLanguageSupport(): LanguageSupport {
  return new LanguageSupport(logLanguage);
}
