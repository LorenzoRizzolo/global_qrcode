import qrImage from 'qr-image';
import fs from 'fs';
import { c as createConnection, d as data, o as ora } from './login-bhoIVw_g.js';

async function generate_qrcode(user, filedata) {
  try {
    let db2 = await createConnection();
    let qrcode_path;
    let filepath = "files/";
    const result = await db2.execute("INSERT INTO qrcodes(`id_user`, `title`, `data`, `ora`, `stato`) VALUES (?, ?, ?, ?, ?)", [user.id, filedata.title, data(), ora(), filedata.stato]);
    const insertedId = result[0].insertId;
    qrcode_path = `qrcodes/qrcode_${insertedId}.png`;
    filepath += `file_${insertedId}`;
    const qrcode_text = "https://qrcode.rizzolo.cloud/scannerizza/" + insertedId;
    const qr_png = qrImage.imageSync(qrcode_text, { type: "png" });
    fs.writeFileSync(qrcode_path, qr_png);
    fs.writeFileSync(filepath, JSON.stringify(filedata));
    const qrcode_image = fs.readFileSync(qrcode_path);
    const base64_qrcode = qrcode_image.toString("base64");
    await db2.end();
    return base64_qrcode;
  } catch (error) {
    await db.end();
    console.error("Error:", error);
    throw error;
  }
}
async function mine_qrcodes(id_user) {
  let db2 = await createConnection();
  const result = await db2.execute("SELECT * FROM qrcodes WHERE id_user=?", [id_user]);
  var qrcodes = result[0];
  for (let i = 0; i < qrcodes.length; i++) {
    var file = "qrcodes/qrcode_" + qrcodes[i].id + ".png";
    if (fs.existsSync(file)) {
      qrcodes[i]["type"] = JSON.parse(fs.readFileSync("files/file_" + qrcodes[i].id)).type;
    } else {
      qrcodes[i]["qrcode"] = "";
    }
  }
  await db2.end();
  return qrcodes;
}
async function get_qr_by_id(id_qr) {
  let db2 = await createConnection();
  const result = await db2.execute("SELECT * FROM qrcodes WHERE id=?", [id_qr]);
  var qrcode = result[0][0];
  var file = "qrcodes/qrcode_" + id_qr + ".png";
  qrcode["qrcode"] = fs.readFileSync(file).toString("base64");
  qrcode["file"] = JSON.parse(fs.readFileSync("files/file_" + id_qr));
  await db2.end();
  return qrcode;
}
async function delete_qrcode(id_qr) {
  let db2 = await createConnection();
  await db2.execute("DELETE FROM qrcodes WHERE id=?", [id_qr]);
  await db2.end();
  return true;
}
async function update_qrcode(id_qr, stato, title) {
  let db2 = await createConnection();
  await db2.execute("UPDATE qrcodes SET stato=?, title=? WHERE id=?", [stato, title, id_qr]);
  await db2.end();
  return true;
}

export { get_qr_by_id as a, delete_qrcode as d, generate_qrcode as g, mine_qrcodes as m, update_qrcode as u };
//# sourceMappingURL=qrcode-Dz6K9Wwx.js.map
