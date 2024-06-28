<Block>
  <Popup push class="scanner" {onPopupOpen} {onPopupClose}>
      <View>
        <Page>
          <Navbar title="Scannerizza QrCode" large transparent>
            <NavRight>
              <Link popupClose on:click={onPopupClose}><Icon material="close" color="red" /></Link>
            </NavRight>
          </Navbar>
          <Block>
            {#if !loading}
              <div id="reader" class="reader_el" width="600px"></div>
            {:else}
              <div class="center">Caricamento in corso...</div>
            {/if}
          </Block>
        </Page>
      </View>
  </Popup>
</Block>


<script>
import {
    Icon, 
    Popup, 
    View, 
    Page, 
    Navbar, 
    NavRight, 
    Link, 
    Block,
    Input,
    app,
    f7
} from "framework7-svelte";
import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";
import { get_qr_by_id } from "../js/api/qrcode";
import { qrcode_scanner_data } from "../js/store"

let loading = false

let html5QrcodeScanner;
let cameras = [];
let selectedCameraId = null;

function onPopupClose(){
  stopScanner();
}

function stopScanner() {
  if (html5QrcodeScanner) {
    html5QrcodeScanner.clear();
    html5QrcodeScanner = null;
  }
}

function validate_domain(domain){
  let domains = domain.split("/")
  return (domains[0]=="https:" && (domains[2]=="qrcode.rizzolo.cloud"))
}

function onScanSuccess(decodedText, decodedResult) {
  if(validate_domain(decodedText)){
    stopScanner()
    loading=true
    var arr = decodedText.split("/")
    var id = arr[arr.length-1]
    get_qr_by_id(id).then(res=>{
      $qrcode_scanner_data = res.qrcode
      // console.log($qrcode_scanner_data)
      loading=false
    })
    app.f7.popup.close()
  }else{
    console.log("invalid text", decodedText)
  }
}

function onScanFailure(error) {
  // console.warn(`Code scan error = ${error}`);
}

function onPopupOpen(){
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      cameras = devices.map(device => ({ id: device.id, label: device.label }));
      if (cameras.length > 0) {
        selectedCameraId = cameras[0].id;
      }
    }
  }).catch(err => {
    // handle err
  }).finally(() => {
    html5QrcodeScanner = new Html5QrcodeScanner("reader",{ fps: 120, qrbox: {width: 250, height: 250} }, false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure, selectedCameraId);
  });
}
</script>
