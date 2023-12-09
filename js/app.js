// -----------  Definición del Topbar
import Topbar from './Topbarr.js';

// -----------  Definición del Footbar
import Footbar from './Footbar.js';

// -----------  Definición Detalle Carrito
import Carrito from './Carrito.js';

// -----------  Definición contenido principal del index
import Index from './index.js';

// -----------  Definición funciones
import Funciones from './Funciones.js';

// -----------  Definición carousel
import Carousel from './Carousel.js';

// Crear instancia Vue
const app = Vue.createApp({
    data() {
      return {
        tokenExpiration: null,
        tokenCheckInterval: null,
      };
    },
    mounted() {
      
    },
    methods: {
      checkTokenExpiration() {
        const currentDateTime = new Date();
  
        // Verificar si el token ha expirado
        if (this.tokenExpiration && currentDateTime > this.tokenExpiration) {
            alert("Su sesión ha expirado");
            this.logout();
        }
      },
      logout() {
        // Limpiar intervalo, eliminar token y redirigir
        clearInterval(this.tokenCheckInterval); 
        localStorage.removeItem("access_token"); 
        window.location.href = "/index.html"; 
      },
    },
  });
// Registro del Index
app.component("index", Index);

// Registra el Topbar
app.component('topbar', Topbar);

// Registra el Footer
app.component('footbar', Footbar);

// Registra Carrito
app.component('carrito', Carrito);

// Registra Carousel
app.component('carousel', Carousel);

// Registra listado Funciones
app.component('funciones', Funciones);

// Montar la aplicación Vue
app.mount('#app');

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("access_token");
    const loginLink = document.getElementById("loginLink");
    if (token) { loginLink.innerHTML = '<a href="/dash/index.html">Dashboard</a>'; }
});

// Evento al botón de logout
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        localStorage.removeItem("access_token"); // Elimina el token de acceso
        window.location.href = "/index.html"; // Redirige a la página de cierre de sesión
    });
}