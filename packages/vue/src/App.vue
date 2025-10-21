<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BamaoCodeMirror from './components/CodeMirror/index.vue'
const value = ref(`const { title = '',
  hideHeader = false,
  disabled = false,
  lineWrapping = true,
  width = '100%',
  height = '100%',
  classNames = [] } = options`)
const options = ref({})

onMounted(() => {
  setTimeout(() => {
    value.value = `const { title = '',
  hideHeader = false,
  disabled = false,
  lineWrapping = true,
  width = '100%',
  height = '100%',
  classNames = [] } = options || {}`
    options.value = {
      title: '测试标题',
      hideHeader: true,
      disabled: true,
      langMode: 'markdown',
    }
  }, 1000)
})
</script>

<template>
  <div class="p-2">
    <BamaoCodeMirror v-model="value" :options="options" />
  </div>
</template>
