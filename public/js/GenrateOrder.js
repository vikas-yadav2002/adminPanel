
import * as XLSX from "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm";
const exportBtn = document.getElementById("exportBtn");
exportBtn.addEventListener("click", () => {
    console.log("clicker export");
  const exportOption = document.getElementById("exportOption").value;
  let exportData = [];

  if (exportOption === "all") {
    // Export the full filtered data
    exportData = filteredData.map(order => ({
      "Emp Id": order["Emp Id"],
      "Order Date": order["Order Date"].split("T")[0],
      "Client Id": order["Client Id"],
      "Product Id": order["Product Id"],
      "Quantity": order["Quantity"],
      "Order Value": order["Order Value"],
      "Order Id": order["Order Id"]
    }));
  } else {
    // Export only visible rows in current page
    const rows = [...document.querySelectorAll("#tableBody tr")];
    exportData = rows.map(row => {
      const cols = row.querySelectorAll("td");
      return {
        "Emp Id": cols[0].innerText,
        "Order Date": cols[1].innerText,
        "Client Id": cols[2].innerText,
        "Product Id": cols[3].innerText,
        "Quantity": cols[4].innerText,
        "Order Value": cols[5].innerText.replace("₹", ""),
        "Order Id": cols[6].innerText
      };
    });
  }

  // Generate Excel file
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  XLSX.writeFile(workbook, "Orders.xlsx");
});



  
  