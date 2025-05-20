import { query } from '../config/db.js';

// Create orders table
const createOrderTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id VARCHAR(20) UNIQUE NOT NULL,
      client_id VARCHAR(20) NOT NULL, 
      employee_id VARCHAR(20) NOT NULL,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total_amount DECIMAL(12, 2) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await query(sql);
    console.log('Orders table created or already exists');
    
    // Create order_items table as well
    const orderItemsSql = `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(20) NOT NULL,
        product_id VARCHAR(20) NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(12, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await query(orderItemsSql);
    console.log('Order items table created or already exists');
  } catch (error) {
    console.error('Error creating orders tables:', error);
    throw error;
  }
};

export default createOrderTable ;