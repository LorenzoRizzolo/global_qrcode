import { generaToken } from "./functions";
import { json } from "@sveltejs/kit";
import fs, { existsSync } from 'fs'
import { createConnection } from "./db";

export async function login(username, password){
    let db = await createConnection();
    const result = await db.execute('SELECT * FROM users WHERE username=? and password=?', [username, password])
    console.log(result)
    var find = result[0].length
    if(find){
        const user = result[0][0]
        var token = generaToken()
        var expiration = Date.now()+1000000000
        fs.writeFileSync("sessions/"+token, JSON.stringify({id:user.id, expiration }));
        delete user.password
        await db.end()
        return json({code:100, request:"ok", token, user})
    }
    return json({code:101, request:"ok", detail:"user not found"})
}

export async function register(username, password, name, email){
    if(username && password && name && email){
        let db = await createConnection();
        var result = await db.execute('SELECT * FROM users WHERE username=?', [username])
        var find = result[0].length
        if(!find){
            await db.execute("INSERT INTO users(`username`, `password`, `name`, `email`) VALUES(?,?,?,?)", [username, password, name, email])
            var result = await db.execute('SELECT * FROM users WHERE username=?', [username])
            const user = result[0][0]
            var token = generaToken()
            var expiration = Date.now()+1000000000
            fs.writeFileSync("sessions/"+token, JSON.stringify({id:user.id, expiration }));
            delete user.password
            await db.end()
            return json({code:100, request:"ok", token, user})
        }else{
            await db.end()
            return json({code:101, request:"ok", detail:"Utente "+username+" già esistente"})
        }
    }
    return json({code:101, request:"ok", detail:"user not valid"})
}

export async function get_user_by_token(token){
    let db = await createConnection();
    var id = JSON.parse(fs.readFileSync("sessions/"+token)).id
    const result = await db.execute('SELECT * FROM users WHERE id=?', [id])
    await db.end()
    return result[0][0]
}

export async function is_logged(token){
    if (token != null) {
        let exists = fs.existsSync("sessions/" + token);
        return exists
    } else {
        return false;
    }
}