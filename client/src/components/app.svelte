<App { ...f7params }>


  <!-- Views/Tabs container -->
  <Views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <Toolbar tabbar icons bottom>
      <!-- <Link id="#view-home" tabLink="#view-home" tabLinkActive iconMd="material:home" text="Home" /> -->
      <Link id="#view-genera" tabLink="#view-genera" iconMd="material:qr_code_2" text="Genera" />
      <Link id="#view-utente" tabLink="#view-utente" iconMd="material:account_circle" text="Utente" />
      <Link id="#view-scan" tabLink="#view-scan" iconMd="material:qr_code" text="Scannerizza" />
    </Toolbar>

    <!-- <View id="view-home" main tab tabActive url="/" /> -->
    <View id="view-genera" name="genera" tab tabActive main url="/" />
    <View id="view-utente" name="utente" tab url="/utente/" />
    <View id="view-scan" name="scan" tab url="/scanner/" />

  </Views>
</App>
<script>
  import { onMount } from 'svelte';
  import { getDevice }  from 'framework7/lite-bundle';
  import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter
  } from 'framework7-svelte';

  import capacitorApp from '../js/capacitor-app';
  import routes from '../js/routes';

  const device = getDevice();
  // Framework7 Parameters
  let f7params = {
    name: 'PersonalQrCode', // App name
    theme: 'md', // Automatic theme detection
    colors: {
      primary: '#00f4ff',
    },
    darkMode: true,
    // App routes
    routes: routes,

    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV ==='production' ? {
      path: '/service-worker.js',
    } : {},
    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };

  onMount(() => {
    f7ready(() => {

      // Init capacitor APIs (see capacitor-app.js)
      if (f7.device.capacitor) {
        capacitorApp.init(f7);
      }
      // Call F7 APIs here
    });
  })
</script>