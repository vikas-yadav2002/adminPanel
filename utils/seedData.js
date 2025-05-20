import { query } from '../config/db.js'; 


export const seedData = async () => {
  try {
    console.log("Seeding started...");
    // will try with array data in their respective file later
    // Seed Clients
    for (let i = 1; i <= 10; i++) {
      await query(
        `INSERT INTO clients (client_id, name, client_type, city, state, contact_person, phone, email)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `CL-10${i}`,
          `Client ${i}`,
          "Corporate",
          `City ${i}`,
          `State ${i}`,
          `Contact ${i}`,
          `12345678${i}${i}`,
          `client${i}@example.com`
        ]
      );
    }

    // Seed Employees
    for (let i = 1; i <= 10; i++) {
      await query(
        `INSERT INTO employees (employee_id, name, username, password, designation, state, city, role)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `EMP-00${i}`,
          `Employee ${i}`,
          `emp${i}`,
          `pass${i}`,
          `Designation ${i}`,
          `State ${i}`,
          `City ${i}`,
          i % 2 === 0 ? 'admin' : 'user'
        ]
      );
    }

    // Seed Products
    for (let i = 1; i <= 10; i++) {
      await query(
        `INSERT INTO products (product_id, name, price)
         VALUES (?, ?, ?)`,
        [
          `PROD-${i}`,
          `Product ${i}`,
          (i * 100).toFixed(2)
        ]
      );
    }

    // Seed Orders
    for (let i = 1; i <= 10; i++) {
      await query(
        `INSERT INTO orders (order_id, employee_id, client_id, order_date)
         VALUES (?, ?, ?, ?)`,
        [
          `ORD-00${i}`,
          `EMP-00${(i % 10) + 1}`,
          `CL-10${(i % 10) + 1}`,
          `2024-05-${String((i % 28) + 1).padStart(2, '0')}`
        ]
      );
    }

    // Seed Order Items
    for (let i = 1; i <= 10; i++) {
      const orderId = `ORD-00${(i % 10) + 1}`;
      const productId = `PROD-${(i % 10) + 1}`;
      const quantity = Math.floor(Math.random() * 5) + 1;
      const subtotal = quantity * ((i * 100) % 500 + 100);

      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, subtotal)
         VALUES (?, ?, ?, ?)`,
        [orderId, productId, quantity, subtotal]
      );
    }

    console.log("✅ Seeding completed successfully.");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};
