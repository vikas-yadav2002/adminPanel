import { query } from "../config/db.js";

 const getSchema = async (req, res) => {
  try {
    // Get list of tables
    const tablesResult = await query(`SHOW TABLES`);
    const schema = {};

    // Extract table names from result
    const tableNames = tablesResult.map(row => Object.values(row)[0]);

    // For each table, get its columns
    for (const tableName of tableNames) {
      const columnsResult = await query(`SHOW COLUMNS FROM \`${tableName}\``);
      schema[tableName] = columnsResult.map(col => ({ name: col.Field }));
    }

    res.json(schema);
  } catch (error) {
    console.error("Error fetching schema:", error);
    res.status(500).json({ error: "Failed to load schema" });
  }
};


export default getSchema;