function renderTable(containerId, data, columns, tableName, primaryKey) {
  const tableBody = document.querySelector(`#${containerId} tbody`);
  const tableHead = document.querySelector(`#${containerId} thead`);

  // Clear previous content
  tableBody.innerHTML = "";
  // Render Rows
  data.forEach(row => {
    const tr = document.createElement("tr");

    columns.forEach(col => {
      const td = document.createElement("td");
      td.setAttribute("data-col", col.key);
      td.textContent = row[col.key] || "";
      tr.appendChild(td);
    });

    // Delete Icon Cell
    const actionTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", async () => {
      const id = row[primaryKey];
      const confirmed = confirm(`Are you sure you want to delete this ${tableName} record with ID ${id}?`);
      if (!confirmed) return;

      const result = await deleteRow(tableName, primaryKey, id);
      if (result.success) {
        // Remove row from DOM
        tr.remove();
      } else {
        alert("Failed to delete. Please try again.");
      }
    });

    actionTd.appendChild(deleteBtn);
    tr.appendChild(actionTd);
    tableBody.appendChild(tr);
  });

  // Reinitialize DataTable
  $(`#${containerId}`).DataTable({
    destroy: true,
    paging: true,
    searching: true,
    ordering: true,
    info: true,
    lengthChange: true,
    pageLength: 10
  });
}
