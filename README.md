# Express MySQL API

A structured Express application with MySQL and JWT authentication.

## Project Overview

This API provides endpoints for managing employees, clients, products, and orders with filtering capabilities and secure JWT authentication.

## Features

- JWT-based authentication
- MySQL database integration
- Filtered data retrieval for all resources
- RESTful API architecture
- Clean separation of concerns (MVC pattern)
- Secure route protection

## Project Structure

```
root/
├── controllers/         --> Business logic
├── models/              --> Database schemas
├── routes/              --> API routes
├── config/              --> Configuration
├── middlewares/         --> Custom middlewares
├── app.js               --> Main application
├── index.js             --> Entry point
├── .env                 --> Environment variables
└── package.json         --> Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and update the values
   - Set your MySQL credentials and JWT secret

4. Run the application:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Authenticate a user with username and password

### Employees

- `GET /api/employees` - Get all employees
  - Query parameters:
    - `designation` - Filter by designation (e.g., ZSM)
    - `state` - Filter by state (e.g., Delhi)
- `GET /api/employees/:id` - Get a specific employee

### Clients

- `GET /api/clients` - Get all clients
  - Query parameters:
    - `city` - Filter by city (e.g., Tilak Nagar)
    - `type` - Filter by client type (e.g., Retailer Non BA)
- `GET /api/clients/:id` - Get a specific client

### Products

- `GET /api/products` - Get all products
  - Query parameters:
    - `category` - Filter by category (e.g., Eye)
    - `manufacturer` - Filter by manufacturer (e.g., Swiss Beauty)
- `GET /api/products/:id` - Get a specific product

### Orders

- `GET /api/orders` - Get all orders
  - Query parameters:
    - `date` - Filter by date (e.g., 2024-08-20)
    - `clientId` - Filter by client ID (e.g., 26742494)
    - `empId` - Filter by employee ID (e.g., PSR-11)
- `GET /api/orders/:id` - Get a specific order

## Security

- All routes except authentication are protected by JWT
- Passwords are hashed using bcrypt
- Request validation ensures proper data integrity

## License

This project is licensed under the MIT License.