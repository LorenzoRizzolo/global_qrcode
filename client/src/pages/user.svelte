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
              {#each $qrcodes as qr}
                <Block class="item-search">
                  <BlockTitle>{qr.title}</BlockTitle>
                    <UpdateQr {qr}/>
                    <Link on:click={()=>{scarica_qr(qr.qrcode, qr.title)}}><Icon material="qr_code" title="scarica qrcode"/></Link> 
                    <Link on:click={()=>{scarica_contenuto(qr)}}><Icon material="download" title={"scarica "+qr.type}/></Link> 
                    <Link on:click={()=>{delete_qr(qr.id)}}><Icon material="delete" color="red" title="elimina qrcode"/></Link> 
                  { qr.stato} {qr.file.type} {qr.data} {qr.ora}
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

    import { get_mine_qrcodes, delete_qrcode } from "../js/api/qrcode"

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

    function scarica_qr(qrcode, name){
        f7.dialog.confirm("Confermi di voler scaricare il qrcode ?", () => {
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
        });
    }

    function scarica_contenuto(qrcode){
      console.log(qrcode.title)
      const byteCharacters = atob(qrcode.file.content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      // Non specificare esplicitamente il tipo di contenuto
      const blob = new Blob([byteArray]);
      saveAs(blob, qrcode.title + "." + qrcode.file.extension);
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