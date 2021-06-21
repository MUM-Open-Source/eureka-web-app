import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from '@/store/index.js'
// import { db, auth } from "@/firebase";

// const router = require('@/router/index.js')
const store = require('@/store')
// const db = require('@/firebase')
// const auth = require('@/firebase')

createApp(App).use(store).use(router).mount('#app')
