export default [
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    meta: {
      title: import.meta.env.VITE_APP_WEB_TITLE,
      description: import.meta.env.VITE_APP_WEB_DESCRIPTION
    }
  },
]
