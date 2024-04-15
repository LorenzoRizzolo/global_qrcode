import { l as login } from './login-bhoIVw_g.js';
import './index-BIAFQWR9.js';
import 'fs';
import 'dotenv';
import 'mysql2/promise';

async function POST({ request }) {
  const data = await request.json();
  const username = data.username;
  const password = data.password;
  console.log("login", username);
  return await login(username, password);
}

export { POST };
//# sourceMappingURL=_server-CDH--n1m.js.map
