import { j as json } from './index-BIAFQWR9.js';
import { i as is_logged, g as get_user_by_token } from './login-bhoIVw_g.js';
import { a as get_qr_by_id, u as update_qrcode } from './qrcode-Dz6K9Wwx.js';
import 'fs';
import 'dotenv';
import 'mysql2/promise';
import 'qr-image';

async function POST({ request }) {
  try {
    var data = await request.json();
    var qrcode = await get_qr_by_id(data.id);
    if (await is_logged(data.token)) {
      var user = await get_user_by_token(data.token);
      if (qrcode.id_user == user.id) {
        update_qrcode(data.id, data.stato, data.title);
        qrcode = await get_qr_by_id(data.id);
        console.log("Qrcode", data.id, " modificato ", data.title, data.id);
        return json({ code: 100, request: "ok", qrcode });
      }
      return json({ code: 101, request: "ko", detail: "Non hai i permessi per eliminare il QrCode" });
    } else {
      return json({ code: 1, request: "ko", detail: "user isn't logged" });
    }
  } catch (err) {
    console.log(err);
    return json({ code: 1, request: "ko", detail: "Internal Error" });
  }
}

export { POST };
//# sourceMappingURL=_server-CnTIaymC.js.map
