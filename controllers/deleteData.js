import { query } from '../config/db.js';

const DeleteData = async (req, res) => {
  const { table, key, value } = req.body;

  try {
    // Validate table and key (basic SQL injection protection)
    const validIdentifier = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    if (!validIdentifier.test(table) || !validIdentifier.test(key)) {
      return res.status(400).json({ success: false, message: "Invalid table or key name" });
    }

    const sql = `DELETE FROM \`${table}\` WHERE \`${key}\` = ?`;
    const values = [value];

    //  Execute query
    const result = await query(sql, values);

    if (result.affectedRows > 0) {
      res.json({
        success: true,
        message: `Record deleted from ${table} where ${key} = ${value}`
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No matching record found in ${table} for ${key} = ${value}`
      });
    }
  } catch (err) {
    console.error("Error executing delete:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default DeleteData;
