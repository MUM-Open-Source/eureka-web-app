import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
// import { db, auth } from "@/firebase";
// const db = require('@/firebase')
// const auth = require('@/firebase')

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faStar,
    faUsers,
    faSignOutAlt,
    faChevronDown,
    faBorderAll,
    faProjectDiagram,
    faBook,
    faCode,
    faUserShield,
} from '@fortawesome/free-solid-svg-icons'

import { 
    faEnvelope,
    faPaperPlane,
    faFlag,
    faEdit,
    faComments,
    faCalendarAlt,
    faCommentAlt,
    faHandshake,
} from '@fortawesome/free-regular-svg-icons'

library.add(
    faStar,
    faUsers, 
    faEnvelope, 
    faPaperPlane, 
    faFlag,
    faEdit,
    faSignOutAlt,
    faChevronDown,
    faBorderAll,
    faComments,
    faProjectDiagram,
    faBook,
    faCalendarAlt,
    faCode,
    faUserShield,
    faCommentAlt,
    faHandshake,
)

createApp(App)
    .use(store)
    .use(router)
    .component('fa', FontAwesomeIcon)
    .mount('#app');
