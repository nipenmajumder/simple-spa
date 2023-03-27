import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler";
import {createPinia} from 'pinia'
import mixin from "./mixin.js";
import router from './router.js';
import DefaultComponent from "./components/DefaultComponent.vue";
const pinia = createPinia();
const app = createApp({
    components: {
        DefaultComponent,
    }
});
app.mixin(mixin);
app.use(pinia);
app.use(router);
app.mount('#app');


