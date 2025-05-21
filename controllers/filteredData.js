import { query } from "../config/db.js";

// Get all orders with optional dynamic filtering
const GetOrderDetailsWithClientAndEmp = async (req, res) => {
  try {
    // Extracting query parameters from the request
    const {
      employee_id,
      client_id,
      product_id,
      order_id,
      start_date,
      end_date,
    } = req.query;

    console.log("Query Params:", req.query);

    // Base SQL Query
    let sql = `
      SELECT 
        e.employee_id AS 'Emp Id',
        o.order_date AS 'Order Date',
        o.client_id AS 'Client Id',
        p.product_id AS 'Product Id',
        od.quantity AS 'Quantity',
        od.subtotal AS 'Order Value',
        o.order_id AS 'Order Id'
      FROM 
        orders o
      INNER JOIN employees e ON o.employee_id = e.employee_id
      INNER JOIN clients c ON o.client_id = c.client_id
      INNER JOIN order_items od ON o.order_id = od.order_id
      INNER JOIN products p ON od.product_id = p.product_id
    `;

    // Initialize conditions and queryParams
    const conditions = [];
    const queryParams = [];

    // Dynamically build WHERE clause
    if (employee_id) {
      conditions.push(`e.employee_id = ?`);
      queryParams.push(employee_id);
    }

    if (client_id) {
      conditions.push(`c.client_id = ?`);
      queryParams.push(client_id);
    }

    if (product_id) {
      conditions.push(`p.product_id = ?`);
      queryParams.push(product_id);
    }

    if (order_id) {
      conditions.push(`o.order_id = ?`);
      queryParams.push(order_id);
    }

    if (start_date && end_date) {
      conditions.push(`o.order_date BETWEEN ? AND ?`);
      queryParams.push(start_date, end_date);
    }

    // If there are any conditions, append them
    if (conditions.length > 0) {
      sql += ` WHERE ` + conditions.join(' AND ');
    }

    // Append order by clause
    sql += ` ORDER BY o.order_date, e.employee_id, c.client_id;`;

    // Log the final SQL query for debugging
    console.log("Final SQL Query: ", sql);
    console.log("Query Params: ", queryParams);

    // Execute the query
    const response = await query(sql, queryParams);

    if (!response || response.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found for the specified filters",
      });
    }

    // Send successful response
    return res.status(200).json({
      success: true,
      data: response,
    });

  } catch (error) {
    console.error("Error while fetching details:", error.message);
    return res.status(502).json({
      success: false,
      error: error.message,
      message: "Error while fetching details",
    });
  }
};

export { GetOrderDetailsWithClientAndEmp };
