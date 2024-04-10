import { generate_qrcode } from "../../../lib/qrcode";
import { json } from "@sveltejs/kit";

export async function POST({ request }){
    var data = await request.json()
    var type = data.type
    var db_data = {}
    switch(type){
        case 'text':
        case 'url':
        case 'number':
    }
    generate_qrcode(text, name);
    return json({request:"ok"})
}

