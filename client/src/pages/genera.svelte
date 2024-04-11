<script>
    import { Button, app } from 'framework7-svelte';
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
      f7
    } from 'framework7-svelte';

    import { is_logged } from "../js/api/login"
    import Login from '../components/login.svelte';
    import { genera_qrcode } from "../js/api/qrcode"
    import { saveAs } from "file-saver"

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

    let default_title = "Titolo del QrCode"
    
    function onPageBeforeRemove(){
        picker_tipo.destroy()
        picker_stato.destroy()
    }

    let response = {}
    let waiting = 0
    function genera_qr(){
        if(filedata.content){
            if(filedata.title==default_title){ filedata.title="QrCode anonimo" }
            f7.dialog.confirm("Confermi di voler generare il qrcode ?", () => {
                waiting=1
                genera_qrcode(filedata).then(res=>{
                    response=res
                    waiting=0
                })
            });
        }else{
            f7.dialog.alert("Compila tutti i campi")
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

    var logged 
    is_logged(localStorage.getItem("token")).then(res=>{ logged = res==100 })
  </script>

<Page name="genera" {onPageInit} {onPageBeforeRemove}>
    <!-- Top Navbar -->
    <Navbar>
      <NavTitle sliding>Genera QrCode</NavTitle>
      <NavRight>
        {#if logged}
        <Link tabLink="#view-utente" iconMd="material:account_circle" text={JSON.parse(localStorage.getItem("user")).name} />
        {/if}
      </NavRight>
    </Navbar>

    {#if !logged}
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

                {#if filedata.type=="testo"}
                    <TextEditor
                        placeholder="Inserisci il testo... *"
                        buttons={[
                        ['bold', 'italic', 'underline']
                        ]}
                        onTextEditorChange={(value)=>filedata.content=value}
                    />
                    <!-- <textarea bind:value={filedata.type} placeholder="Testo da immettere nel QrCode"></textarea> -->
                {:else if filedata.type=="audio" || filedata.type=="immagine" || filedata.type=="video"}
                    <div class="custom_file_upload">
                        <div class="file_upload">
                            <input type="file" name="file">
                        </div>
                    </div>
                    <ul id="fileList"></ul>
                {/if}

            </List>

            {#if logged}
                <Button on:click={genera_qr} class={"my_button"} fill>Crea QrCode</Button>
            {:else}
                <div class="center">Accedi per poter generare il QrCode</div>
            {/if}
        </Block>

        <Block strong inset>
            <div class="center column">
                <h2>QrCode</h2>
                {#if !waiting}
                    {#if response.qrcode}
                        <br><br>
                        <img class="qrcode" src={"data:image/png;base64,"+response.qrcode} alt="qrcode">
                        <br>
                        <Icon material="task_alt" color="green"/>  QrCode generato con successo  <br><br>
                        <Button on:click={scarica_qr}><Icon material="cloud_download" title="scarica qrcode"/> Scarica QrCode</Button>
                    {/if}
                {:else}
                    <div>Sto elaborando il QrCode</div>
                {/if}
            </div>
        </Block>
    </div>
</Page>


<style>

  .my_button{
    margin: 10px !important;
  }

  @media (min-width:780px){
    .flex{
        display: grid;
        grid-template-columns: 70% 30%;
    }
  }

    div.custom_file_upload {
        height: 20px;
    }

    input.file {
        width: 150px;
        height: 20px;
        border: 1px solid #BBB;
        border-right: 0;
        color: #888;
        padding: 5px;
        border-radius: 5px;
        outline: none;
    }

    div.file_upload {
        height: 34px;
        background: #1e72c5;
        background: -moz-linear-gradient(top, #1e72c5 0%, #1e72c5 44%, #4096ee 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#7abcff), color-stop(44%,#60abf8), color-stop(100%,#4096ee));
        background: -webkit-linear-gradient(top, #7abcff 0%,#60abf8 44%,#4096ee 100%);
        background: -o-linear-gradient(top, #7abcff 0%,#60abf8 44%,#4096ee 100%);
        background: -ms-linear-gradient(top, #7abcff 0%,#60abf8 44%,#4096ee 100%);
        background: linear-gradient(top, #7abcff 0%,#60abf8 44%,#4096ee 100%);
        /* filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7abcff', endColorstr='#4096ee',GradientType=0 ); */
        cursor: pointer;
        border-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        font-weight: bold;
        color: #FFF;
        text-align: center;
        padding-top: 8px;
        margin-top: 20px;
        margin-bottom: 40px;
        margin: auto;
        max-width: 250px;
        
    }
    div.file_upload:before {
        content: 'SELEZIONA FILE DA CARICARE';
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
    }
    div.foto_upload:before {
        content: 'SCATTA FOTO' !important;
    }
    div.logo_upload:before {
        content: 'SELEZIONA LOGO';
    }
    div.file_upload input {
        position: relative;
        height: 30px;
        width: 200px;
        margin-top: -30px;
        display: inline;
        opacity: 0;
    }
    div.file_upload:hover{
        cursor: pointer;
    }
    input[type=file]:hover{
        cursor: pointer;
    }
</style>