import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import VuelidatePlugin from '@vuelidate/core';

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faStar,
    faBorderAll,
    faProjectDiagram,
    faBook,
    faCode,
    faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import {
    faComments,
    faCalendarAlt,
    faCommentAlt,
    faHandshake,
} from '@fortawesome/free-regular-svg-icons';

library.add(
    faStar,
    faBorderAll,
    faComments,
    faProjectDiagram,
    faBook,
    faCalendarAlt,
    faCode,
    faUserShield,
    faCommentAlt,
    faHandshake
);

createApp(App)
    .use(store)
    .use(router)
    .use(VuelidatePlugin)
    .component('fa', FontAwesomeIcon)
    .mount('#app');
