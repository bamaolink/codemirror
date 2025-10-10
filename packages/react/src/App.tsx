import { useEffect, useState } from "react";
import "./App.css";
import LogViewerCodeMirror from "./components/LogViewerCodeMirror";

import { langs } from "./components/LogViewerCodeMirror/constant";
import type { LangModel } from "./components/LogViewerCodeMirror/constant";

const md = `完整日志下载地址：#link#{"href":"/logDownload","download":"","target":"_blank"}#link#
==============可以标记每一行日志的输出类型==============
#log<info>log#2021-08-26 15:07:09: job is success#log<info>log#
#log<warning>log#2021-08-26 15:07:09: job is success#log<warning>log#
#log<error>log#2021-08-26 15:07:09: job is error#log<error>log#

====================引擎日志====================

DataStreamMain start
java.lang.NullPointerException
at
at java.util.Properties.load0(Properties.java:353)
at java.util.Properties.load(Properties.java:341)
at com.zhiweicloud.dataprocess.util.common.PropertiesUtil.getStringByKey(PropertiesUtil.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.readFlinkEngineConfig(FlinkEngine.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.buildFlinkStream(FlinkEngine.
at com.zhiweicloud.dataprocess.engine.FlinkEngine.startFlinkEngine(FlinkEngine.
at com.zhiweicloud.dataprocess.DataStreamMain.main(DataStreamMain.
 
`;

function App() {
  const [value, setValue] = useState(`## Markdown`);
  const [disabled, setDisabled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [langMode, setLangMode] = useState<LangModel>("java");

  useEffect(() => {
    setTimeout(() => {
      setValue(md);
    }, 1000);
  }, []);
  return (
    <>
      <div>
        <button onClick={() => setDisabled(!disabled)}>
          {disabled ? "启用" : "禁用"}
        </button>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "白天" : "黑夜"}
        </button>
        <select
          value={langMode}
          onChange={(e) => setLangMode(e.target.value as LangModel)}
        >
          {Object.keys(langs).map((lang) => (
            <option value={lang} key={lang}>
              {lang}
            </option>
          ))}
        </select>
        <LogViewerCodeMirror
          value={value}
          height={"40vh"}
          disabled={disabled}
          langMode={langMode}
          theme={theme}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </div>
    </>
  );
}

export default App;
