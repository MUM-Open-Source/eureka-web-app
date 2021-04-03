import { createRouter, createWebHistory } from 'vue-router';
import checkAuth from '@/middleware/checkAuth.js';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Admin from '@/views/Admin.vue';
import SignUp from '@/views/SignUp.vue';
import FindTalent from '@/views/FindTalent.vue';
import FindMentor from '@/views/FindMentor.vue';
import Feedback from '@/views/Feedback.vue';
import UserProfile from '@/views/UserProfile.vue';
import WavesFromTalent from '@/views/WavesFromTalent.vue';
import WavesFromMentors from '@/views/WavesFromMentors.vue';
import BrowseEvents from '@/views/BrowseEvents.vue';
import NotFound from '@/views/NotFound.vue';
import Maintenance from '@/views/Maintenance.vue';
import CropImage from '@/views/CropImage.vue';
import ResetPassword from '@/views/ResetPassword.vue'
import Terms from '@/views/Terms.vue'
import Privacy from '@/views/Privacy.vue'

// all the different paths for the SPA
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }, {
    path: '/find-talent',
    name: 'FindTalent',
    component: FindTalent,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/find-mentor',
    name: 'FindMentor',
    component: FindMentor,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/profile/info',

  }, {
    path: '/browse-events',
    name: 'BrowseEvents',
    component: BrowseEvents,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/profile',
    name: 'Profile',
    component: UserProfile,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/profile/crop-image',
    name: 'CropImage',
    component: CropImage,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/profile/waves-from-talent',
    name: 'WavesFromTalent',
    component: WavesFromTalent,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/profile/waves-from-mentors',
    name: 'WavesFromMentors',
    component: WavesFromMentors,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }, {
    path: '/maintenance',
    name: 'Maintenance',
    component: Maintenance,
  }, {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/terms-and-conditions',
    name: 'Terms',
    component: Terms,
  }, {
    path: '/privacy-policy',
    name: 'Privacy',
    component: Privacy,
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which isLoading lazy-loaded when the route isLoading visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router guards
router.beforeEach(async (to, from, next) => {
  checkAuth(to, next);
})

export default router