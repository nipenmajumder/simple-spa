import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler";
import { createPinia } from 'pinia'
import mixin from "./mixin.js";
import router from './router.js';

import DefaultComponent from "./components/DefaultComponent.vue";
const pinia = createPinia();
const Vue = createApp({
    components: {
        DefaultComponent,
    }
})
    .use(router)
    .use(pinia)
    .mixin(mixin)
    .mount('#app');


