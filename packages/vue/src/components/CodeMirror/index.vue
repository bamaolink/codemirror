<script lang="ts" setup>
import './index.css'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import {
  basicSetup,
  chinese,
  languageConf,
  editableConf,
  themeConf,
  themeStyleConf,
  lineWrappingConf,
  getTheme,
  getLangModel,
  themeStyles,
  langs,
  capitalizeFirstLetter,
  copyToClipboard
} from '@bamaolink/codemirror-common'
import type { BaMaoCodeMirrorProps, LangModelType, ThemeType } from './typing'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { SunIcon, MoonIcon, CopyIcon } from 'lucide-vue-next'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from "@/components/ui/button"
import 'vue-sonner/style.css'
import { useColorMode } from '@vueuse/core'

let isInitialize = false

const { onChange, onThemeChange, options = {} } = defineProps<BaMaoCodeMirrorProps>()
const {
  title = '',
  hideHeader = false,
  disabled = false,
  lineWrapping = true,
  themeStorageKey = 'bamao-code-mirror-theme',
  width = '100%',
  height = '100%',
  classNames = []
} = options

const modelValue = defineModel<string>()
const editorRef = ref<HTMLDivElement>()
const editor = ref<EditorView>()

const langMode = ref<LangModelType>(
  options.langMode || 'javascript'
)
const theme = useColorMode({
  storageKey: themeStorageKey
})

const triggerChange = (changedValue: string) => {
  if (!editor.value || !editorRef) {
    return
  }
  modelValue.value = changedValue
  onChange?.(changedValue, editor.value as EditorView, editorRef.value as HTMLDivElement)
}

const initializeEditor = () => {
  if (!editorRef || isInitialize) {
    return
  }
  const lang = getLangModel(langMode.value)
  const state = EditorState.create({
    doc: modelValue.value || '',
    extensions: [
      basicSetup,
      EditorState.phrases.of(chinese),
      themeConf.of(getTheme('dark')),
      editableConf.of(EditorView.editable.of(!disabled)),
      languageConf.of(lang),
      lineWrappingConf.of(lineWrapping ? EditorView.lineWrapping : []),
      themeStyleConf.of(
        EditorView.theme({
          ...themeStyles,
          '&': {
            width,
            height,
          },
        })
      ),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          triggerChange(update.state.doc.toString())
        }
      }),
    ],
  })

  const view = new EditorView({
    state: state,
    parent: editorRef.value!,
  })

  editor.value = view
  isInitialize = true
}

const getValue = () => {
  if (!editor.value) {
    return ''
  }
  return editor.value.state.doc.toString() || ''
}

const setValue = (value = '') => {
  if (!editor.value) {
    return
  }
  const view = editor.value
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: value },
  })
}

const copyContent = async () => {
  try {
    const text = getValue()
    await copyToClipboard(text)
    toast.success('复制内容成功，请在剪切板中查看')
  } catch (error) {
    toast.error('复制失败，请手动复制')
    console.log(error)
  }
}

onMounted(() => {
  initializeEditor()
})

watch(() => modelValue.value, (newValue) => {
  if (!editor.value) {
    return
  }
  const curr = getValue()
  if (newValue !== curr) {
    setValue(newValue)
  }
})

watch(() => langMode.value, (newValue) => {
  if (!editor.value) {
    return
  }
  editor.value.dispatch({
    effects: languageConf.reconfigure(getLangModel(newValue)),
  })
})

watchEffect(() => {
  if (!editor.value) {
    return
  }
  const currTheme = getTheme(theme.value as ThemeType)
  editor.value.dispatch({
    effects: themeConf.reconfigure(currTheme),
  })
  onThemeChange?.(theme.value as ThemeType)
})

watch(() => options, () => {
  if (!editor.value) {
    return
  }
  const view = editor.value
  if (options.langMode !== langMode.value) {
    langMode.value = options.langMode || 'javascript'
  }
  if (options.theme && theme.value !== options.theme) {
    theme.value = options.theme as "dark" | "light" | "auto"
  }
  if (typeof options.disabled === 'boolean') {
    view.dispatch({
      effects: editableConf.reconfigure(
        EditorView.editable.of(!options.disabled)
      ),
    })
  }
  if (typeof options.lineWrapping === 'boolean') {
    view.dispatch({
      effects: lineWrappingConf.reconfigure(
        options.lineWrapping ? EditorView.lineWrapping : []
      ),
    })
  }
  if (options.width !== width || options.height !== height) {
    view.dispatch({
      effects: themeStyleConf.reconfigure(
        EditorView.theme({
          ...themeStyles,
          '&': {
            width: options.width || '100%',
            height: options.height || '100%',
          },
        })
      ),
    })
  }
})

defineExpose({
  getValue,
  setValue,
  getEditor: () => editor.value,
  getEditorRef: () => editorRef.value,
})
</script>

<template>
  <div :class="`bamao-code-mirror outline outline-gray-200 dark:outline-gray-800 overflow-hidden rounded-sm
    ${classNames.join(' ')}`">
    <div
      class="flex items-center gap-2 p-2 w-full bg-wihte dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-800"
      v-if="!hideHeader">
      <div class="title flex-1 text-sm p-1">{{ title }}</div>
      <Button size="icon-sm" variant="outline" @click="() => { theme = theme === 'dark' ? 'light' : 'dark' }">
        <MoonIcon v-if="theme === 'dark'" />
        <SunIcon v-else />
      </Button>
      <Button @click="() => copyContent()" size="icon-sm" variant="outline" title="copy">
        <CopyIcon />
      </Button>
      <Select @chage="(val: LangModelType) => { langMode = val }" v-model="langMode">
        <SelectTrigger size="sm">
          <SelectValue placeholder="请选择" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="lang in Object.keys(langs)" :value="lang" :key="lang">
            {{ capitalizeFirstLetter(lang) }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="eidtor" ref="editorRef"></div>
    <Toaster position="top-center" />
  </div>
</template>
