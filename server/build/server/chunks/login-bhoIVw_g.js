import { j as json } from './index-BIAFQWR9.js';
import fs from 'fs';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

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
dotenv.config();
async function createConnection() {
  return await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
  });
}
async function login(username, password) {
  let db = await createConnection();
  const result = await db.execute("SELECT * FROM users WHERE username=? and password=?", [username, password]);
  var find = result[0].length;
  if (find) {
    const user = result[0][0];
    var token = generaToken();
    var expiration = Date.now() + 1e9;
    fs.writeFileSync("sessions/" + token, JSON.stringify({ id: user.id, expiration }));
    delete user.password;
    await db.end();
    return json({ code: 100, request: "ok", token, user });
  }
  return json({ code: 101, request: "ok", detail: "user not found" });
}
async function register(username, password, name, email) {
  if (username && password && name && email) {
    let db = await createConnection();
    var result = await db.execute("SELECT * FROM users WHERE username=?", [username]);
    var find = result[0].length;
    if (!find) {
      await db.execute("INSERT INTO users(`username`, `password`, `name`, `email`) VALUES(?,?,?,?)", [username, password, name, email]);
      var result = await db.execute("SELECT * FROM users WHERE username=?", [username]);
      const user = result[0][0];
      var token = generaToken();
      var expiration = Date.now() + 1e9;
      fs.writeFileSync("sessions/" + token, JSON.stringify({ id: user.id, expiration }));
      delete user.password;
      await db.end();
      return json({ code: 100, request: "ok", token, user });
    } else {
      await db.end();
      return json({ code: 101, request: "ok", detail: "Utente " + username + " già esistente" });
    }
  }
  return json({ code: 101, request: "ok", detail: "user not valid" });
}
async function get_user_by_token(token) {
  let db = await createConnection();
  var id = JSON.parse(fs.readFileSync("sessions/" + token)).id;
  const result = await db.execute("SELECT * FROM users WHERE id=?", [id]);
  await db.end();
  return result[0][0];
}
async function is_logged(token) {
  if (token != null) {
    let exists = fs.existsSync("sessions/" + token);
    return exists;
  } else {
    return false;
  }
}

export { createConnection as c, data as d, get_user_by_token as g, is_logged as i, login as l, ora as o, register as r };
//# sourceMappingURL=login-bhoIVw_g.js.map
