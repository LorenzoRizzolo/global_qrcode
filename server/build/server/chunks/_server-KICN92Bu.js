import { j as json } from './index-BIAFQWR9.js';
import { i as is_logged, g as get_user_by_token } from './login-bhoIVw_g.js';
import { m as mine_qrcodes } from './qrcode-FvcxL9sw.js';
import 'fs';
import 'dotenv';
import 'mysql2/promise';
import 'qr-image';

async function POST({ request }) {
  try {
    var data = await request.json();
    if (await is_logged(data.token)) {
      var user = await get_user_by_token(data.token);
      var list = await mine_qrcodes(user.id);
      return json({ code: 100, request: "ok", list });
    } else {
      return json({ code: 1, request: "ko", detail: "user isn't logged" });
    }
  } catch (err) {
    console.log(err);
    return json({ code: 1, request: "ko", detail: "Internal Error" });
  }
}

export { POST };
//# sourceMappingURL=_server-KICN92Bu.js.map
