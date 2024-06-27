<script>
    import { Button, app } from 'framework7-svelte';
    import {logged, user_data, qrcodes} from "../js/store"
import {
      Page,
      Navbar,
      NavTitle,
      Block,
      List,
      ListInput, 
      TextEditor,
      NavRight,
      Link,
      Icon,
      Preloader,
      f7
    } from 'framework7-svelte';
    import QrcodeView from '../components/qrcode_view.svelte';

    import { is_logged } from "../js/api/login"
    import { genera_qrcode, get_mine_qrcodes } from "../js/api/qrcode"
    import { saveAs } from "file-saver"
    import Dropzone from "svelte-file-dropzone";
    import { isMobile } from '../js/common';

    let files = {
        accepted: [],
        rejected: []
    };

    function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];
    }

    let tipologie = [
        "testo",
        "link",
        "video",
        "immagine",
        "audio",
    ]

    let filedata = {
        title:"Titolo del QrCode",
        content:"",
        extension:"",
        type:tipologie[0],
        stato:"privato"
    }

    let picker_tipo, picker_stato
    function onPageInit() {
        filedata = {
            title:default_title,
            content:"",
            extension:"",
            type:tipologie[0],
            stato:"privato"
        }
        picker_tipo = f7.picker.create({
            inputEl: "#picker-tipo",
            value: [filedata.type],
            cols: [
                {
                    textAlign: 'center',
                    values: tipologie,
                }
            ],
            on: {
                change(picker, values) {
                    filedata.type = values[0]
                }
            }
        });
        picker_stato = f7.picker.create({
            inputEl: "#picker-stato",
            value: [filedata.stato],
            cols: [
                {
                    textAlign: 'center',
                    values: ["privato", "pubblico"],
                }
            ],
            on: {
                change(picker, values) {
                    filedata.stato = values[0]
                }
            }
        });
    }

    let default_title = ""
    let editor
    
    function onPageBeforeRemove(){
        picker_tipo.destroy()
        picker_stato.destroy()
    }

    let response = {qrcode:""}
    let waiting = 0
    function genera_qr(){
        if(filedata.content){
            if(filedata.title==default_title){ filedata.title="QrCode anonimo" }
            f7.dialog.confirm("Confermi di voler generare il qrcode ?", () => {
                let t = f7.toast.create({
                    text: "QrCode creato, caricamento...",
                    icon:'<i class="material-icons">check</i>',
                    position: 'center',
                    closeTimeout: 2000,
                }); t.open();
                waiting=1
                f7.popup.open(".qrcode_view")
                genera_qrcode(filedata).then(res=>{
                    response=res
                    $qrcodes = response.qrcodes
                    waiting=0
                    if(response.code!=100){
                        f7.dialog.alert(response.detail)
                    }else{
                        filedata = {
                            title:default_title,
                            content:"",
                            extension:"",
                            type:tipologie[0],
                            stato:"privato"
                        }
                    }
                })
                
            }, ()=>{}, "Genera QrCode");
        }else{
            f7.dialog.alert("Compila tutti i campi", "Error")
        }
    }

    function scarica_qr(){
        f7.dialog.confirm("Confermi di voler scaricare il qrcode ?", () => {
            var qrcode = response.qrcode
            if(qrcode){
                const byteCharacters = atob(qrcode);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                var contentType = "image/png"
                const blob = new Blob([byteArray], {type: contentType});
                saveAs(blob, filedata.title+".png");
            }else{
                f7.dialog.alert("QrCode non valido")
            }
        });
    }

    function read_file(e){
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];
        const file = files.accepted[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result);
            });
            reader.readAsDataURL(file);    
            reader.onload = function () {
                var result = reader.result.split("base64")[1].split(",")[1]
                filedata.content = result
                filedata.extension = file.name.split(".").at(-1)
            };
            return;
        } 
    }

    is_logged(localStorage.getItem("token")).then(res=>{ $logged = res==100 })
    get_mine_qrcodes().then(data=>{ 
        $qrcodes=data.list
        if($qrcodes){
          $qrcodes = $qrcodes.reverse()
        }
      })

    
    let input;
    let image;
    
    let data = $user_data
  </script>

<Page name="genera" {onPageInit} {onPageBeforeRemove}>
    <!-- Top Navbar -->
    <Navbar>
      <NavTitle sliding>Genera QrCode</NavTitle>
      <NavRight>
        {#if $logged}
        <Link tabLink="#view-utente" iconMd="material:account_circle" text={$user_data.name} />
        {/if}
      </NavRight>
    </Navbar>

    {#if !$logged}
        <Block inset strong>
            <div class="center">
                <Link tabLink="#view-utente" iconMd="material:account_circle" >Accedi alla tua area utente prima di creare il QrCode</Link>
            </div>
        </Block>
        <!-- <Login bind:logged/> -->
    {/if}

    <div class="flex">

        <Block strong inset>
            <List strongIos outlineIos dividersIos>
                <ListInput
                    outline
                    floatingLabel
                    label="Titolo QrCode *"
                    type="text"
                    placeholder="Titolo QrCode *"
                    on:load:value={filedata.title}
                    bind:value={filedata.title}
                    clearButton
                />

                <ListInput
                    outline
                    floatingLabel
                    type="text"
                    placeholder="Tipologia Qrcode *"
                    name="tipologia"
                    label="Tipologia Qrcode *"
                    inputId="picker-tipo"
                />

                <ListInput
                    outline
                    floatingLabel
                    type="text"
                    placeholder="Stato del QrCode *"
                    name="stato"
                    label="Stato del QrCode *"
                    inputId="picker-stato"
                />

                <br>

                {#if filedata.type=="testo" || filedata.type=="link"}
                    <TextEditor
                        placeholder="Inserisci il testo... *"
                        buttons={[
                        ['bold', 'italic', 'underline']
                        ]}
                        value={filedata.content}
                        onTextEditorChange={(value)=>filedata.content=value}
                    />
                {:else if filedata.type=="audio" || filedata.type=="immagine" || filedata.type=="video"}
                    <Dropzone on:drop={read_file} multiple={false}>
                        Trascina qui il file o clicca qui per selezionarlo
                    </Dropzone>
                    {#if files.accepted.length}
                        <div class="center">{files.accepted[0].name}</div>
                    {/if}
                    
                    <img bind:this={image} src="" alt="Preview" style="display: none;" />
                {/if}

            </List>

            {#if $logged}
                <Button on:click={genera_qr} class={"my_button"} fill>Crea QrCode</Button>
            {:else}
                <div class="center">Accedi per poter generare il QrCode</div>
            {/if}
        </Block>

        <QrcodeView qrcode={response.qrcode} title={filedata.title} {scarica_qr}/>

    </div>
</Page>


<style>

  .my_button{
    margin: 10px !important;
  }

  @media (min-width:780px){
    .flex{
        max-width: 700px;
        margin: auto;
    }
  }

</style>