import Vue from 'vue'
import VueRouter from 'vue-router'
import discovery from '../views/discovery.vue'
import latestlist from '../views/latestlist.vue'
import recommend from '../views/recommend.vue'
import mv from '../views/mv.vue'
import playlist from '../views/playlist.vue'
import result from '../views/result.vue'
Vue.use(VueRouter)
let router=new VueRouter({
    routes:[{path:'/',component:discovery,alias:'/discovery'},
            {path:'/latest',component:latestlist},
            {path:'/recommend',component:recommend},
            {path:'/mv',component:mv},
            {path:'/result',component:result},
            {path:'/playlist',component:playlist}
            ]
})
export default router