import { createApp } from 'vue'

import router from './plugins/router'
import vuetify from './plugins/vuetify'
import store from './plugins/store'

import App from './App.vue'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(store)

/* Descomentar quando for rodar apenas home */
// app.mount('#app')

export function mount(el: Element | string) {
  if (typeof el === 'string') {
    el = document.querySelector(el) as Element
  }
  app.mount(el)
  return app
}

export function unmount() {
  app.unmount()
}

export const version = "1.0.0"

export default app
