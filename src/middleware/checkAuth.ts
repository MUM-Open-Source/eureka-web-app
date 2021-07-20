import store from '@/store';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export default function checkAuth(
    to: RouteLocationNormalized,
    next: NavigationGuardNext
): void {
    const isLoggedIn = store.state.user !== null;
    const isLoading = store.state.isLoading;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // to redirect users who aren't logged in
    if (requiresAuth && !isLoggedIn && isLoading) next({ name: 'Home' });
    // to redirect users accessing login and signup pages before they are authenticated
    else if (['Login', 'SignUp'].includes(String(to.name)) && isLoading)
        next({ name: 'Home' });
    else next();
}
