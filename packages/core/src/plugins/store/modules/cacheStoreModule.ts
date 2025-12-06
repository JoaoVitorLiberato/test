import { defineStore } from "pinia"

const cacheStoreModule = defineStore("cacheStoreModule", {
  state: () => ({
    count: 0
  }),
  getters: {
    getCount: ({ count }) => () => count
  },
  actions: {}
})

export {
  cacheStoreModule
}
