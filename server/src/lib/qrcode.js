import qrImage from 'qr-image';
import fs from 'fs';
import db from "./db"; // Assuming db is the default export from "db" module

export async function generate_qrcode(data, name) {
    try {
        const result = await db.execute('INSERT INTO qrcodes(`id_user`, `path`, `type`, `name`) VALUES (?, ?, "text", ?)', [-1, filepath, name]);
        const insertedId = result.insertId;
        const filepath = "qrcodes/qrcode_"+insertedId
        const qr_png = qrImage.imageSync(data, { type: 'png' });
        fs.writeFileSync(filepath, qr_png);
        return insertedId;
    } catch (error) {
        console.error('Error querying database:', error);
        throw error; // Re-throw the error to handle it outside this function if needed
    }
}

