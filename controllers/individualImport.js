const individualImport = (req, res) => {
  const tableName = req.query.tableName || req.body.tableName;
  const formData = req.body;

  // Remove tableName from data if passed in body
  delete formData.tableName;

  if (!tableName || Object.keys(formData).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Missing tableName or form data"
    });
  }

  // Extract column names and values
  const columns = Object.keys(formData).map(col => `\`${col}\``).join(', ');
  const values = Object.values(formData).map(val => `'${val}'`).join(', ');

  // Construct mock SQL query
  const sql = `INSERT INTO \`${tableName}\` (${columns}) VALUES (${values});`;

  // Return mock SQL and data
  return res.status(200).json({
    success: true,
    message: `Mock SQL generated for table: ${tableName}`,
    sql: sql,
    data: formData
  });
};

export default individualImport;
