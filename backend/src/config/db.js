import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

// Pool de conexões: reaproveita conexões e reconecta sozinho se o banco cair.
// As credenciais vêm do .env (veja .env.example) e nunca são impressas no log.
const db = mysql.createPool({
    host: env.MYSQL_HOST || 'localhost',
    port: Number(env.MYSQL_PORT) || 3306,
    user: env.MYSQL_USER || 'root',
    password: env.MYSQL_PASSWORD || '',
    database: env.MYSQL_DATABASE || 'vinicola_tcc',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true,
});

export default db;
