import { json } from "@sveltejs/kit";
import { is_logged, get_user_by_token } from "../../../lib/login";
import { get_qr_by_id, mine_qrcodes, delete_qrcode } from "../../../lib/qrcode";

export async function POST({ request }){
    try{
        var data = await request.json();
        var qrcode = await get_qr_by_id(data.id)
        if(await is_logged(data.token)){
            var user = await get_user_by_token(data.token)
            if(qrcode.id_user==user.id){
                delete_qrcode(data.id)
                // var list = await mine_qrcodes(user.id)
                return json({code:100, request:"ok"});
            }
            return json({code:101, request:"ko", detail:"Non hai i permessi per eliminare il QrCode"});
        }else{
            return json({code:1, request:"ko", detail:"user isn't logged"});
        }
    }catch(err){
        console.log(err);
        return json({code:1, request:"ko", detail:"Internal Error"});
    }
}

