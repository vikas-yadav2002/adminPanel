import { query } from '../config/db.js';

// Create employees table
const createEmployeeTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employee_id VARCHAR(20) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      designation VARCHAR(50) NOT NULL,
      state VARCHAR(50) NOT NULL,
      city VARCHAR(50) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await query(sql);
    console.log('Employees table created or already exists');
  } catch (error) {
    console.error('Error creating employees table:', error);
    throw error;
  }
};

export default createEmployeeTable ;