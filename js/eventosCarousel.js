// eventosCarousel.js
const eventosCarousel = {
    data() {
      return {
        funciones: [],
      };
    },
    mounted() {
      // Llama a la función para cargar funciones desde la API aquí
      this.cargarFunciones();
    },
    methods: {
      async cargarFunciones() {
        try {
          const token = localStorage.getItem("access_token");
          const headers = new Headers();
          headers.append("Authorization", `Bearer ${token}`);
  
          const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow",
          };
  
          const response = await fetch("https://gcandia1992.pythonanywhere.com/funciones", requestOptions);
  
          if (!response.ok) {
            throw new Error(`Error al cargar datos de funciones. Código: ${response.status}`);
          }
  
          const data = await response.json();
          this.funciones = data.funciones;
        } catch (error) {
          console.error("Error al cargar datos de funciones:", error);
        }
      },
    },
    template: `
      <div>
        <h2 class="presentacion">Conoce un poco acerca de nuestros espectáculos</h2>
        <section class="container my-5">
          <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div v-for="(funcion, index) in funciones" :key="index" class="carousel-item" :class="{ 'active': index === 0 }">
                <div class="d-flex justify-content-around">
                  <div class="card" style="width: 18rem;">
                    <img :src="funcion.imagen" class="card-img-top" :alt="'Evento ' + funcion.id">
                    <div class="card-body">
                      <h5 class="card-title">{{ funcion.titulo }}</h5>
                      <p class="card-text">{{ funcion.fecha }} - {{ funcion.hora }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Siguiente</span>
            </button>
          </div>
        </section>
      </div>
    `,
  };
  
  const app = Vue.createApp(eventosCarousel);
  app.mount("#eventosCarousel");
  