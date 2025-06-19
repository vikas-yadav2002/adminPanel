import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/authRoutes.js';
import filteredRoute from './routes/filteredRoute.js'
import clientRoute from './routes/clientRoute.js'
import employeeRoute from './routes/employeeRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import TableRoutes from './routes/TableRoutes.js'



// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev'));

const staticPath = path.join(import.meta.dirname , "public");

app.use(express.static(staticPath));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data' , filteredRoute )
app.use('/api/clients' , clientRoute)
app.use('/api/table' , TableRoutes )
app.use('/api/employees' , employeeRoute)
app.use('/api/product' , productRoute)
app.use('/api/orders' , orderRoutes);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));



//dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

//login
// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//filter
app.get('/filter', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'filter.html'));
});

//importEmployee
app.get('/importEmployee', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'importEmployee.html'));
});


//importClient
app.get('/importClient', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'importClient.html'));
});


//importProduct
app.get('/importProduct', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'importProduct.html'));
});


//importOrders
app.get('/importOrders', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'importOrders.html'));
});


//Data table routes


// client data 
app.get('/Client-Data', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client-Table.html'));
});

//emp data
app.get('/Emp-Data', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'emp-table.html'));
});

//order data 
app.get('/Order-Data', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order-Table.html'));
});

//product data
app.get('/Product-Data', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-table.html'));
});












// Root route
app.get('/health', (req, res) => {
  res.json({
    message: 'Welcome to Company API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      employees: '/api/employees',
      clients: '/api/clients',
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;