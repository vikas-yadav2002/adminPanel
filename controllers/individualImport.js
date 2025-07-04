import { query } from '../config/db.js';

const individualImport = async (req, res) => {
  const tableName = req.query.tableName || req.body.tableName;
  const formData = { ...req.body };

  delete formData.tableName;

  if (!tableName || Object.keys(formData).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing tableName or form data"
    });
  }

  const columns = Object.keys(formData).map(col => `\`${col}\``).join(', ');
  const values = Object.values(formData).map(val => `'${val}'`).join(', ');
  const updateClause = Object.keys(formData)
    .map(col => `\`${col}\` = VALUES(\`${col}\`)`)
    .join(', ');

  const sql = `
    INSERT INTO \`${tableName}\` (${columns}) 
    VALUES (${values}) 
    ON DUPLICATE KEY UPDATE ${updateClause};
  `;

  try {
    const result = await query(sql);

    return res.status(200).json({
      success: true,
      message: `Data inserted or updated in table: ${tableName}`,
      affectedRows: result.affectedRows,
      data: formData,
      sql
    });
  } catch (error) {
    console.error("DB insert/update error:", error);
    return res.status(500).json({
      success: false,
      message: "Database error",
      error: error.message
    });
  }
};

export default individualImport;
