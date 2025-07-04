/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} client_id
 * @property {string} name
 * @property {string} client_type
 * @property {string} city
 * @property {string} state
 * @property {string} contact_person
 * @property {string} phone
 * @property {string} email
 */
  import { query } from '../config/db.js';
/**
 * @param {Client} client
 * @returns {boolean}
 */
function isValidClient(client) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (isNaN(Number(client.id))) return false;
  if (typeof client.client_id !== 'string' || client.client_id.trim() === '') return false;
  if (typeof client.name !== 'string' || client.name.trim() === '') return false;
  if (typeof client.client_type !== 'string' || client.client_type.trim() === '') return false;
  if (typeof client.city !== 'string' || client.city.trim() === '') return false;
  if (typeof client.state !== 'string' || client.state.trim() === '') return false;
  if (typeof client.contact_person !== 'string' || client.contact_person.trim() === '') return false;
  if (typeof client.phone !== 'string' || !phoneRegex.test(client.phone)) return false;
  if (typeof client.email !== 'string' || !emailRegex.test(client.email)) return false;

  return true;
}
// Utility: Validate product
function isValidProduct(product) {
  if (isNaN(Number(product.id))) return false;
  if (typeof product.product_id !== 'string' || product.product_id.trim() === '') return false;
  if (typeof product.name !== 'string' || product.name.trim() === '') return false;
  if (typeof product.category !== 'string' || product.category.trim() === '') return false;
  if (typeof product.manufacturer !== 'string' || product.manufacturer.trim() === '') return false;
  if (typeof product.description !== 'string') return false; // description can be empty string
  if (isNaN(Number(product.price))) return false;
  if (isNaN(Number(product.stock_quantity))) return false;
  return true;
}
// Utility: Validate employee
function isValidEmployee(employee) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (isNaN(Number(employee.id))) return false;
  if (typeof employee.employee_id !== 'string' || employee.employee_id.trim() === '') return false;
  if (typeof employee.name !== 'string' || employee.name.trim() === '') return false;
  if (typeof employee.username !== 'string' || employee.username.trim() === '') return false;
  if (typeof employee.password !== 'string' || employee.password.trim() === '') return false;
  if (typeof employee.designation !== 'string' || employee.designation.trim() === '') return false;
  if (typeof employee.state !== 'string' || employee.state.trim() === '') return false;
  if (typeof employee.city !== 'string' || employee.city.trim() === '') return false;
  if (typeof employee.role !== 'string' || employee.role.trim() === '') return false;
  return true;
}


function isValidOrder(order) {
  const statusValues = ['pending', 'completed', 'shipped'];
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}/;

  if (isNaN(Number(order.id))) return false;
  if (!order.order_id || typeof order.order_id !== 'string') return false;
  if (!order.client_id || typeof order.client_id !== 'string') return false;
  if (!order.employee_id || typeof order.employee_id !== 'string') return false;
  if (!isoDateRegex.test(order.order_date)) return false;
  if (isNaN(Number(order.total_amount))) return false;
  if (!statusValues.includes(order.status)) return false;
  if (typeof order.notes !== 'string') return false;
  if (!isoDateRegex.test(order.created_at)) return false;
  if (!isoDateRegex.test(order.updated_at)) return false;

  return true;
}


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

const ClientImport = async (req, res) => {
  const { clients } = req.body;

  if (!Array.isArray(clients)) {
    return res.status(400).json({ error: 'Invalid format. Expected "clients" array.' });
  }

  const invalidRows = [];

  clients.forEach((client, index) => {
    if (!isValidClient(client)) {
      console.log(`Invalid client at row ${index + 1}:`, client);
      invalidRows.push({ row: index + 1, client });
    }
  });

  // Optional artificial delay for simulating processing time
  await new Promise(resolve => setTimeout(resolve, 5000));

  if (invalidRows.length > 0) {
    return res.status(422).json({
      message: 'Some rows are invalid.',
      invalidRows,
    });
  }

  // Prepare SQL query
  const values = clients.map(client => [
    client.id,
    client.client_id,
    client.name,
    client.client_type,
    client.city,
    client.state,
    client.contact_person,
    client.phone,
    client.email
  ]);

  const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ");

  // Define update clause for ON DUPLICATE KEY
  const updateClause = `
    name = VALUES(name),
    client_type = VALUES(client_type),
    city = VALUES(city),
    state = VALUES(state),
    contact_person = VALUES(contact_person),
    phone = VALUES(phone),
    email = VALUES(email)
  `;

  const sql = `
    INSERT INTO clients 
      (id, client_id, name, client_type, city, state, contact_person, phone, email)
    VALUES 
      ${placeholders}
    ON DUPLICATE KEY UPDATE 
      ${updateClause};
  `;


  try {
    const result = await query(sql, values.flat());

    return res.status(200).json({
      message: "Clients imported successfully.",
      insertedRows: result.affectedRows,
      data: clients
    });

  } catch (error) {
    console.error("Database insertion error:", error);
    return res.status(500).json({
      error: "An error occurred while inserting clients.",
      details: error.message
    });
  }
};





const EmployeeImport = async (req, res) => {
  const { employees } = req.body;

  if (!Array.isArray(employees)) {
    return res.status(400).json({ error: 'Invalid format. Expected "employees" array.' });
  }

  const invalidRows = [];

  employees.forEach((employee, index) => {
    if (!isValidEmployee(employee)) {
      console.log(`Invalid employee at row ${index + 1}:`, employee);
      invalidRows.push({ row: index + 1, employee });
    }
  });

  // Optional delay (for UI simulation)
  await new Promise(resolve => setTimeout(resolve, 5000));

  if (invalidRows.length > 0) {
    return res.status(422).json({
      message: 'Some rows are invalid.',
      invalidRows
    });
  }

  // Create SQL query
  const values = employees.map(emp => [
    emp.id,
    emp.employee_id,
    emp.name,
    emp.username,
    emp.password,
    emp.designation,
    emp.state,
    emp.city,
    emp.role
  ]);

  const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ");
  
   // Create ON DUPLICATE KEY UPDATE clause
  const updateFields = [
    'name = VALUES(name)',
    'username = VALUES(username)',
    'password = VALUES(password)',
    'designation = VALUES(designation)',
    'state = VALUES(state)',
    'city = VALUES(city)',
    'role = VALUES(role)'
  ].join(', ');


  // new sql query with ON DUPLICATE KEY UPDATE
  // This will insert new records or update existing ones based on the unique key (employee_id
  const sql = `
    INSERT INTO employees 
      (id, employee_id, name, username, password, designation, state, city, role)
    VALUES 
      ${placeholders}
    ON DUPLICATE KEY UPDATE 
      ${updateFields};
  `;

  try {
    const result = await query(sql, values.flat());

    return res.status(200).json({
      message: "All employees inserted successfully.",
      insertedCount: result.affectedRows,
      data: employees
    });

  } catch (error) {
    console.error("Insert error:", error);
    return res.status(500).json({
      error: "An error occurred while inserting employees.",
      details: error.message
    });
  }
};



const ProductImport = async (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: 'Invalid format. Expected "products" array.' });
  }

  const invalidRows = [];

  products.forEach((product, index) => {
    if (!isValidProduct(product)) {
      console.log(`Invalid product at row ${index + 1}:`, product);
      invalidRows.push({ row: index + 1, product });
    }
  });

  await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay

  if (invalidRows.length > 0) {
    return res.status(422).json({
      message: 'Some rows are invalid.',
      invalidRows
    });
  }

  const values = products.map(prod => [
    prod.id,
    prod.product_id,
    prod.name,
    prod.category,
    prod.manufacturer || null, // optional field
    prod.description || null,  // optional field
    prod.price,
    prod.stock_quantity
  ]);

  const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?, ?, ?)").join(", ");

  const sql = `
  INSERT INTO products
    (id, product_id, name, category, manufacturer, description, price, stock_quantity)
  VALUES
    ${placeholders}
  ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    category = VALUES(category),
    manufacturer = VALUES(manufacturer),
    description = VALUES(description),
    price = VALUES(price),
    stock_quantity = VALUES(stock_quantity);
`;


  try {
    const result = await query(sql, values.flat());

    return res.status(200).json({
      message: "All products inserted successfully.",
      insertedCount: result.affectedRows,
      data: products
    });

  } catch (error) {
    console.error("Insert error:", error);
    return res.status(500).json({
      error: "An error occurred while inserting products.",
      details: error.message
    });
  }
};

const OrderImport = async (req, res) => {
  const { orders } = req.body;

  if (!Array.isArray(orders)) {
    return res.status(400).json({ error: 'Invalid format. Expected "orders" array.' });
  }

  const invalidRows = [];

  orders.forEach((order, index) => {
    if (!isValidOrder(order)) {
      console.log(`Invalid order at row ${index + 1}:`, order);
      invalidRows.push({ row: index + 1, order });
    }
  });

  // Delay (optional)
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delay(5000);

  if (invalidRows.length > 0) {
    return res.status(422).json({
      message: 'Some rows are invalid.',
      invalidRows,
    });
  }

  // Prepare values
  const values = orders.map(order => [
    order.id,
    order.order_id,
    order.client_id,
    order.employee_id,
    order.order_date,
    order.total_amount,
    order.status,
    order.notes || null,
    order.created_at,
    order.updated_at
  ]);

  const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ");

  const sql = `
  INSERT INTO orders 
    (id, order_id, client_id, employee_id, order_date, total_amount, status, notes, created_at, updated_at)
  VALUES 
    ${placeholders}
  ON DUPLICATE KEY UPDATE
    client_id = VALUES(client_id),
    employee_id = VALUES(employee_id),
    order_date = VALUES(order_date),
    total_amount = VALUES(total_amount),
    status = VALUES(status),
    notes = VALUES(notes),
    updated_at = VALUES(updated_at);
`;


  try {
    const result = await query(sql, values.flat());

    return res.status(200).json({
      message: 'All orders inserted successfully.',
      insertedCount: result.affectedRows,
      data: orders
    });

  } catch (error) {
    console.error("Order insert error:", error);
    return res.status(500).json({
      error: "An error occurred while inserting orders.",
      details: error.message
    });
  }
};


export { ClientImport , ProductImport , EmployeeImport , OrderImport };
