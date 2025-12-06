import { defineStore } from "pinia"

const payloadStoreModule = defineStore("payloadStoreModule", {
  state: () => ({
    count: 0
  }),
  getters: {
    getCount: ({ count }) => () => count
  },
  actions: {}
})

export {
  payloadStoreModule
}
