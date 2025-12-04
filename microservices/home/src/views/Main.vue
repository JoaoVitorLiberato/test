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

  onMounted(async() => {
    await fetch("https://red-dust-119d.vertexdigital.workers.dev/?canalvendas=varejo&segmento=controle-fatura&regiao=SP&ddd=11", {
      method: "GET"
    }).then((response) => response.json())
    .then((c) => {
      console.log(c)
    })
  })
</script>
