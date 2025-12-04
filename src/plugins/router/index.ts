import { createMemoryHistory, createRouter } from 'vue-router'
import homeView from '@/plugins/router/modules/homeView'


const routes = [].concat(
  homeView as Array<never>
)

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

// router.beforeEach((to, _from, next) => {
//   next()
// })

export default router
