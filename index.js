import './app.js';
import { testConnection } from './config/db.js';
import createClientTable from './models/clientModel.js';
import createEmployeeTable from './models/employeeModel.js';
import createOrderTable from './models/orderModel.js';
import createProductTable from './models/productModel.js';

// Initialize database and tables
const initializeDb = async () => {
  try {
    // Test database connection
    console.log()
    const connected = await testConnection();
    
    if (connected) {
      // Create tables if they don't exist
      await createEmployeeTable();
      await createClientTable();
      await createProductTable();
      await createOrderTable();
      
      console.log('Database initialization completed successfully');
    } else {
      console.error('Database initialization failed: Could not connect to database');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Run initialization
initializeDb();

console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode`);