 function setupCSVUpload(fileInputId, btnId, errorBoxId, containerId, fields, endpoint, entityName) {
      const fileInput = document.getElementById(fileInputId);
      const uploadBtn = document.getElementById(btnId);
      const errorBox = document.getElementById(errorBoxId);
      const dataContainer = document.getElementById(containerId);
      let parsedData = [];

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || !file.name.endsWith('.csv')) {
          errorBox.textContent = "Please upload a valid .csv file.";
          return;
        }

        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const valid = validateCSV(results.data, fields);
            if (valid) {
              parsedData = results.data;
              errorBox.textContent = '';
            }
          },
          error: function (err) {
            errorBox.textContent = "Error parsing file: " + err.message;
          }
        });
      });

      function validateCSV(data, requiredFields) {
        for (let row of data) {
          for (let field of requiredFields) {
            if (!row[field] || row[field].trim() === '') {
              errorBox.textContent = `Missing field "${field}" in one of the rows.`;
              return false;
            }
          }
        }
        return true;
      }

      uploadBtn.addEventListener('click', () => {
        uploadBtn.innerText = 'Loading....';
        uploadBtn.disabled = true;
        uploadBtn.classList.add('opacity-50', 'cursor-not-allowed');

        if (!parsedData.length) {
          errorBox.textContent = 'No valid CSV data to upload.';
          return;
        }

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [entityName]: parsedData })
        })
        .then(res => res.json())
        .then(data => {
          renderTable(data.data || parsedData, containerId, fields);
          fileInput.value = '';
          parsedData = [];
          errorBox.textContent = 'Upload successful!';
        })
        .catch(err => {
          errorBox.textContent = 'Failed to upload data.' + err;
        })
        .finally(() => {
          uploadBtn.innerText = `Upload ${entityName.charAt(0).toUpperCase() + entityName.slice(1)} File`;
          uploadBtn.disabled = false;
          uploadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        });
      });
    }

    function renderTable(data, containerId, fields) {
      const container = document.getElementById(containerId);
      container.innerHTML = `
        <h4 class="text-md font-semibold mt-6 mb-2">Latest Uploaded</h4>
        <table class="min-w-full text-sm border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              ${fields.map(field => `<th class="border px-2 py-1">${field.charAt(0).toUpperCase() + field.slice(1)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${fields.map(field => `<td class="border px-2 py-1">${row[field] || '-'}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      `;
    }