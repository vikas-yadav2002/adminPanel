import { query } from '../config/db.js';

// Create products table
const createProductTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id VARCHAR(20) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL, 
      manufacturer VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock_quantity INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await query(sql);
    console.log('Products table created or already exists');
  } catch (error) {
    console.error('Error creating products table:', error);
    throw error;
  }
};

export default createProductTable ;