import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import VuelidatePlugin from "@vuelidate/core";
import Vue from "vue";

// import { db, auth } from "@/firebase";
// const db = require('@/firebase')
// const auth = require('@/firebase')
<<<<<<< HEAD
createApp(App)
  .use(VuelidatePlugin)
  .use(store)
  .use(router)
  .mount("#app");
=======

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar)

createApp(App)
    .use(store)
    .use(router)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
>>>>>>> master
