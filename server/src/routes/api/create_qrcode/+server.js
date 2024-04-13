import { generate_qrcode, mine_qrcodes } from "../../../lib/qrcode";
import { json } from "@sveltejs/kit";
import { is_logged, get_user_by_token } from "../../../lib/login";

export async function POST({ request }){
    // {
    //     "token": "fA1XNnVeIQYIldPrzzKy",
    //     "filedata":{
    //       "extension":"txt",
    //       "type":"text",
    //       "content":"ciao",
    //       "title":"paper",
    //       "stato":"pubblico" / "privato"
    //     }
    //   }
    try{
        var data = await request.json()
        if(await is_logged(data.token)){
            var type = data.filedata.type
            var user = await get_user_by_token(data.token)
            let qrcode = ""
            switch(type){
                case 'testo':
                case 'link':
                    qrcode = await generate_qrcode(user, data.filedata);
                    break
                case 'video':
                case 'immagine':
                case 'audio':
                    qrcode = await generate_qrcode(user, data.filedata);
                    break
                default:
                    return json({code:100, request:"ko", detail:"Type of qrcode isn't valid"})
            }
            var qrcodes = await mine_qrcodes(user.id)
            return json({code:100, request:"ok", qrcode, qrcodes})
        }else{
            return json({code:1, request:"ko", detail:"user isn't logged"})
        }
    }catch(err){
        console.log(err)
        return json({code:1, request:"ko", detail:"Interal Error"})
    }
}

