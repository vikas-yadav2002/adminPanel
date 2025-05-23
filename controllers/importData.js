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
  if (!Number.isInteger(product.stock_quantity)) return false;
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

  // Delay utility
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Add a 5-second delay
  await delay(5000);

  // If there are invalid rows, return 422
  if (invalidRows.length > 0) {
    return res.status(422).json({
      message: 'Some rows are invalid.',
      invalidRows,
    });
  }

  // Build the SQL string
  const sql = `
    INSERT INTO clients 
      (id, client_id, name, client_type, city, state, contact_person, phone, email)
    VALUES 
      ${clients.map(client => 
        `('${client.id}', '${client.client_id}', '${client.name}', '${client.client_type}', '${client.city}', '${client.state}', '${client.contact_person}', '${client.phone}', '${client.email}')`
      ).join(",\n      ")};
  `;

  console.log("Generated SQL:", sql); // Log only for debugging, remove in production

  // Not executing the query for now
  return res.status(200).json({
    message: 'All clients are valid.',
    sql,         // returning SQL for verification only
    data: clients,
  });
};




// Controller: Import Employees
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

  await new Promise(resolve => setTimeout(resolve, 5000));

  if (invalidRows.length > 0) {
    return res.status(422).json({ message: 'Some rows are invalid.', invalidRows });
  }

  const sql = `
    INSERT INTO employees
      (id, employee_id, name, username, password, designation, state, city, role)
    VALUES
      ${employees.map(emp => 
        `('${emp.id}', '${emp.employee_id}', '${emp.name}', '${emp.username}', '${emp.password}', '${emp.designation}', '${emp.state}', '${emp.city}', '${emp.role}')`
      ).join(',\n      ')};
  `;

  console.log("Generated SQL for employees:", sql);

  return res.status(200).json({ message: 'All employees are valid.', sql, data: employees });
};




// Controller: Import Products
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

  await new Promise(resolve => setTimeout(resolve, 5000));

  if (invalidRows.length > 0) {
    return res.status(422).json({ message: 'Some rows are invalid.', invalidRows });
  }

  const sql = `
    INSERT INTO products
      (id, product_id, name, category, manufacturer, description, price, stock_quantity)
    VALUES
      ${products.map(prod => 
        `('${prod.id}', '${prod.product_id}', '${prod.name}', '${prod.category}', '${prod.manufacturer}', '${prod.description}', '${prod.price}', '${prod.stock_quantity}')`
      ).join(',\n      ')};
  `;

  console.log("Generated SQL for products:", sql);

  return res.status(200).json({ message: 'All products are valid.', sql, data: products });
};


export { ClientImport , ProductImport , EmployeeImport };
