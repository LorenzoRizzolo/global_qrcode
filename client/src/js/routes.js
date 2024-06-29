import NotFoundPage from '../pages/404.svelte';
import generaPage from "../pages/genera.svelte"
import userPage from "../pages/user.svelte"
import ScannerPage from "../pages/scannerizza.svelte"

var routes = [
  {
    path: '/',
    browserHistoryTabs: "replace",
    component: generaPage,
  },
  {
    path: '/utente/',
    browserHistoryTabs: "replace",
    component: userPage,
  },
  {
    path: '/scanner/',
    browserHistoryTabs: "replace",
    component: ScannerPage,
  },
  {
    path: '(.*)',
    browserHistoryTabs: "replace",
    component: NotFoundPage,
  }
];

export default routes;
