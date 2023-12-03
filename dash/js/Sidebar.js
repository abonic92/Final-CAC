export default {
    data() {
      return {
        menuItems: [
          { label: 'Dashboard', link: './index.html' },
          { label: 'Listar Productores', link: './productores.html' },
          { label: 'Crear Productor', link: './productores-crear.html' },
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
                <a class="nav-link" href="./productores.html">
                    <i class="fas fa-fw fa-pencil-alt"></i>
                    <span>Productores</span>
                </a>
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

        </ul>
        <!-- End of Sidebar -->
        `,
};