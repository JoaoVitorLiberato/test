<template>
  <div
    ref="remote"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const remote = ref(null)

  onMounted(async () => {
    const { mount } = await import('home/App')
    console.log("carregando MF...", remote.value)
    mount(remote.value)
  })
</script>
