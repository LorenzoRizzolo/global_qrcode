import { r as register } from './login-DQl1-Wjt.js';
import './index-BIAFQWR9.js';
import 'fs';
import 'dotenv';
import 'mysql2/promise';

async function POST({ request }) {
  const data = await request.json();
  const username = data.username;
  const password = data.password;
  const email = data.email;
  const name = data.name;
  return await register(username, password, name, email);
}

export { POST };
//# sourceMappingURL=_server-DvgjmGOM.js.map
