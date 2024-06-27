<Page name="utente" ptr ptrMousewheel={true} onPtrRefresh={reload}>
    <!-- Top Navbar -->
    <Navbar>
      <NavTitle>Pagina utente</NavTitle>
      <NavRight>
        {#if $logged}
          <Link tabLink="#view-utente" iconMd="material:account_circle" text={$user_data.name} />
        {/if}
      </NavRight>
    </Navbar>

    {#if !$logged}
      <LoginPage/>
    {:else}
      <Block inset strong class="mine_block">
        <div class="center"><h1><Icon material="account_circle"/> {$user_data.name}</h1></div>
      </Block>

      <Block strong inset class="mine_block">
        <Button class="mine_but" tonal on:click={reload}><Icon material="refresh"/></Button>
      </Block>

          {#if $qrcodes}
            {#if $qrcodes.length}
              {#each Object.entries(mine_qrcodes) as [k, qr]}
                <Block class="item-search mine_block" strong inset>
                  <BlockTitle>{qr.title}</BlockTitle>
                    <UpdateQr {k} />
                    <Button tonal class="mine_but" on:click={()=>{scarica_qr(qr.id, qr.title)}}><Icon material="qr_code" title="scarica qrcode"/></Button>
                    <Button tonal class="mine_but" on:click={()=>{scarica_contenuto(qr.id)}}><Icon material="download" title={"scarica "+qr.type}/></Button>
                    <Button tonal class="mine_but" on:click={()=>{delete_qr(qr.id)}}><Icon material="delete" color="red" title="elimina qrcode"/></Button>
                    <!-- <br class="mobile"> -->
                    <br>
                    <div class="content">
                      <b>Tipologia: </b>{ qr.type} <br>
                      <b>Stato: </b>{qr.stato } <br>
                      {qr.data} {qr.ora}</div>
                </Block>
              {/each}
            {:else}
                <Block strong inset class="mine_block">Nessun QrCode Trovato</Block>
            {/if}
          {/if}
    {/if}

    {#if $logged}
      <Block inset strong class="mine_block">
        <Button color="red" on:click={logout}>Esci</Button>
      </Block>
    {/if}
    
  </Page>
  <script>
    import {
      Page,
      Navbar,
      NavTitle,
      NavRight,
      Link,
      Block,
      BlockTitle,
      Icon,
      Button,
      f7,
      Subnavbar,
      Searchbar,
      app

    } from 'framework7-svelte';
    import LoginPage from '../components/loginpage.svelte';
    import UpdateQr from '../components/update_qr.svelte';
    import { is_logged, logout } from '../js/api/login';
    import { logged, user_data, qrcodes } from '../js/store';

    import { get_mine_qrcodes, delete_qrcode, get_content, get_qrcode } from "../js/api/qrcode"

    let data = $user_data

    let loading = false

    let mine_qrcodes = []
    qrcodes.subscribe(value=>mine_qrcodes=value)

    function reload(done){
      $qrcodes = []
      if($logged){
        loading = false
        get_mine_qrcodes().then(data=>{ 
          $qrcodes=data.list 
          if($qrcodes){
            $qrcodes = $qrcodes.reverse()
          }
          loading=true 
          done()
        })
      }else{
        done()
      }
    }

    function delete_qr(id){
      if($logged){
        loading = false
        f7.dialog.confirm(
            "Vuoi eliminare il qrcode?",
            () => {
                delete_qrcode(id).then(data => {
                    $qrcodes=$qrcodes.filter(item=>item.id!=id)
                    let t = f7.toast.create({
                      text: "QrCode deleted",
                      icon:'<i class="material-icons">check</i>',
                      position: 'center',
                      closeTimeout: 2000,
                    }); t.open();
                    loading = true;
                });
            },
            () => {
                loading=true
            },"Conferma eliminazione"
        );
      }else{
        f7.dialog.alert("Non sei loggato")
      }
    }

    function scarica_qr(id, name){
        f7.dialog.confirm("Confermi di voler scaricare il qrcode ?", () => {
            let t = f7.toast.create({
              text: "Scarico...",
              icon:'<i class="material-icons">check</i>',
              position: 'center',
              closeTimeout: 2000,
            }); t.open();
            get_qrcode(id).then(data=>{
              var qrcode = data.qrcode
              if(qrcode){
                const byteCharacters = atob(qrcode);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                var contentType = "image/png"
                const blob = new Blob([byteArray], {type: contentType});
                saveAs(blob, name+".png");
              }else{
                  f7.dialog.alert("QrCode non valido")
              }
            })
        });
    }

    function scarica_contenuto(id){
      let t = f7.toast.create({
        text: "Scarico...",
        icon:'<i class="material-icons">check</i>',
        position: 'center',
        closeTimeout: 2000,
      }); t.open();
      get_content(id).then(data=>{
        if(data.code==100){
          if(data.file.type=="testo" || data.file.type=="link"){
            const byteCharacters = data.file.content; // Il contenuto del file di testo
            const byteArray = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: 'text/plain' }); // Specifica il tipo di contenuto come testo
            saveAs(blob, data.file.title + "." + data.file.extension);
          }else{
            const byteCharacters = atob(data.file.content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            // Non specificare esplicitamente il tipo di contenuto
            const blob = new Blob([byteArray]);
            saveAs(blob, data.file.title + "." + data.file.extension);
          }
        }
      })
    }
  </script>

  <style>
    .content{
      display: inline-block;
      /* padding: 10px; */
      border-radius: 10px;
      /* background-color: var(--f7-button-tonal-bg-color); */
    }
    /* @media (max-width:780px){
      .content{
        margin-top: 5px;
      }
    } */
      .content{
        margin-top: 5px;
      }
  </style>