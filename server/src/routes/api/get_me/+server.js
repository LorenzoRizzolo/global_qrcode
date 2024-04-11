
import { json } from "@sveltejs/kit";
import { is_logged, get_user_by_token } from "../../../lib/login";

export async function POST({ request }){
    try{
        var data = await request.json();
        if(await is_logged(data.token)){
            var user = await get_user_by_token(data.token)
            delete user.password
            console.log(user)
            return json({code:100, request:"ok", user});
        }else{
            return json({code:1, request:"ko", detail:"user isn't logged"});
        }
    }catch(err){
        return json({code:1, request:"ko", detail:"Internal Error"});
    }
}
