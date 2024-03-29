import {createWebHistory, createRouter} from 'vue-router'
import AppLayout from "./layouts/AppLayout.vue";
import Dashboard from "./layouts/Dashboard.vue";
import Login from "./pages/Login.vue";
import {useAuthUser} from './stores/userStore';
import axios from "axios";

const routes = [
    {
        path: '/',
        redirect: {name: 'dashboard'},
        component: AppLayout,
        meta: {
            title: 'AppLayout',
            requiresAuth: true
        },
        children: [
            {
                path: '/dashboard',
                component: Dashboard,
                name: 'dashboard',
                meta: {
                    title: 'dashboard',
                    requiresAuth: true
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'dashboard',
            isGuest: true
        }
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
});

router.beforeEach((to, from, next) => {
    let state = useAuthUser();
    let isAuthRequired = to.meta.requiresAuth || false;
    // let isAdmin = to.meta.admin || false;
    let isGuest = to.meta.isGuest || false;

    let isLoggedIn = state.token || localStorage.getItem('simple_spa');
    // console.log(isLoggedIn);
    // let permission = stores.state.user.role || null;

    if (isAuthRequired && !isLoggedIn) {
        next({
            path: '/login',
        });
    }

    if (isGuest && isLoggedIn) {
        next({
            path: '/dashboard',
        });
    }

    if (!isLoggedIn){
    }
    let currentLocalToken = state.token;
    axios.get('/get-token')
        .then((response) => {
            if (response.data !== currentLocalToken && isLoggedIn) {
                next({
                    path: '/token',
                });
            }
        })

    next();
})
export default router
