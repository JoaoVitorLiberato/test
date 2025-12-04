<!-- src/views/Main.vue (no shell, não no mf-home) -->
<template>
  <div ref="remote" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const remote = ref<HTMLElement | null>(null)

onMounted(async () => {
  try {
    // MUDANÇA CRUCIAL: nome do remote é mf_home, não home
    const mod = await import('mf_home/App')
    
    // Chama a função mount que você exportou no main.ts do mf-home
    mod.mount(remote.value!)
    
    console.log('mf-home carregado com sucesso!')
  } catch (err) {
    console.error('Erro ao carregar mf-home:', err)
  }
})
</script>

<style scoped>
/* Opcional: estilo pro container */
div[ref="remote"] {
  min-height: 100vh;
}
</style>