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
      <Block inset strong>
        <div class="center"><h1><Icon material="account_circle"/> {$user_data.name}</h1></div>
      </Block>
      <Block class="search-list" inset strong>
          {#if $qrcodes}
            {#if $qrcodes.length}
              {#each Object.entries($qrcodes) as [k, qr]}
                <Block class="item-search">
                  <BlockTitle>{qr.title}</BlockTitle>
                    <UpdateQr {k} />
                    <Link on:click={()=>{scarica_qr(qr.id, qr.title)}}><Icon material="qr_code" title="scarica qrcode"/></Link> 
                    <Link on:click={()=>{scarica_contenuto(qr.id)}}><Icon material="download" title={"scarica "+qr.type}/></Link> 
                    <Link on:click={()=>{delete_qr(qr.id)}}><Icon material="delete" color="red" title="elimina qrcode"/></Link> 
                  { qr.stato} {qr.type} {qr.data} {qr.ora}
                </Block>
              {/each}
            {:else}
                <div>Nessun QrCode Trovato</div>
            {/if}
          {/if}
      </Block>
    {/if}

    {#if $logged}
      <Block inset strong>
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
              $qrcodes = []
                delete_qrcode(id).then(data => {
                    $qrcodes = data.list;
                    if ($qrcodes) {
                        $qrcodes = $qrcodes.reverse();
                    }
                    f7.dialog.alert("QrCode eliminato");
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

    // var logged = false
    // is_logged(localStorage.getItem("token")).then(res=>{
    //   logged = res==100 
    // })

    // function reload(done){
    //   setTimeout(() => {
    //     console.log("ciao")
    //     done()
    //   }, 1000);
    // }


  </script>