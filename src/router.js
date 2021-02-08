import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import Detail from './components/detail/Detail.vue'
import List from './components/list/List.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { 
            path: '/', 
            component: Home 
        },
        { 
            path: '/list', 
            component: List 
        },
        { 
            path: '/detail/:id', 
            component: Detail,
            props: true
        },        
    ]
})