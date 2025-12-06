import { defineStore } from "pinia"

const dialogStoreModule = defineStore("dialogStoreModule", {
  state: () => ({
    count: 0
  }),
  getters: {
    getCount: ({ count }) => () => count
  },
  actions: {}
})

export {
  dialogStoreModule
}
