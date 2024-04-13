import { g as generate_qrcode } from './qrcode-DTFsv7te.js';
import { j as json } from './index-BIAFQWR9.js';
import { i as is_logged, g as get_user_by_token } from './login-BVn5wNJZ.js';
import 'qr-image';
import 'fs';
import 'dotenv';
import 'mysql2/promise';

async function POST({ request }) {
  try {
    var data = await request.json();
    if (await is_logged(data.token)) {
      var type = data.filedata.type;
      var user = await get_user_by_token(data.token);
      let qrcode = "";
      switch (type) {
        case "testo":
        case "link":
          qrcode = await generate_qrcode(user, data.filedata);
          break;
        case "video":
        case "immagine":
        case "audio":
          qrcode = await generate_qrcode(user, data.filedata);
          break;
        default:
          return json({ code: 100, request: "ko", detail: "Type of qrcode isn't valid" });
      }
      return json({ code: 100, request: "ok", qrcode });
    } else {
      return json({ code: 1, request: "ko", detail: "user isn't logged" });
    }
  } catch (err) {
    console.log(err);
    return json({ code: 1, request: "ko", detail: "Interal Error" });
  }
}

export { POST };
//# sourceMappingURL=_server-DwBNsnj-.js.map
