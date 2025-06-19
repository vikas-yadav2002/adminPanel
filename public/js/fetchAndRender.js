async function fetchAndRenderTable({ tableName, containerId, columns }) {
  try {
    const response = await fetch("http://185.199.53.102/api/table/Data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ TableName: tableName })
    });
 
    const result = await response.json();

    if (result.success) {
      renderTable(containerId, result.data, columns);
    } else {
      console.error("Fetch error:", result.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
