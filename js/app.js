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

// -----------  Definición funciones
import Contacto from './Contacto.js';

// -----------  Definición carousel
import Carousel from './Carousel.js';

// Crear instancia Vue
const app = Vue.createApp({
    data() {
      return {
        tokenExpiration: null,
        tokenCheckInterval: null,
        rolUsuario: localStorage.getItem("user_roles"),
        token: localStorage.getItem("access_token"),

      };
    },
    mounted() {
      const loginLink = document.getElementById("loginLink");


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
      logoutModal() {
        // Agregar lógica para mostrar modal de confirmación y realizar logout
        const confirmLogout = confirm("¿Estás seguro de que quieres cerrar sesión?");
        if (confirmLogout) {
          alert("Logout exitoso"); // Puedes personalizar este mensaje o eliminarlo
          localStorage.removeItem("access_token");
          // Redirigir a la página de inicio de sesión u otra acción
          // window.location.href = "/login.html";
        }
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

// Registra listado Contacto
app.component('contacto', Contacto);

// Montar la aplicación Vue
app.mount('#app');


