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

    export let qr

    let loading = false
    function update_qrcode(){
        loading = true
        update_qr(qr.id, qr.stato).then(data=>{
            qr=data.qrcode
            loading=false
            f7.popup.close()
        })
    }

    let picker_stato
    function onPopupOpen() {
        picker_stato = f7.picker.create({
            inputEl: "#picker-stato-"+qr.id,
            value: [qr.stato],
            cols: [
                {
                    textAlign: 'center',
                    values: ["privato", "pubblico"],
                }
            ],
            on: {
                change(picker, values) {
                    qr.stato = values[0]
                }
            }
        });
    }
    
    function onPopupClose(){
        picker_stato.destroy()
    }
</script>

<Link popupOpen={".update-qr-"+qr.id}><Icon material="edit" title="modifica qrcode"/></Link> 

<Popup {onPopupOpen} {onPopupClose} push class={"update-qr-"+qr.id}>
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
                    type="text"
                    placeholder="Stato del QrCode *"
                    name="stato"
                    label="Stato del QrCode *"
                    inputId={"picker-stato-"+qr.id}
                />
            {:else}
                <Block inset strong>Caricamento...</Block>
            {/if}
        </List>
      </Block>
    </Page>
</Popup>