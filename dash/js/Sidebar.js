export default {
    data() {
      return {
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
            <hr class="sidebar-divider" />
            
            <div class="sidebar-heading">Enlaces</div>

            <!-- INICIO -->
            <li class="nav-item">
            <a class="nav-link" href="/index.html">
                <i class="fas fa-fw fa-home"></i>
                <span>Inicio</span>
            </a>
            <!-- DASHBOARD -->
            <li class="nav-item">
                <a class="nav-link" href="./index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            
            </li>


            <!-- Divider -->
            <hr class="sidebar-divider" />

            <!-- Heading -->
            <div class="sidebar-heading">Administrar</div>

            <!-- PRODUCTORES -->
            <li class="nav-item">
                <a class="nav-link" href="./productores.html">
                    <i class="fas fa-fw fa-pencil-alt"></i>
                    <span>Productores</span>
                </a>
            </li>


            <!-- GRUPOS -->
            <li class="nav-item">
            <a class="nav-link" href="./grupos.html">
                <i class="fas fa-fw fa-layer-group"></i>
                <span>Grupos</span>
            </a>
            </li>

            <!-- FUNCIONES -->
            <li class="nav-item">
            <a class="nav-link" href="./funciones.html">
                <i class="fas fa-fw fa-palette"></i>
                <span>Funciones</span>
            </a>
            </li>

            <!-- USUARIOS -->
            <li class="nav-item">
            <a class="nav-link" href="./usuarios.html">
                <i class="fas fa-fw fa-user-alt"></i>
                <span>Usuarios</span>
            </a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider" />

            <!-- Divider -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
            
        </ul>
        <!-- End of Sidebar -->
        `,
};