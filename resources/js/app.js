import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler";
import {createPinia} from 'pinia'
import mixin from "./mixin.js";
import router from './router.js';
// import vueToastr from "vue-toastr";

import '../../public/assets/vendor/js/helpers.js';
import '../../public/assets/js/config.js';
import '../../public/assets/vendor/libs/jquery/jquery.js';
import '../../public/assets/vendor/libs/popper/popper.js';
import '../../public/assets/vendor/js/bootstrap.js';
import '../../public/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js';
import '../../public/assets/vendor/js/menu.js';
import '../../public/assets/vendor/libs/apex-charts/apexcharts.js';
import '../../public/assets/js/main.js';
import '../../public/assets/js/dashboards-analytics.js';

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


