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
        alert("Su sesión ha expirado");
        this.logout();

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

// Montar la aplicación Vue
app.mount('#dashboard');