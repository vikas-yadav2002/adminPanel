import { query } from "../config/db.js";

const allowedTables = ["clients", "employees", "products", "orders"]; // etc.

const Data = async (req, res) => {
  try {
    const { TableName } = req.body;

    if (!TableName || !allowedTables.includes(TableName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing table name.",
      });
    }

    const sql = `SELECT * FROM ${TableName}`;
    const result = await query(sql);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching data.",
    });
  }
};

export { Data };
