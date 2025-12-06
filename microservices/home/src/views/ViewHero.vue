<template>
  <v-container
    fluid
  >
    <v-row
      align="start"
      no-gutters
    >
      <v-col
        cols="12"
      >
        <h1>
          mf-home -teste
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from "vue"

  onMounted(async () => {
    try {
      const core = await import('core/index')
      console.log('core loaded', core);
    } catch (err) {
      console.error('Error loading core module:', err);
    }
  });
</script>
