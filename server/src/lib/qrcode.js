import qrImage from 'qr-image';
import fs from 'fs';
import { data, ora } from './functions';
import { createConnection } from "./db";

export async function generate_qrcode(user, filedata) {
    let db
    try {
        db = await createConnection();
        // inserisco i dati del qrcode nel database
        let qrcode_path
        let filepath = "files/"
        const result = await db.execute('INSERT INTO qrcodes(`id_user`, `title`, `data`, `ora`, `stato`) VALUES (?, ?, ?, ?, ?)', [user.id, filedata.title, data(), ora(), filedata.stato]);
        const insertedId = result[0].insertId;
        qrcode_path = `qrcodes/qrcode_${insertedId}.png`
        filepath += `file_${insertedId}`
        
        const qrcode_text = "https://qrcode.rizzolo.cloud/scannerizza/"+insertedId
        // crea il qrcode
        const qr_png = qrImage.imageSync(qrcode_text, { type: 'png' });
        fs.writeFileSync(qrcode_path, qr_png);
        // write file
        fs.writeFileSync(filepath, JSON.stringify(filedata));
        // Leggi il file dell'immagine del qrcode
        const qrcode_image = fs.readFileSync(qrcode_path);
        // Converti l'immagine in base64
        const base64_qrcode = qrcode_image.toString('base64');
        await db.end()
        return base64_qrcode;
    } catch (error) {
        await db.end()
        console.error('Error:', error);
        throw error; // Re-throw the error to handle it outside this function if needed
    }
}

export async function mine_qrcodes(id_user){
    let db = await createConnection();
    const result = await db.execute('SELECT * FROM qrcodes WHERE id_user=?', [id_user])
    var qrcodes = result[0]
    for(let i=0 ; i<qrcodes.length ; i++){
        var file = "qrcodes/qrcode_"+qrcodes[i].id+".png"
        if(fs.existsSync(file)){
            // qrcodes[i]['qrcode'] = fs.readFileSync(file).toString("base64")
            // qrcodes[i]['file'] = JSON.parse(fs.readFileSync("files/file_"+qrcodes[i].id))
            qrcodes[i]['type'] = JSON.parse(fs.readFileSync("files/file_"+qrcodes[i].id)).type
        }else{
            qrcodes[i]['qrcode'] = ""
        }
    }
    await db.end()
    return qrcodes
}

export async function get_qr_by_id(id_qr){
    let db = await createConnection();
    const result = await db.execute('SELECT * FROM qrcodes WHERE id=?', [id_qr])
    var qrcode = result[0][0]
    var file = "qrcodes/qrcode_"+id_qr+".png"
    qrcode['qrcode'] = fs.readFileSync(file).toString("base64")
    qrcode['file'] = JSON.parse(fs.readFileSync("files/file_"+id_qr))
    await db.end()
    return qrcode
}

export async function delete_qrcode(id_qr){
    let db = await createConnection();
    await db.execute('DELETE FROM qrcodes WHERE id=?', [id_qr])
    await db.end()
    return true
}

export async function update_qrcode(id_qr, stato, title){   
    let db = await createConnection();
    await db.execute('UPDATE qrcodes SET stato=?, title=? WHERE id=?', [stato, title, id_qr])
    await db.end()
    return true
}