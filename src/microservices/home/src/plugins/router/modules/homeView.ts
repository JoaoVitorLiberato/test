export default [
  {
    path: '/',
    component: () => import('@/routes/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'homeView',
        components: {
          ViewHome: () => import('@/views/Main.vue'),
        },
      },
    ],
    meta: {
      title: "Titulo meta para SEO e ficar salvo caso esquecça env",
      description: "Descreva com detalhes para SEO ou melhor, use o mesmo do description caso for um unico segmento"
    }
  },
]
