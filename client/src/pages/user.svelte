<Page name="user">
    <!-- Top Navbar -->
    <Navbar>
      <NavTitle sliding>Pagina utente</NavTitle>
    </Navbar>

    {#if !logged}
        <Login/>
    {/if}
    
  </Page>
  <script>
    import {
      Page,
      Navbar,
      NavLeft,
      NavTitle,
      NavTitleLarge,
      NavRight,
      Link,
      Toolbar,
      Block,
      BlockTitle,
      List,
      ListItem,
      Button
    } from 'framework7-svelte';

    import Login from '../components/login.svelte';
    import { is_logged } from '../js/api/login';

    var logged 
  is_logged(localStorage.getItem("token")).then(res=>{ logged = res==100 })

  </script>