import { query } from "../config/db.js";

export const runQuery = async (req, res) => {
  const { sql } = req.body;

  if (!sql || typeof sql !== "string") {
    return res.status(400).json({ error: "SQL query is required." });
  }

  try {
    const result = await query(sql);

    // If SELECT, return rows
    if (Array.isArray(result)) {
      return res.json({ rows: result });
    }

    // If INSERT/UPDATE/DELETE, return affectedRows (optional)
    return res.json({ message: "Query executed", affectedRows: result.affectedRows || 0 });
  } catch (error) {
    console.error("Query execution failed:", error);
    return res.status(500).json({ error: error.message });
  }
};
