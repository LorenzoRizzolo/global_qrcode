
import { json } from "@sveltejs/kit";
import { mine_qrcodes } from "../../../lib/qrcode";
import { get_user_by_token, is_logged } from "../../../lib/login";

export async function POST({ request }){
    try{
        var data = await request.json();
        if(await is_logged(data.token)){
            var user = await get_user_by_token(data.token)
            var list = await mine_qrcodes(user.id)
            return json({code:100, request:"ok", list});
        }else{
            return json({code:1, request:"ko", detail:"user isn't logged"});
        }
    }catch(err){
        console.log(err);
        return json({code:1, request:"ko", detail:"Internal Error"});
    }
}
