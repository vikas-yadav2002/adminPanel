function paginateTable(data, rowsPerPage = 5) {
  const tbody = document.getElementById("tableBody");
  const pagination = document.getElementById("paginationControls");

  let currentPage = 1;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  function renderPage(page) {
    tbody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const slicedData = data.slice(start, end);

    slicedData.forEach(order => {
      const row = `
        <tr class="border-t">
          <td class="px-4 py-3">${order["Emp Id"]}</td>
          <td class="px-4 py-3">${order["Order Date"].split("T")[0]}</td>
          <td class="px-4 py-3">${order["Client Id"]}</td>
          <td class="px-4 py-3">${order["Product Id"]}</td>
          <td class="px-4 py-3">${order["Quantity"]}</td>
          <td class="px-4 py-3">₹${order["Order Value"]}</td>
          <td class="px-4 py-3">${order["Order Id"]}</td>
          <td class="px-4 py-3">
            <button class="text-blue-600 hover:underline">View</button>
          </td>
        </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    });

    renderPaginationControls();
  }

  function renderPaginationControls() {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = `px-3 py-1 border rounded ${
        i === currentPage ? "bg-blue-600 text-white" : "bg-gray-100"
      }`;
      btn.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });
      pagination.appendChild(btn);
    }
  }

  // Initial render
  renderPage(currentPage);
}