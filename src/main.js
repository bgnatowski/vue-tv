import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.css'
import router from "@/router/index.js";
import VueDragscroll from "vue-dragscroll";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import PrimeVue from "primevue/config";
import { createPinia } from 'pinia'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VueDragscroll);
app.use(PrimeVue)
app.mount('#app')
