require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'proyecto-registro-alumnos-mysql-1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '123456',
    database: process.env.DB_NAME || 'bd_registro_alumnos',
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
