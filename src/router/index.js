import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../vue-router/index'
import Home from '../views/Home.vue'
import About from '../views/About.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: 'a',
        component: {
          render(h) {
            return <h1> a</h1>
          }
        }
      },
      {
        path: 'b',
        component: {
          render(h) {
            return <h1> b</h1>
          }
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children:[
      {
        path: 'a',
        component: {
          render(h) {
            return <h1> about a</h1>
          }
        }
      },
      {
        path: 'b',
        component: {
          render(h) {
            return <h1> about b</h1>
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})





// 钩子函数
// router.beforeEach((from, to, next) => {
//   setTimeout(()=> {
//     next()
//   }, 1000)
// })

// router.beforeEach((from, to, next) => {
//   setTimeout(()=> {
//     next()
//   }, 1000)
// })

export default router
