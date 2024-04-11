import { constants } from "buffer";
import db from "./db";
import { generaToken } from "./functions";
import { json } from "@sveltejs/kit";
import fs from 'fs'

export async function login(username, password){
    const result = await db.execute('SELECT * FROM users WHERE username=? and password=?', [username, password])
    var find = result[0].length
    if(find){
        const user = result[0][0]
        var token = generaToken()
        var expiration = Date.now()+1000000000
        fs.writeFileSync("sessions/"+token, JSON.stringify({id:user.id, expiration }));
        delete user.password
        return json({code:100, request:"ok", token, user})
    }
    return json({code:101, request:"ok", detail:"user not found"})
}

export async function get_user_by_token(token){
    var id = JSON.parse(fs.readFileSync("sessions/"+token)).id
    const result = await db.execute('SELECT * FROM users WHERE id=?', [id])
    return result[0][0]
}

export async function is_logged(token){
    if (token != null) {
        var exists = fs.existsSync("sessions/" + token);
        return exists;
    } else {
        return false; // Or handle it according to your logic
    }
}