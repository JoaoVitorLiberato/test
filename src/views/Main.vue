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

<!-- src/App.vue do shell (container principal) -->
<template>
  <div>
    <h1>Shell rodando perfeitamente!</h1>
    <button @click="loadHome">Carregar MF-Home</button>
    <div id="mf-home-container"></div>
  </div>
</template>

<script setup lang="ts">
async function loadHome() {
  try {
    // Carrega o remote mf-home
    const { mount } = await import('mf_home/App')
    
    // Monta no container
    mount(document.getElementById('mf-home-container')!)
    
    console.log('mf-home carregado com sucesso!')
  } catch (err) {
    console.error('Erro ao carregar mf-home:', err)
  }
}
</script>

<style>
#mf-home-container {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #42b983;
  border-radius: 8px;
}
</style>