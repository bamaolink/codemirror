import type { ForwardRefRenderFunction } from "react";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { EditorView, basicSetup } from "./extension";
import { EditorState, Compartment } from "@codemirror/state";

import { openSearchPanel } from "./search/search";

import { langs, getLangModel, getTheme } from "./constant";

const languageConf = new Compartment();
const editableConf = new Compartment();
const themeConf = new Compartment();
const lineWrappingConf = new Compartment();

export interface LogViewerCodeMirrorImperativeHandleType {
  getValue: () => string;
  setValue: (value: string) => void;
}

export interface LogViewerCodeMirrorPropsType {
  langMode?: keyof typeof langs;
  height?: React.CSSProperties["height"];
  disabled?: boolean;
  value?: string;
  theme?: "light" | "dark";
  onChange?: (
    value: string,
    editor: EditorView,
    state: EditorState,
    dom: HTMLDivElement
  ) => void;
}

const LogViewerCodeMirror: ForwardRefRenderFunction<
  LogViewerCodeMirrorImperativeHandleType,
  LogViewerCodeMirrorPropsType
> = (
  {
    value = "",
    onChange,
    langMode = "cpp",
    height = "100%",
    disabled = false,
    theme = "dark",
  },
  forwardedRef
) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const state = useRef<EditorState | null>(null);
  const editor = useRef<EditorView | null>(null);

  const triggerChange = useCallback(
    (changedValue: string) => {
      return () => {
        if (!editor.current || !state.current || !editorRef.current) {
          return;
        }
        onChange?.(
          changedValue,
          editor.current,
          state.current,
          editorRef.current
        );
      };
    },
    [onChange]
  );

  const getValue = () => {
    if (!editor.current) {
      return "";
    }
    const view = editor.current;
    return view.state.doc.toString() || "";
  };

  const setValue = (value = "") => {
    if (!editor.current) {
      return;
    }
    const view = editor.current;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  };

  const initEditor = useMemo(() => {
    return (val = "") => {
      if (editorRef.current) {
        const lang = getLangModel(langMode);
        state.current = EditorState.create({
          doc: val,
          extensions: [
            basicSetup,
            themeConf.of(getTheme(theme)),
            editableConf.of(EditorView.editable.of(!disabled)),
            languageConf.of(lang),
            lineWrappingConf.of(EditorView.lineWrapping),
            EditorView.theme({
              "&": {
                height,
              },
              // 隐藏替换
              "& button[name=replaceAll], & button[name=replace], & button[name=close], & input[name=replace]":
                {
                  display: "none",
                },
              ".cm-search": {
                display: "flex",
                alignItems: "center",
                gap: "4px",
              },
              ".cm-search > label": {
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              },

              ".cm-gutters": {
                fontFamily:
                  'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
              },
              ".cm-gutters .cm-gutterElement > span[title~=Fold]": {
                transform: "translateY(-4px)",
                display: "block",
              },
              ".cm-content": {
                fontFamily:
                  'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
              },
            }),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                triggerChange(update.state.doc.toString());
              }
            }),
          ],
        });
        editor.current = new EditorView({
          state: state.current,
          parent: editorRef.current,
        });

        openSearchPanel(editor.current);
      }
    };
  }, [disabled, height, langMode, theme, triggerChange]);

  const destroy = () => {
    editor.current?.destroy();
  };

  useEffect(() => {
    initEditor(value);
    return destroy;
  }, [initEditor, value]);

  useEffect(() => {
    const _value = getValue();
    if (_value !== value) {
      setValue(value);
    }
  }, [value]);

  useEffect(() => {
    const view = editor.current;
    if (view) {
      const lang = getLangModel(langMode);
      view.dispatch({
        effects: languageConf.reconfigure(lang),
      });
    }
  }, [langMode]);

  useEffect(() => {
    const view = editor.current;
    if (view) {
      view.dispatch({
        effects: themeConf.reconfigure(getTheme(theme)),
      });
    }
  }, [theme]);

  useEffect(() => {
    const view = editor.current;
    if (view) {
      view.dispatch({
        effects: editableConf.reconfigure(EditorView.editable.of(!disabled)),
      });
    }
  }, [disabled]);

  useImperativeHandle(forwardedRef, () => ({
    setValue,
    getValue,
  }));
  return <div ref={editorRef}></div>;
};

export default forwardRef(LogViewerCodeMirror);
