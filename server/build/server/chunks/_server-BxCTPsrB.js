import { l as login } from './login-XYCRM736.js';
import 'dotenv';
import 'mysql2/promise';
import './index-BIAFQWR9.js';
import 'fs';

async function POST({ request }) {
  const data = await request.json();
  const username = data.username;
  const password = data.password;
  console.log("login recived");
  return await login(username, password);
}

export { POST };
//# sourceMappingURL=_server-BxCTPsrB.js.map
