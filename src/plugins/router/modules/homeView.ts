export default [
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    meta: {
      title: "Titulo meta para SEO e ficar salvo caso esquecça env",
      description: "Descreva com detalhes para SEO ou melhor, use o mesmo do description caso for um unico segmento"
    }
  },
]
