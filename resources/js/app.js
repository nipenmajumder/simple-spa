import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler";
import {ZiggyVue} from '../../vendor/tightenco/ziggy/dist/vue.m';
import mixin from "./mixin.js";
import router from './router.js';

import DefaultComponent from "./components/DefaultComponent.vue";

const Vue = createApp({
    components: {
        DefaultComponent,
    }
})
    .use(router)
    .mixin(mixin)
    .mount('#app');


// Vue.component('default-component', DefaultComponent);
