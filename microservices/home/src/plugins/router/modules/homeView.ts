export default [
  {
    path: '/',
    component: () => import('@/routes/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'homeView',
        components: {
          ViewHero: () => import('@/views/ViewHero.vue'),
        },
      },
    ],
    meta: {
      title: import.meta.env.VITE_APP_WEB_TITLE,
      description: import.meta.env.VITE_APP_WEB_DESCRIPTION
    }
  },
]
