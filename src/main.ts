import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import VuelidatePlugin from "@vuelidate/core";
import Vue from "vue";

// import { db, auth } from "@/firebase";

// const db = require('@/firebase')
// const auth = require('@/firebase')
createApp(App)
  .use(VuelidatePlugin)
  .use(store)
  .use(router)
  .mount("#app");
