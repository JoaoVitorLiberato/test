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

  onMounted(async () => {
    try {
      const mod = await import('core')
      // mod.default.mount(remote.value!)
      console.log('teste', mod)
    } catch (err) {
      console.error('Error loading MF-Home:', err)
    }
  })

  onMounted(async() => {
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
  })
</script>
