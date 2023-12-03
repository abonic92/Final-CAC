document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("access_token");
    const loginLink = document.getElementById("loginLink");
    if (token) { loginLink.innerHTML = '<a href="/dash/index.html">Dashboard</a>'; }
});