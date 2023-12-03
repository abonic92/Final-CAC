// ----------- Definición del Sidebar
import Sidebar from './Sidebar.js';

// -----------  Definición del Topbar
import Topbar from './Topbarr.js';

// -----------  Definición del Footer
import Footer from './Footer.js';

// -----------  Definición del listado productores
import Productores from './Productores.js';


// Crear instancia Vue
const app = Vue.createApp({
    mounted() {
        // Verificar si hay un token de acceso almacenado
        const token = localStorage.getItem("access_token");
        if (!token) {
            // Si no hay un token, redirige a la página de inicio
            window.location.href = "/index.html";
        }
    },
});

// Registrar el Sidebar
app.component('sidebar', Sidebar);

// Registra el Topbar
app.component('topbar', Topbar);

// Registra el Footer
app.component('footer-vue', Footer);

// Registra listado Productores
app.component('productores', Productores);

// Evento al botón de logout
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        localStorage.removeItem("access_token"); // Elimina el token de acceso
        window.location.href = "/index.html"; // Redirige a la página de cierre de sesión
    });
}

// Montar la aplicación Vue
app.mount('#app');