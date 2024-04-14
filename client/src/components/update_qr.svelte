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
    import { qrcodes } from "../js/store";

    // export let qr
    export let k
    let start_qr = JSON.parse(JSON.stringify($qrcodes[k]));

    let loading = false
    function update_qrcode(){
        loading = true
        update_qr($qrcodes[k].id, $qrcodes[k].stato, $qrcodes[k].title).then(data=>{
            loading=false
            f7.popup.close()
        })
    }

    let picker_stato
    function onPopupOpen() {
        picker_stato = f7.picker.create({
            inputEl: "#picker-stato-"+$qrcodes[k].id,
            value: [$qrcodes[k].stato],
            cols: [
                {
                    textAlign: 'center',
                    values: ["privato", "pubblico"],
                }
            ],
            on: {
                change(picker, values) {
                    $qrcodes[k].stato = values[0]
                }
            }
        });
    }
    
    function onPopupClose(){
        console.log($qrcodes[k].title)
        if(!$qrcodes[k].title){
            $qrcodes[k].title = start_qr.title
        }
        picker_stato.destroy()
    }
</script>
{#if $qrcodes[k]}
    
    <Link popupOpen={".update-qr-"+$qrcodes[k].id}><Icon material="edit" title="modifica qrcode"/></Link> 

    <Popup {onPopupOpen} {onPopupClose} push class={"update-qr-"+$qrcodes[k].id}>
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
                        on:load:value={$qrcodes[k].title}
                        bind:value={$qrcodes[k].title}
                        clearButton
                    />
                    <ListInput
                        outline
                        floatingLabel
                        type="text"
                        placeholder="Stato del QrCode *"
                        name="stato"
                        label="Stato del QrCode *"
                        inputId={"picker-stato-"+$qrcodes[k].id}
                    />
                {:else}
                    <Block inset strong>Caricamento...</Block>
                {/if}
            </List>
        </Block>
        </Page>
    </Popup>
{/if}