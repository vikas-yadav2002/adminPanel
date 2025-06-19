import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
      host: process.env.DB_HOST || '185.199.53.102',
      socketPath: null, 
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Test@1234',
      database: process.env.DB_NAME || 'mis_v1',
      port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
const testConnection = async () => {
  try {
    console.log('DB Config:', {
  host: process.env.DB_HOST || '185.199.53.102',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Test@1234',
  database: process.env.DB_NAME || 'mis_v1'
});

    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};
testConnection();
// Execute queries with error handling
const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Query error:', error.message);
    throw error;
  }
};

export { pool, query, testConnection };