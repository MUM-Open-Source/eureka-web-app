import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import Vuelidate from "vuelidate";

// import { db, auth } from "@/firebase";

// const db = require('@/firebase')
// const auth = require('@/firebase')

createApp(App)
  .use(Vuelidate as any)
  .use(store)
  .use(router)
  .mount("#app");
