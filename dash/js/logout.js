// Agrega un evento de clic al botón de logout

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        localStorage.removeItem("access_token"); // Elimina el token de acceso
        window.location.href = "/index.html"; // Redirige a la página de cierre de sesión
    });
}
