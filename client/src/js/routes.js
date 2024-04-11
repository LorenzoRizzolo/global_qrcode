
import HomePage from '../pages/home.svelte';
import NotFoundPage from '../pages/404.svelte';
import generaPage from "../pages/genera.svelte"
import userPage from "../pages/user.svelte"
import ScannerPage from "../pages/scannerizza.svelte"

var routes = [
  {
    path: '/',
    component: generaPage,
  },
  {
    path: '/utente/',
    component: userPage,
  },
  {
    path: '/scanner/',
    component: ScannerPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
