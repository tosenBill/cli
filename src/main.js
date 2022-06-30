import Vue from 'vue'

import App from './App.vue'
import router from './router'


// import '@/testBundle/a.js'
// import '@/testBundle/b.js'

import $http from '../api_config/api'

Vue.prototype.$http = $http

window._Vue = new Vue({
    el: '#app',
    render: (h) => h(App),
    router
})