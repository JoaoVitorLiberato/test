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
  import { onMounted } from "vue"
  import { ensureRemote } from '@/utils/federation';

onMounted(async () => {
  try {
    await ensureRemote(
      "core",
      "http://localhost:8080/core/remoteEntry.js",
      "/index"
    );
    const core = await import('core/index'); // usar o caminho exposto
    console.log('core loaded', core);
  } catch (err) {
    console.error('Error loading core module:', err);
  }
});

  // onMounted(async() => {
    // try {
      // Importação do core via Module Federation
      // A função importRemote garante que o remoteEntry.js seja carregado antes


      // await fetch("https://red-dust-119d.vertexdigital.workers.dev/?canalvendas=varejo&segmento=controle-fatura&regiao=SP&ddd=11", {
      //   method: "GET"
      // }).then((response) => response.json())
      // .then((c) => {
      //   console.log(c)
      // })

      // console.log("core", something)
    // } catch (error) {
    //   console.error("Error loading core module:", error)
    // }
  // })
</script>
