
    const loginBtn = document.getElementById('loginBtn');
  const btnText = document.getElementById('btnText');
  const spinner = document.getElementById('spinner');

  loginBtn.addEventListener('click', async (e) => {
    // Disable button and show spinner
    e.preventDefault();
    loginBtn.disabled = true;
    btnText.textContent = 'Logging in...';
    spinner.classList.remove('hidden');

    try {
      // Example form data (replace with your real input values)
      const body = {
        username: 'vikas@gmail.com',
        password: 'test'
      };

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      localStorage.setItem("token" , JSON.stringify(data));
      console.log('✅ Response:', data);

      // Handle redirect or error message here
    } catch (err) {
      console.error('❌ Login error:', err);
    } finally {
      // Re-enable button and hide spinner
      loginBtn.disabled = false;
      btnText.textContent = 'Login';
      spinner.classList.add('hidden');
    }
  });