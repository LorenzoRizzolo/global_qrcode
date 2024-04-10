import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
});

export default connection;
