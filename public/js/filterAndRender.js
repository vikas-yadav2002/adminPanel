function setupFilter(columns) {
  const form = document.getElementById("columnFilterForm");

  form.innerHTML = ""; // Clear existing checkboxes

  columns.forEach(col => {
    const label = document.createElement("label");
    label.className = "flex items-center gap-2";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "columns";
    input.value = col.key;
    input.checked = true;

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + col.label));
    form.appendChild(label);
  });

  // Append submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md";
  submitBtn.textContent = "Apply";

  form.appendChild(submitBtn);

  form.onsubmit = function (e) {
    e.preventDefault();

    const selected = Array.from(form.elements["columns"])
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    document.querySelectorAll(`#myTable thead th, #myTable tbody td`).forEach(el => {
      const colKey = el.getAttribute("data-col");
      el.style.display = selected.includes(colKey) ? "" : "none";
    });

    // Close modal and overlay
    document.getElementById("filterColumnModal").classList.add("translate-x-full");
    document.getElementById("filterOverlay").classList.add("hidden");
  };
}
