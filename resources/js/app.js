import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler";
import {createPinia} from 'pinia'
import mixin from "./mixin.js";
import router from './router.js';
import vueToastr from "vue-toastr";
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
// app.use(vueToastr);
app.mount('#app');


