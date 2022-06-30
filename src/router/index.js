import VueRouter from 'vue-router'
import Vue from 'vue'

import Home from '../pages/home.vue'
import Abort from '../pages/abort.vue'

Vue.use(VueRouter)

const routers = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/abort', component: Abort },
    ]
})

export default routers