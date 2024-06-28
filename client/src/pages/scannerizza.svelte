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
  
    <Scanner/>

    {#if !$logged}
      <!-- <Login bind:logged/> -->
    {/if}

    {#if my_qrcode.id!=undefined}
        {#if my_qrcode.id_user==me.id || my_qrcode.stato=="pubblico"}
          <Block strong inset>
            <BlockTitle>Dati dalla scannerizzazione</BlockTitle>
            {#if me.id==my_qrcode.id_user}
              <b>Titolo:</b> {my_qrcode.title} <br><br>
              <UpdateQr id={my_qrcode.id}/>
              <Button class="mine_but" tonal on:click={()=>{scarica_qr(my_qrcode.qrcode, my_qrcode.title)}}><Icon material="qr_code" title="scarica qrcode"/></Button> 
              <Button class="mine_but" tonal on:click={()=>{scarica_contenuto(my_qrcode)}}><Icon material="download" title={"scarica "+my_qrcode.type}/></Button> 
              <Button class="mine_but" tonal on:click={()=>{delete_qr(my_qrcode.id)}}><Icon material="delete" color="red" title="elimina qrcode"/></Button> 
          
              <div><br>
                <div class="content">
                  <b>Tipologia: </b>{ my_qrcode.type} <br>
                  <b>Stato: </b>{my_qrcode.stato } <br>
                  {my_qrcode.data} {my_qrcode.ora}</div>
                <br><br>

                <b>{my_qrcode.file.type}: </b><br>
                {#if my_qrcode.file.type=="testo"}
                  {my_qrcode.file.content}
                {:else if my_qrcode.file.type=="link"}
                <a href={my_qrcode.file.content}>Apri link {my_qrcode.file.content}</a>
                {:else if my_qrcode.file.type=="video"}
                  <div class="video">
                    <video controls>
                      <source type="video/mp4" src="{`data:video/mp4;base64,${my_qrcode.file.content}`}">
                      <track kind="captions"/>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                {:else if my_qrcode.file.type=="immagine"}
                  <div class="video">
                    <img src="{`data:image/png;base64,${my_qrcode.file.content}`}">
                  </div>
                {:else if my_qrcode.file.type=="audio"}
                  <audio controls>
                    <source type="audio/mp3" src="{`data:audio/mp3;base64,${base64Audio}`}">
                    Your browser does not support the audio tag.
                  </audio>
                {/if}
              </div>
            {/if}
            
          </Block>
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
      Button,
      f7
    } from 'framework7-svelte';

    import UpdateQr from '../components/update_qr.svelte';
  
    import { get_me } from '../js/api/login';
    import Scanner from "../components/scanner.svelte";
    import { logged, user_data, qrcode_scanner_data, qrcodes } from '../js/store';
    import { delete_qrcode } from '../js/api/qrcode';

    let my_qrcode = {}
    qrcode_scanner_data.subscribe(value=>{
      // console.log(value)
      my_qrcode=value
    })

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
            let t = f7.toast.create({
              text: "QrCode non valido",
              icon:'<i class="material-icons">error</i>',
              position: 'center',
              closeTimeout: 2000,
            }); t.open();
          }
      });
    }

    function scarica_contenuto(qrcode){
      if(qrcode.file.type=="testo" || qrcode.file.type=="link"){
        const byteCharacters = qrcode.file.content; // Il contenuto del file di testo
        const byteArray = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: 'text/plain' }); // Specifica il tipo di contenuto come testo
        saveAs(blob, qrcode.file.title + "." + qrcode.file.extension);
      }else{
        const byteCharacters = atob(qrcode.file.content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        // Non specificare esplicitamente il tipo di contenuto
        const blob = new Blob([byteArray]);
        saveAs(blob, qrcode.file.title + "." + qrcode.file.extension);
      }
    }

    function delete_qr(id){
      if($logged){
        f7.dialog.confirm("Vuoi eliminare il qrcode?", ()=>{
          delete_qrcode(id).then(data=>{ 
            $qrcodes=$qrcodes.filter(item=>item.id!=id)
            $qrcode_scanner_data={}
            let t = f7.toast.create({
              text: "QrCode deleted",
              icon:'<i class="material-icons">check</i>',
              position: 'center',
              closeTimeout: 2000,
            }); t.open();
          })
        })
      }else{
        f7.dialog.alert("Non sei loggato")
      }
    }

    let data = {}

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