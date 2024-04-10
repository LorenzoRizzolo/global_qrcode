import qrImage from 'qr-image';
import fs from 'fs';
import db from "./db"; // Assuming db is the default export from "db" module

export async function generate_qrcode(user, filedata) {
    try {
        // inserisco i dati del qrcode nel database
        let qrcode_path
        let filepath = "files/"

        const result = await db.execute('INSERT INTO qrcodes(`id_user`, `title`) VALUES (?, ?)', [user.id, filedata.title]);
        const insertedId = result[0].insertId;
        qrcode_path = `qrcodes/qrcode_${insertedId}.png`
        filepath += `file_${insertedId}`
        
        const qrcode_text = "https://qrcodes.rizzolo.cloud/api/get_qrcode/"+insertedId
        // crea il qrcode
        const qr_png = qrImage.imageSync(qrcode_text, { type: 'png' });
        fs.writeFileSync(qrcode_path, qr_png);
        // write file
        fs.writeFileSync(filepath, JSON.stringify(filedata));
        // Leggi il file dell'immagine del qrcode
        const qrcode_image = fs.readFileSync(qrcode_path);
        // Converti l'immagine in base64
        const base64_qrcode = qrcode_image.toString('base64');
        return base64_qrcode;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to handle it outside this function if needed
    }
}