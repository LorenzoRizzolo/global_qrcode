import { j as json } from './index-BIAFQWR9.js';
import { i as is_logged, g as get_user_by_token } from './login-BVn5wNJZ.js';
import 'fs';
import 'dotenv';
import 'mysql2/promise';

async function POST({ request }) {
  try {
    var data = await request.json();
    if (await is_logged(data.token)) {
      var user = await get_user_by_token(data.token);
      delete user.password;
      return json({ code: 100, request: "ok", user });
    } else {
      return json({ code: 1, request: "ko", detail: "user isn't logged" });
    }
  } catch (err) {
    return json({ code: 1, request: "ko", detail: "Internal Error" });
  }
}

export { POST };
//# sourceMappingURL=_server-DfnZh28u.js.map
