<!-- <template>
  <div
    ref="remote"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const remote = ref(null)

  onMounted(async () => {
    const mod = await import("home/App")
    mod.default.mount(remote.value!)
  })

</script> -->

<template>
  <div ref="homeContainer" class="h-screen w-screen" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const homeContainer = ref<HTMLElement | null>(null)
let unmountFn: (() => void) | null = null

onMounted(async () => {
  try {
    // Importa dinamicamente o módulo exposto pelo mf-home
    const { mount } = await import('mf_home/App') // ← usa o nome do remote!

    // mount() retorna a instância do app e faz o mount
    const appInstance = mount(homeContainer.value!)

    // Opcional: guarda a função de unmount
    unmountFn = () => appInstance.unmount()
  } catch (err) {
    console.error('Falha ao carregar mf-home:', err)
  }
})

onUnmounted(() => {
  unmountFn?.()
})
</script>