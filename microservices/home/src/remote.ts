import { createApp } from 'vue'
import App from '@/App.vue'

import router from './plugins/router'
import vuetify from './plugins/vuetify'
import store from './plugins/store'

export function mount(el:string) {
  const app = createApp(App)

  app.use(vuetify)
  app.use(router)
  app.use(store)

  app.mount(el)

  return app
}


export const version = "1.0.0"