// test-db.js
import mysql from 'mysql2/promise'; // or const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '185.199.53.102',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Test@1234',
      database: process.env.DB_NAME || 'mis_v1',
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Connected to MySQL successfully!');
    await connection.end();
  } catch (error) {
    console.error('❌ Failed to connect to MySQL:', error.message);
  }
}

testConnection();
