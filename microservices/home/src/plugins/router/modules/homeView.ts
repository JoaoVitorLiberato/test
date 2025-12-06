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
      title: import.meta.env.VITE_APP_WEB_TITLE,
      description: import.meta.env.VITE_APP_WEB_DESCRIPTION
    }
  },
]
