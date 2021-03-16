import store from '@/store';

export default function checkAuth(to, next) {
  const isLoggedIn = (store.state.user !== null);
  const isLoading = store.state.isLoading;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // to redirect users who aren't logged in
  if (requiresAuth && !isLoggedIn && isLoading) next({ name: 'Home' })
  // to redirect users accessing login and signup pages before they are authenticated
  else if (['Login', 'SignUp'].includes(to.name) && isLoading) next({ name: 'Home' })
  else next();
}