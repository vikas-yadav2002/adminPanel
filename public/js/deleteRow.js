async function deleteRow(tableName, primaryKey, value) {
  try {
    const response = await fetch(`/api/delete/data`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        table: tableName,
        key: primaryKey,
        value: value
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Network error:", error);
    return { success: false, error: error.message };
  }
}
