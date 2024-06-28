<script>
    import { 
    Popup, 
    Page, 
    Navbar,
    NavRight,
    Link,
    Block,
    Icon,
    List,
    ListInput,
    Button,
    f7
    } from "framework7-svelte";
    import { update_qr } from "../js/api/qrcode"
    import { qrcode_scanner_data, qrcodes } from "../js/store";

    // export let qr
    export let id

    let qrcode = id!=undefined?$qrcodes.find(item=>item.id==id):{}
    // console.log(qrcode)
    let start_qr = JSON.parse(JSON.stringify(qrcode));

    let loading = false
    function update_qrcode(){
        loading = true
        update_qr(qrcode.id, qrcode.stato, qrcode.title).then(data=>{
            $qrcode_scanner_data.title = qrcode.title
            $qrcode_scanner_data.stato = qrcode.stato
            $qrcodes.map(item=>{
                if(item.id==id){
                    item.title = qrcode.title
                    item.stato = qrcode.stato
                }else{ return item }
            })
            $qrcodes=$qrcodes
            loading=false
            f7.popup.close()
        })
    }

    let picker_stato
    function onPopupOpen() {
        picker_stato = f7.picker.create({
            inputEl: "#picker-stato-"+qrcode.id,
            value: [qrcode.stato],
            cols: [
                {
                    textAlign: 'center',
                    values: ["privato", "pubblico"],
                }
            ],
            on: {
                change(picker, values) {
                    qrcode.stato = values[0]
                }
            }
        });
    }
    
    function onPopupClose(){
        // console.log(qrcode.title)
        if(!qrcode.title){
            qrcode.title = start_qr.title
        }
        picker_stato.destroy()
    }
</script>
{#if qrcode}
    
    <Button class="mine_but" tonal popupOpen={".update-qr-"+qrcode.id}><Icon material="edit" title="modifica qrcode"/></Button> 

    <Popup {onPopupOpen} {onPopupClose} push class={"update-qr-"+qrcode.id}>
        <Page>
        <Navbar title={"Aggiorna QrCode"} large transparent>
            <NavRight>
            <Link on:click={()=>{update_qrcode()}}><Icon material="save" color="green" /></Link>
            <Link popupClose><Icon material="close" color="red" /></Link>
            </NavRight>
        </Navbar>
        <Block>
            <br><br>
            <List>
                {#if !loading}
                    <ListInput
                        outline
                        floatingLabel
                        label="Titolo QrCode *"
                        type="text"
                        placeholder="Titolo QrCode *"
                        on:load:value={qrcode.title}
                        bind:value={qrcode.title}
                        clearButton
                    />
                    <ListInput
                        outline
                        floatingLabel
                        type="text"
                        placeholder="Stato del QrCode *"
                        name="stato"
                        label="Stato del QrCode *"
                        inputId={"picker-stato-"+qrcode.id}
                    />
                {:else}
                    <Block inset strong>Caricamento...</Block>
                {/if}
            </List>
        </Block>
        </Page>
    </Popup>
{/if}