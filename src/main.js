import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.css'
import router from "@/router/index.js";
import VueDragscroll from "vue-dragscroll";
import PrimeVue from "primevue/config";
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(VueDragscroll);
app.use(PrimeVue)
app.mount('#app')
