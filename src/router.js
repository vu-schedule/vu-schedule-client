import Vue from 'vue'
import VueRouter from 'vue-router'
import Course from './theme/Course.vue'
import Subject from './theme/Subject.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Course },
    { path: '/:id', component: Subject }
  ]
})

export default router
