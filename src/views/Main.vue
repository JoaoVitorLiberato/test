<!-- src/views/Main.vue (no shell, não no mf-home) -->
<template>
  <div ref="remote" />
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  const remote = ref(null)

  onMounted(async () => {
    try {
      const mod = await import("mf_home/App")  // ← Mude aqui para "mf_home/App"
      mod.default.mount(remote.value!)
      console.log('MF-Home mounted successfully!')  // Adicione para debug
    } catch (err) {
      console.error('Error loading MF-Home:', err)  // Adicione para capturar erros
    }

  onUnmounted(async () => {
    const mod = await import("mf_home/App")  // ← Mude aqui para "mf_home/App"
    mod.default.mount()// Adicione para debug
  })
</script>