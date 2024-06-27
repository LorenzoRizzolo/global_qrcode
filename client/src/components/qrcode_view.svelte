<script>
    import { Block,
        Button,
        Popup,
        Page,
        Navbar, 
        NavRight,
        Link, 
        Icon,
        ListInput,
        Preloader,
        List,
        app,
        f7
    } from "framework7-svelte";
    import {logged, user_data} from "../js/store"

    export let title
    export let qrcode
    export let scarica_qr = ()=>{}

</script>

<Popup push class="qrcode_view">
    <Page>
      <Navbar title={"QrCode"}>
        <NavRight>
          <Link popupClose><Icon material="close" color="red" /></Link>
        </NavRight>
      </Navbar>

      <Block>
        <div class="center column">
          {#if qrcode!=""}
            <h2><Icon material="task_alt" color="green"/>  QrCode generato con successo</h2>
            <img class="qrcode" src={"data:image/png;base64,"+qrcode} alt="qrcode">
            <br>
            {title}
            <br>
            <br>
            <Button tonal on:click={scarica_qr}><Icon material="cloud_download" title="scarica qrcode"/> Scarica QrCode</Button>
          {:else}
            <div>Sto elaborando il QrCode</div>
            <Preloader/>
          {/if}
          </div>
      </Block>
      
    </Page>
  </Popup>