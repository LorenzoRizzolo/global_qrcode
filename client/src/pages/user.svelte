<Page name="utente" ptr ptrMousewheel={true} onPtrRefresh={reload}>
    <!-- Top Navbar -->
    <Navbar>
      <NavTitle>Pagina utente</NavTitle>
      <NavRight>
        {#if logged}
          <Link tabLink="#view-utente" iconMd="material:account_circle" text={JSON.parse(localStorage.getItem("user")).name} />
        {/if}
      </NavRight>
    </Navbar>

    {#if !logged}
      <LoginPage/>
    {:else}
    <Block inset strong>
      <div class="center"><h1><Icon material="account_circle"/> {data.name}</h1></div>
    </Block>
    
    <Block inset strong>
        {#if !loading}
            caricamento...
        {:else if qrcodes.length}
            {#each qrcodes as qr}
              <Block>
                <BlockTitle>{qr.title}</BlockTitle>
                  <Link on:click={()=>{}}><Icon material="edit" title="modifica qrcode"/></Link> 
                  <Link on:click={()=>{scarica_qr(qr.qrcode, qr.title)}}><Icon material="cloud_download" title="scarica qrcode"/></Link> 
                  <Link on:click={()=>{}}><Icon material="delete" color="red" title="elimina qrcode"/></Link> 
                { qr.stato} {qr.data} {qr.ora}
              </Block>
            {/each}
        {:else}
            <div>Nessun QrCode Trovato</div>
        {/if}
    </Block>
    {/if}

    {#if logged}
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
      f7
    } from 'framework7-svelte';
    import LoginPage from '../components/loginpage.svelte';
    import { is_logged, logout } from '../js/api/login';

    import { get_mine_qrcodes } from "../js/api/qrcode"

    let data = JSON.parse(localStorage.getItem("user"))

    var qrcodes = []
    var loading = false
    get_mine_qrcodes().then(data=>{ 
        qrcodes=data.list
        if(qrcodes){
          qrcodes = qrcodes.reverse()
        }
        loading=true 
    })

    function reload(done){
      qrcodes = []
      if(logged){
        var loading = false
        get_mine_qrcodes().then(data=>{ 
          qrcodes=data.list 
          if(qrcodes){
            qrcodes = qrcodes.reverse()
          }
          loading=true 
          done()
        })
      }else{
        done()
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

    var logged = false
    is_logged(localStorage.getItem("token")).then(res=>{
      logged = res==100 
    })

    // function reload(done){
    //   setTimeout(() => {
    //     console.log("ciao")
    //     done()
    //   }, 1000);
    // }


  </script>