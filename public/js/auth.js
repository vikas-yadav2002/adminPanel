// authCheck.js
(function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("token");
  if (!isLoggedIn) {
    window.location.href = "/";
  }
})();



  
