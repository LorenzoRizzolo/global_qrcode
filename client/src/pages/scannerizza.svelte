<Page name="scan">
    <!-- Top Navbar -->
    <Navbar>
      <NavTitle sliding>Scannerizza</NavTitle>
      <NavRight>
        {#if $logged}
          <Link tabLink="#view-utente" iconMd="material:account_circle" text={$user_data.name} />
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

    {#if !$logged}
      <!-- <Login bind:logged/> -->
    {/if}

    {#if data}
      {#if data.code==100}
        {#if data.qrcode.id_user==me.id || data.qrcode.stato=="pubblico"}
          <Block strong inset>
            <BlockTitle>Dati dalla scannerizzazione</BlockTitle>
            {#if me.id==data.qrcode.id_user}
              <b>Titolo:</b> {data.qrcode.title} <br><br>
              <UpdateQr qr={data.qrcode}/>
              <Link on:click={()=>{scarica_qr(data.qrcode.qrcode, data.qrcode.title)}}><Icon material="qr_code" title="scarica qrcode"/></Link> 
              <Link on:click={()=>{scarica_contenuto(data.qrcode)}}><Icon material="download" title={"scarica "+data.qrcode.type}/></Link> 
              <Link on:click={()=>{delete_qr(data.qrcode.id)}}><Icon material="delete" color="red" title="elimina qrcode"/></Link> 
              { data.qrcode.stato} {data.qrcode.data} {data.qrcode.ora} <br><br>
            {/if}

            {#if data.qrcode.file.type=="testo"}
              {data.qrcode.file.content}
            {:else if data.qrcode.file.type=="link"}
             <a href={data.qrcode.file.content}>Apri link {data.qrcode.file.content}</a>
            {:else if data.qrcode.file.type=="video"}
              <div class="video">
                <video controls>
                  <source type="video/mp4" src="{`data:video/mp4;base64,${data.qrcode.file.content}`}">
                  Your browser does not support the video tag.
                </video>
              </div>
            {:else if data.qrcode.file.type=="immagine"}
              <div class="video">
                <img src="{`data:image/png;base64,${data.qrcode.file.content}`}">
              </div>
            {:else if data.qrcode.file.type=="audio"}
              <audio controls>
                <source type="audio/mp3" src="{`data:audio/mp3;base64,${base64Audio}`}">
                <!-- Fallback content -->
                Your browser does not support the audio tag.
              </audio>
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

    import UpdateQr from '../components/update_qr.svelte';
  
    import { is_logged, get_me } from '../js/api/login';
    import Scanner from "../components/scanner.svelte";
    import { logged, user_data } from '../js/store';


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
      // console.log(qrcode);
      const byteCharacters = atob(qrcode.file.content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      // Non specificare esplicitamente il tipo di contenuto
      const blob = new Blob([byteArray]);
      saveAs(blob, qrcode.file.name + "." + qrcode.file.extension);
    }

    function delete_qr(id){
      qrcodes = []
      if($logged){
        loading = false
        f7.dialog.confirm("Vuoi eliminare il qrcode?", ()=>{
          delete_qrcode(id).then(data=>{ 
            qrcodes=data.list 
            if(qrcodes){
              qrcodes = qrcodes.reverse()
            }
            f7.dialog.alert("QrCode eliminato")
            loading=true
          })
        })
      }else{
        f7.dialog.alert("Non sei loggato")
      }
    }

    let data

    var me = {}
    get_me().then(res=>{ 
      me=res 
      if(me==undefined){
        me = {id:-1}
      }
    })
  
    // var logged 
    // is_logged().then(res=>{ logged = res==100 })
  
  </script>

  <style>
    video{
      max-width: 600px;
    }
    @media (max-width:780px){
      video{
        max-width: 80%;
      }
      .video{
        display: flex;
        justify-content: center;
      }
    }
  </style>