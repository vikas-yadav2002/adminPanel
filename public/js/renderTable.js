function renderTable(containerId, data, columns) {
  const tableBody = document.querySelector(`#${containerId} tbody`);
  tableBody.innerHTML = ""; // Clear existing rows

  data.forEach(row => {
    const tr = document.createElement("tr");

    columns.forEach(col => {
      const td = document.createElement("td");
      td.setAttribute("data-col", col.key);
      td.textContent = row[col.key] || "";
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);


  });

  $(`#${containerId}`).DataTable({
    destroy: true, // Important to avoid reinitialization error
    paging: true,
    searching: true,
    ordering: true,
    info: true,
    lengthChange: true,
    pageLength: 5
  });
}
