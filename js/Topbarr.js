import EventBus from './event-bus.js';

export default {
  data() {
    return {
      isDropdownOpen: false,
      carrito: [], // tu array de elementos en el carrito
      rolUsuario: localStorage.getItem("user_roles"), // Agrega esta línea
      token: localStorage.getItem("access_token"),
      actualizacionCarrito: 0, // Nueva propiedad para forzar la actualización


    };
  },
  computed: {
    cantidadEnCarrito() {
      // Verifica si hay un token guardado en el localStorage
      const token = localStorage.getItem('access_token');
      
      // Si hay token, lee la cantidad de elementos en el carrito desde el localStorage
      if (token) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        return carrito.reduce((total, item) => total + item.cantidad, 0);
      } else {
        // Si no hay token, muestra 0 en el carrito
        localStorage.removeItem('carrito');
        return 0;
      }
    },
    cantidadMenosCarrito() {
      // Verifica si hay un token guardado en el localStorage
      const token = localStorage.getItem('access_token');
      
      // Si hay token, lee la cantidad de elementos en el carrito desde el localStorage
      if (token) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        return carrito.reduce((total, item) => total + item.cantidad, 0);
      } else {
        // Si no hay token, muestra 0 en el carrito
        localStorage.removeItem('carrito');
        return 0;
      }
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        setTimeout(() => {
          this.closeDropdown();
        }, 3000); // Retraso de 3 segundos
      }
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    logoutModal() {
      // Agregar lógica para mostrar modal de confirmación y realizar logout
      const confirmLogout = confirm("¿Estás seguro de que quieres cerrar sesión?");
      if (confirmLogout) {
        alert("Logout exitoso"); // Puedes personalizar este mensaje o eliminarlo
        localStorage.removeItem("access_token");
        localStorage.removeItem("carrito");
        // Redirigir a la página de inicio de sesión u otra acción
        window.location.href = "/index.html";
      }
    },
     // Método para actualizar la cantidad en el carrito cuando se emite el evento
     actualizarCarrito() {
      console.log('Método actualizar Carrito ejecutado');
  
      const token = localStorage.getItem('access_token');
  
      if (token) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.carrito = [...carrito]; // Asigna un nuevo array para activar la reactividad
      } else {
        localStorage.removeItem('carrito');
        this.carrito = [];
        this.actualizacionCarrito=0;
      }
      

      // Incrementa la propiedad actualizacionCarrito para forzar la actualización
      this.actualizacionCarrito++;
    },
    actualizarMenosCarrito() {
      console.log('Método actualizar Carrito ejecutado');
  
      const token = localStorage.getItem('access_token');
  
      if (token) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.carrito = [...carrito]; // Asigna un nuevo array para activar la reactividad
      } else {
        localStorage.removeItem('carrito');
        this.carrito = [];
        this.actualizacionCarrito=0;
      }
      

      // Incrementa la propiedad actualizacionCarrito para forzar la actualización
      this.actualizacionCarrito--;
    },
  },
  mounted() {
    const token = localStorage.getItem('access_token');
  
      if (!token) {
        localStorage.removeItem('carrito');
      };
    this.actualizarCarrito(); // Llamada inicial
    EventBus.$on('carritoActualizado', () => {
      this.actualizarCarrito();
    });
    EventBus.$on('cantidadMenosCarrito', () => {
      this.actualizarMenosCarrito();
    });
  },
  template: `
    <nav class="navbar navbar-expand-sm navbar-dark bg-black " aria-label="Third navbar example">
      <div class="container-fluid ">
          <div class="">
              <img id="logo" src="./img/logo1.png" alt="Logo de mi página">
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample03">
            <ul class="navbar-nav me-auto mb-2 mb-sm-0"></ul>
            <ul class="nav ">
                <li class="nav-item nav-links">
                    <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                </li>
                <li class="nav-item nav-links">
                    <a class="nav-link active" aria-current="page" href="funciones.html">Funciones</a>
                </li>

                <li class="nav-item nav-links">
                    <a class="nav-link active" aria-current="page" href="contacto.html">Contacto</a>
                </li>

                <li class="nav-item dropdown" @mouseleave="toggleDropdown">
                    <a class="nav-link dropdown-toggle text-light nav-links border border-danger rounded-2"
                        href="#" data-bs-toggle="dropdown" aria-expanded="false"
                        :class="{ 'show': isDropdownOpen }"><i class="fas fa-fw fa-user-alt"></i></a>
                    <ul class="dropdown-menu dropdown-menu-custom" :class="{ 'show': isDropdownOpen }">
                        <li v-if="token && (rolUsuario === 'administrador')" id="dashboardLink"><a class="dropdown-item" href="/dash/index.html">Dashboard</a></li>
                        <li v-if="token" id="logoutLink"><a class="dropdown-item" href="#" @click="logoutModal">Logout</a></li>
                        <li v-else id="loginLink"><a class="dropdown-item" href="/dash/login.html">Iniciar sesión</a></li>

                    </ul>
                </li>

                <li class="nav-item nav-links">
                <a class="nav-link active" aria-current="page" href="carrito.html">
                  <img src="/img/camion.png" alt="Carrito de Compras" style="width: 50px; height: 50px;">
                  <span v-if="cantidadEnCarrito > 0 || actualizacionCarrito > 1" class="contador-carrito">{{ cantidadEnCarrito + actualizacionCarrito -1}}</span>
                  
                  </a>
                </li>
                
            </ul>
          </div>
      </div>
    </nav>
  `,
};
