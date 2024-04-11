import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { j as json } from './index-BIAFQWR9.js';
import fs from 'fs';

dotenv.config();
const connection = await mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME
});
function generaToken(lunghezza = 20) {
  const caratteri = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < lunghezza; i++) {
    const indiceCasuale = Math.floor(Math.random() * caratteri.length);
    token += caratteri.charAt(indiceCasuale);
  }
  return token;
}
function data() {
  var currentDate = /* @__PURE__ */ new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1;
  var currentDay = currentDate.getDate();
  var data2 = currentYear + "/" + currentMonth + "/" + currentDay;
  return data2;
}
function ora() {
  var currentDate = /* @__PURE__ */ new Date();
  var currentHours = currentDate.getHours();
  var currentMinutes = currentDate.getMinutes();
  var currentSeconds = currentDate.getSeconds();
  var ora2 = currentHours + ":" + currentMinutes + ":" + currentSeconds;
  return ora2;
}
async function login(username, password) {
  const result = await connection.execute("SELECT * FROM users WHERE username=? and password=?", [username, password]);
  var find = result[0].length;
  if (find) {
    const user = result[0][0];
    var token = generaToken();
    var expiration = Date.now() + 1e9;
    fs.writeFileSync("sessions/" + token, JSON.stringify({ id: user.id, expiration }));
    delete user.password;
    return json({ code: 100, request: "ok", token, user });
  }
  return json({ code: 101, request: "ok", detail: "user not found" });
}
async function get_user_by_token(token) {
  var id = JSON.parse(fs.readFileSync("sessions/" + token)).id;
  const result = await connection.execute("SELECT * FROM users WHERE id=?", [id]);
  return result[0][0];
}
async function is_logged(token) {
  if (token != null) {
    var exists = fs.existsSync("sessions/" + token);
    return exists;
  } else {
    return false;
  }
}

export { connection as c, data as d, get_user_by_token as g, is_logged as i, login as l, ora as o };
//# sourceMappingURL=login-DOGR3e2X.js.map
