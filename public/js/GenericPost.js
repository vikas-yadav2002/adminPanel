// 🔧 Function to extract data from any form by its ID
function getFormData(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

// 🔧 Function to post data to server
async function postFormData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to submit form');
    
    const result = await response.json();
    console.log('✅ Server Response:', result);
    return result;
  } catch (err) {
    console.error('❌ Error:', err.message);
    alert('Error submitting the form. Please try again.');
  }
}
