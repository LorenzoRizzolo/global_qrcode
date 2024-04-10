import { j as json } from './index-BIAFQWR9.js';
import { i as is_logged } from './login-Go6X9AwE.js';
import 'dotenv';
import 'mysql2/promise';
import 'fs';

async function POST({ request }) {
  try {
    var data = await request.json();
    if (await is_logged(data.token)) {
      return json({ code: 100, request: "ok" });
    } else {
      return json({ code: 1, request: "ko", detail: "user isn't logged" });
    }
  } catch (err) {
    console.log(err);
    return json({ code: 1, request: "ko", detail: "Internal Error" });
  }
}

export { POST };
//# sourceMappingURL=_server-DsjFNxIG.js.map
