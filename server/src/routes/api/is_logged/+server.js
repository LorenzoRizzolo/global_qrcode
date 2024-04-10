
import { json } from "@sveltejs/kit";
import { is_logged } from "../../../lib/login";

export async function POST({ request }){
    try{
        var data = await request.json();
        if(await is_logged(data.token)){
            return json({code:100, request:"ok"});
        }else{
            return json({code:1, request:"ko", detail:"user isn't logged"});
        }
    }catch(err){
        console.log(err);
        return json({code:1, request:"ko", detail:"Internal Error"});
    }
}
