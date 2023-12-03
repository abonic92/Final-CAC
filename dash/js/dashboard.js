// Definición del Sidebar
const Sidebar = {
    data() {
      return {
        menuItems: [
          { label: 'Dashboard', link: './index.html' },
          { label: 'Listar Productores', link: './productores/listar.html' },
          { label: 'Crear Productor', link: './productores/crear.html' },
        ],
      };
    },
    template: `
    <!-- Sidebar -->
        <ul class="navbar-nav bg-gray-900 sidebar sidebar-dark accordion" id="accordionSidebar">
            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-theater-masks"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Teatro</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0" />

            <!-- Nav Item - Dashboard -->
            <li class="nav-item">
                <a class="nav-link" href="./index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider" />

            <!-- Heading -->
            <div class="sidebar-heading">Administrar</div>

            <!-- PRODUCTORES -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    <i class="fas fa-fw fa-pencil-alt"></i>
                    <span>Productores</span>
                </a>
                <div id="collapseOne" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="./productores/listar.html">Listar</a>
                        <a class="collapse-item" href="./productores/crear.html">Crear</a>
                    </div>
                </div>
            </li>

            <!-- GRUPOS -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-layer-group"></i>
                    <span>Grupos</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="buttons.html">Listar</a>
                        <a class="collapse-item" href="cards.html">Crear</a>
                    </div>
                </div>
            </li>

            <!-- FUNCIONES -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseThree"
                    aria-expanded="true" aria-controls="collapseThree">
                    <i class="fas fa-fw fa-palette"></i>
                    <span>Funciones</span>
                </a>
                <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="buttons.html">Listar</a>
                        <a class="collapse-item" href="cards.html">Crear</a>
                    </div>
                </div>
            </li>
            <!-- Divider -->
            <hr class="sidebar-divider" />

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
        <!-- End of Sidebar -->
        `,
};

// Definición del Topbar
const Topbar = {
    data() {
      return {
        // agregar acá nombre de usuario o email para que se muestre dinámicanete..
      };
    },
    template: `
      <!-- Topbar -->
      <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <!-- Sidebar Toggle (Topbar) -->
        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
        </button>
  
        <!-- Topbar Navbar -->
        <ul class="navbar-nav ml-auto">
            <div class="topbar-divider d-none d-sm-block"></div>
  
            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Administrador</span>
                    <img class="img-profile rounded-circle" src="img/undraw_profile.svg" />
                </a>
                <!-- Dropdown - User Information -->
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                    </a>
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                    </a>
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Activity Log
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                    </a>
                </div>
            </li>
        </ul>
      </nav>
      <!-- End of Topbar -->
    `,
  };

  const Footer = {
    data() {
        return {
            footerLinks: [
                { label: 'Inicio', link: '/index.html' },
                { label: 'Acerca de nosotros', link: '/about.html' },
            ],
            currentYear: new Date().getFullYear(),
        };
    },
    template: `
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span v-for="(link, index) in footerLinks" :key="index">
                    <a :href="link.link">{{ link.label }}</a>
                    <span v-if="index < footerLinks.length - 1"> | </span>
                </span>
                <br>
                <span>Copyright &copy; {{ currentYear }} Your Website</span>
            </div>
        </div>
    </footer>
    `,
};


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