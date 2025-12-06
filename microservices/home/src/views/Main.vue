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
          Microfrontend mf-home
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"

  const dialogStore = ref(null)

  onMounted(async() => {
    try {
      // Load remoteEntry.js first if not already loaded
      const remoteUrl = import.meta.env.DEV
        ? 'http://localhost:3000/core/remoteEntry.js'
        : '/core/remoteEntry.js';

      const existingScript = document.querySelector(`script[data-remote="core"]`);
      if (!existingScript) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = remoteUrl;
          script.async = true;
          script.setAttribute('data-remote', 'core');

          script.onload = () => setTimeout(() => resolve(), 200);
          script.onerror = () => reject(new Error(`Failed to load core remote entry`));

          document.head.appendChild(script);
        });
      }

      // After loading remoteEntry.js, the Module Federation runtime should be available
      // Try to access the remote module through the Module Federation API
      // @ts-ignore - Module Federation runtime
      const coreRemote = window.__federation_shared__?.core || (window as any).core;

      if (coreRemote && typeof coreRemote.get === 'function') {
        // Access the exposed module (expose "." means we use ".")
        const coreModule = await coreRemote.get('.');
        dialogStore.value = coreModule.dialogStoreModule();
      } else {
        // Fallback: try direct import (Module Federation should transform this)
        const coreModule = await import(/* @vite-ignore */ 'core/');
        dialogStore.value = coreModule.dialogStoreModule();
      }

      await fetch("https://red-dust-119d.vertexdigital.workers.dev/?canalvendas=varejo&segmento=controle-fatura&regiao=SP&ddd=11", {
        method: "GET"
      }).then((response) => response.json())
      .then((c) => {
        console.log(c)
      })

      console.log("dialogStore", dialogStore.value)
    } catch (error) {
      console.error("Error loading core module:", error)
    }
  })
</script>
