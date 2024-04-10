import qrImage from 'qr-image';
import fs from 'fs';
import { i as is_logged, g as get_user_by_token, c as connection, d as data, o as ora } from './login-XYCRM736.js';
import { j as json } from './index-BIAFQWR9.js';
import 'dotenv';
import 'mysql2/promise';

async function generate_qrcode(user, filedata) {
  try {
    let qrcode_path;
    let filepath = "files/";
    const result = await connection.execute("INSERT INTO qrcodes(`id_user`, `title`, `data`, `ora`, `stato`) VALUES (?, ?)", [user.id, filedata.title, data(), ora(), filedata.stato]);
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
    var data2 = await request.json();
    if (await is_logged(data2.token)) {
      var type = data2.type;
      var user = await get_user_by_token(data2.token);
      let qrcode = "";
      switch (type) {
        case "text":
        case "url":
        case "number":
          qrcode = await generate_qrcode(user, data2.filedata);
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
//# sourceMappingURL=_server-vKsVc8VJ.js.map
