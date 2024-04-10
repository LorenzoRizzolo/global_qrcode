import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

// Configura la connessione al database
const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
});

export default connection;
