import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from "./firebase";
import { db } from "./firebase";

  

createApp(App).use(store).use(router).use(auth).use(db).mount('#app')
