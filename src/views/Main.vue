<template>
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

</script>
