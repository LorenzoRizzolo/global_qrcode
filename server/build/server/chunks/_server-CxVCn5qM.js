import qrImage from 'qr-image';
import fs from 'fs';
import { i as is_logged, g as get_user_by_token, c as connection } from './login-Go6X9AwE.js';
import { j as json } from './index-BIAFQWR9.js';
import 'dotenv';
import 'mysql2/promise';

async function generate_qrcode(user, filedata) {
  try {
    let qrcode_path;
    let filepath = "files/";
    const result = await connection.execute("INSERT INTO qrcodes(`id_user`, `title`) VALUES (?, ?)", [user.id, filedata.title]);
    const insertedId = result[0].insertId;
    qrcode_path = `qrcodes/qrcode_${insertedId}.png`;
    filepath += `file_${insertedId}`;
    const qrcode_text = "https://qrcodes.rizzolo.cloud/api/get_qrcode/" + insertedId;
    const qr_png = qrImage.imageSync(qrcode_text, { type: "png" });
    fs.writeFileSync(qrcode_path, qr_png);
    fs.writeFileSync(filepath, JSON.stringify(filedata));
    const qrcode_image = fs.readFileSync(qrcode_path);
    const base64_qrcode = qrcode_image.toString("base64");
    return base64_qrcode;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
async function POST({ request }) {
  try {
    var data = await request.json();
    if (await is_logged(data.token)) {
      var type = data.type;
      var user = await get_user_by_token(data.token);
      let qrcode = "";
      switch (type) {
        case "text":
        case "url":
        case "number":
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
//# sourceMappingURL=_server-CxVCn5qM.js.map
