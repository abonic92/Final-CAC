export default {
  data() {
    return {
      // agregar acá nombre de usuario o email para que se muestre dinámicanete..
    };
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
            <ul class="navbar-nav me-auto mb-2 mb-sm-0">


            </ul>
            <ul class="nav ">
                <li class="nav-item nav-links">
                    <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                </li>
                <li class="nav-item nav-links">
                    <a class="nav-link active" aria-current="page" href="funciones.html">Funciones</a>
                </li>
                <li class="nav-item nav-links">
                    <a class="nav-link active" aria-current="page" href="carrito.html">Carrito</a>
                </li>
                <li class="nav-item nav-links">
                    <a class="nav-link active" aria-current="page" href="contacto.html">Contacto</a>
                </li>


                <li class="nav-item dropdown ">
                    <a class="nav-link dropdown-toggle text-light nav-links border border-danger rounded-2" href="#" data-bs-toggle="dropdown"
                        aria-expanded="false"><strong>Sesion</strong></a>
                    <ul class="dropdown-menu">
                        <li id="loginLink"><a class="dropdown-item" href="/dash/login.html">Login</a></li>

                    </ul>
                </li>
            </ul>

          </div>
      </div>
    </nav>
    `,
};