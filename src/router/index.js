import VueRouter from 'vue-router'
import Vue from 'vue'

const Home = () => import(/* webpackChunkName: "Home" */ '../pages/home.vue')
const Abort = () => import(/* webpackChunkName: "Abort" */ '../pages/abort.vue')

Vue.use(VueRouter)

const routers = new VueRouter({
    routes: [
        { path: '/', component: Home},
        { path: '/abort', component: Abort},
    ]
})

export default routers