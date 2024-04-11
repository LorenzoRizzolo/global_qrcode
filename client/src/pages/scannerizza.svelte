<Page name="scan">
    <!-- Top Navbar -->
    <Navbar>
      <NavTitle sliding>Scannerizza</NavTitle>
      <NavRight>
        {#if logged}
          <Link tabLink="#view-utente" iconMd="material:account_circle" text={JSON.parse(localStorage.getItem("user")).name} />
        {/if}
      </NavRight>
    </Navbar>

    <Fab position="right-bottom">
      <Icon material="add" />
      <Icon material="close" />
      <FabButtons position="top">
        <FabButton label="Scannerizza Qrcode"><Button iconMaterial="qr_code_scanner" link="#" popupOpen=".scanner"/></FabButton>
      </FabButtons>
    </Fab>
  
    <Scanner bind:data/>

    {#if !logged}
      <!-- <Login bind:logged/> -->
    {/if}

    {#if data}
      {#if data.code==100}
        {#if data.qrcode.id_user==me.id || data.qrcode.stato=="pubblico"}
          <Block strong inset>
            <BlockTitle>Dati dalla scannerizzazione</BlockTitle>
            {#if me.id==data.qrcode.id_user}
              <b>Titolo:</b> {data.qrcode.title} <br><br>
              <Link on:click={()=>{}}><Icon material="edit" title="modifica qrcode"/></Link> 
              <Link on:click={()=>{scarica_qr(data.qrcode.qrcode, data.qrcode.title)}}><Icon material="cloud_download" title="scarica qrcode"/></Link> 
              <Link on:click={()=>{}}><Icon material="delete" color="red" title="elimina qrcode"/></Link> 
              { data.qrcode.stato} {data.qrcode.data} {data.qrcode.ora} <br><br>
            {/if}
            {#if data.qrcode.file.type=="testo"}
              {data.qrcode.file.content}
            {/if}
          </Block>
        {/if}
      {:else if data.code==101}
          <Block strong inset>{data.detail}</Block>
      {:else}
          <Block strong inset>Errore</Block>
      {/if}
    {:else}
      <Block strong inset>
        Premi sul pulsante <Icon material="add"/> al fondo della pagina per scannerizzare il QrCode
      </Block> 
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
      Icon,
      BlockTitle,
      List,
      ListItem,
      Fab,
      FabButtons,
      FabButton,
      Button
    } from 'framework7-svelte';
  
    import Login from '../components/login.svelte';
    import { is_logged, get_me } from '../js/api/login';
    import Scanner from "../components/scanner.svelte";

    let data

    var me = {}
    get_me().then(res=>{ 
      me=res 
      if(me==undefined){
        me = {id:-1}
      }
    })
  
    var logged 
    is_logged().then(res=>{ logged = res==100 })
  
  </script>