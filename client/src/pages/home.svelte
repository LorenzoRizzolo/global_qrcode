<Page name="home">
  <!-- Top Navbar -->
  <Navbar>
    <NavTitle sliding>PersonalQrCode</NavTitle>
  </Navbar>

  {#if !logged}
      <Login/>
  {/if}

  <Block strong inset>
    Benvuto nel nostro portale di generazione di QrCode, qui potrai generare QrCode e associarli a video, audio, foto e testo.
  </Block>

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