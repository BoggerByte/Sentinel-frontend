import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";

import { BootstrapVue3 } from "bootstrap-vue-3";
import { BToastPlugin } from "bootstrap-vue-3";

import "./style.sass";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";


const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .use(BootstrapVue3)
    .use(BToastPlugin)
    .mount('#app')
