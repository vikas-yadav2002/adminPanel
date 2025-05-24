document.addEventListener('DOMContentLoaded', () => {
  // Main import handler
  function handleCSVImport({ fileInputId, uploadBtnId, errorBoxId, endpoint, requiredFields, renderFn , arrayname , container }) {
    const fileInput = document.getElementById(fileInputId);
    const uploadBtn = document.getElementById(uploadBtnId);
    const errorBox = document.getElementById(errorBoxId);
    const dataContainer = document.getElementById(container);

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
          const valid = validateCSV(results.data);
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

    function validateCSV(data) {
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
      uploadBtn.innerText = 'Loading...';
      uploadBtn.disabled = true;
      uploadBtn.classList.add('opacity-50', 'cursor-not-allowed');

      if (!parsedData.length) {
        errorBox.textContent = 'No valid CSV data to upload.';
        resetUploadBtn();
        return;
      }

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [arrayname] : parsedData })
      })
        .then(res => res.json())
        .then(resData => {
          console.log(resData);
          renderFn(resData.data, dataContainer);
          fileInput.value = '';
          parsedData = [];
          errorBox.textContent = 'Upload successful!';
        })
        .catch(err => {
          errorBox.textContent = 'Failed to upload data. ' + err;
        })
        .finally(resetUploadBtn);
    });

    function resetUploadBtn() {
      uploadBtn.innerText = 'Upload File';
      uploadBtn.disabled = false;
      uploadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }

  // Export the function
  window.handleCSVImport = handleCSVImport;
});
