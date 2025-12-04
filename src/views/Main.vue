<!-- src/views/Main.vue (no shell, não no mf-home) -->
<template>
  <div ref="remote" />
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  const remote = ref(null)

  onMounted(async () => {
    try {
      const mod = await import('mf_home/App')
      mod.default.mount(remote.value!)
      console.log('MF-Home mounted successfully!')
    } catch (err) {
      console.error('Error loading MF-Home:', err)
    }
  })

  onUnmounted(async () => {
    try {
      const mod = await import('mf_home/App')
      mod.default.unmount?.()
      console.log('MF-Home unmounted successfully!')
    } catch (err) {
      console.error('Error unloading MF-Home:', err)
    }
  })
</script>