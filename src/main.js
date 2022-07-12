// 完整映入
// import 'core-js'
// 按需加载: 如 promise
// import 'core-js/es/promise'

import Vue from 'vue'

import App from './App.vue'
import router from './router'

// import {locationPath} from "@/utils"

import "../src/css/iconfont.css"


// import '@/testBundle/a.js'
// import '@/testBundle/b.js'

import $http from '../api_config/api'

Vue.prototype.$http = $http

window._Vue = new Vue({
    el: '#app',
    render: (h) => h(App),
    router
})