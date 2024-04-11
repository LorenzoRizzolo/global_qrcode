import qrImage from 'qr-image';
import fs from 'fs';
import { c as connection, d as data, o as ora } from './login-XYCRM736.js';

async function generate_qrcode(user, filedata) {
  try {
    let qrcode_path;
    let filepath = "files/";
    const result = await connection.execute("INSERT INTO qrcodes(`id_user`, `title`, `data`, `ora`, `stato`) VALUES (?, ?, ?, ?, ?)", [user.id, filedata.title, data(), ora(), filedata.stato]);
    const insertedId = result[0].insertId;
    qrcode_path = `qrcodes/qrcode_${insertedId}.png`;
    filepath += `file_${insertedId}`;
    const qrcode_text = "https://qrcode.rizzolo.cloud/api/get_qrcode/" + insertedId;
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
async function mine_qrcodes(id_user) {
  const result = await connection.execute("SELECT * FROM qrcodes WHERE id_user=?", [id_user]);
  var qrcodes = result[0];
  for (let i = 0; i < qrcodes.length; i++) {
    var file = "qrcodes/qrcode_" + qrcodes[i].id + ".png";
    if (fs.existsSync(file)) {
      qrcodes[i]["qrcode"] = fs.readFileSync(file).toString("base64");
    } else {
      qrcodes[i]["qrcode"] = "";
    }
  }
  return qrcodes;
}

export { generate_qrcode as g, mine_qrcodes as m };
//# sourceMappingURL=qrcode-BnRsPtTt.js.map
