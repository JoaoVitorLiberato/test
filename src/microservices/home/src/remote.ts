import { createApp } from 'vue'
import App from '@/App.vue'

import router from '@/plugins/router'
import vuetify from '@/plugins/vuetify'
import store from '@/plugins/store'
// import app from "@/main"

export function mount(el:string) {
  const app = createApp(App)

  app.use(vuetify)
  app.use(router)
  app.use(store)

  app.mount(el)

  return app
}