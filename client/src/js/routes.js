
import HomePage from '../pages/home.svelte';
import NotFoundPage from '../pages/404.svelte';
import generaPage from "../pages/genera.svelte"
import userPage from "../pages/user.svelte"

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/genera/',
    component: generaPage,
  },
  {
    path: '/utente/',
    component: userPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
