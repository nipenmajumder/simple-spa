import {createWebHistory, createRouter} from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home',
            isGuest: true
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            title: 'About',
            isGuest: true
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: {
            title: 'Contact',
            isGuest: true
        }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
})
export default router
