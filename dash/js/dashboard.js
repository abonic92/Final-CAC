// ----------- Definición del Sidebar
import Sidebar from './Sidebar.js';

// -----------  Definición del Topbar
import Topbar from './Topbarr.js';

// -----------  Definición del Footer
import Footer from './Footer.js';

// -----------  Definición productores
import Productores from './Productores.js';

// -----------  Definición grupos
import Grupos from './Grupos.js';

// -----------  Definición funciones
import Funciones from './Funciones.js';


// Crear instancia Vue
const app = Vue.createApp({
    data() {
      return {
        tokenExpiration: null,
        tokenCheckInterval: null,
      };
    },
    mounted() {
      // Verificar si hay un token de acceso almacenado
      const token = localStorage.getItem("access_token");
      if (!token) {
        // Si no hay un token, redirige a la página de inicio
        window.location.href = "/dash/login.html"; 

      } else {
        // Obtener la fecha de expiración del token del almacenamiento local
        this.tokenExpiration = new Date(localStorage.getItem('tokenExpiration'));
  
        // Configurar un temporizador para verificar la expiración del token cada 5 minutos
        this.tokenCheckInterval = setInterval(() => {
          this.checkTokenExpiration();
        }, 300000);

      }
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

// Registrar el Sidebar
app.component('sidebar', Sidebar);

// Registra el Topbar
app.component('topbar', Topbar);

// Registra el Footer
app.component('footer-vue', Footer);

// Registra listado Productores
app.component('productores', Productores);

// Registra listado Productores
app.component('grupos', Grupos);

// Registra listado Funciones
app.component('funciones', Funciones);

// Montar la aplicación Vue
app.mount('#dashboard');

// Evento al botón de logout
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        localStorage.removeItem("access_token"); // Elimina el token de acceso
        window.location.href = "/index.html"; // Redirige a la página de cierre de sesión
    });
}