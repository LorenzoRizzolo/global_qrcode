import { l as login } from './login-BVn5wNJZ.js';
import './index-BIAFQWR9.js';
import 'fs';
import 'dotenv';
import 'mysql2/promise';

async function POST({ request }) {
  const data = await request.json();
  const username = data.username;
  const password = data.password;
  return await login(username, password);
}

export { POST };
//# sourceMappingURL=_server-Bhzi5AKx.js.map
