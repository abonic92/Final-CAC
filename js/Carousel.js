export default {
  data() {
    return {
      funciones: [],
      loading: false,
    };
  },
  mounted() {
    this.cargarFunciones();
  },
  methods: {
    async cargarFunciones() {
      try {
        this.loading = true;
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
        this.funciones = data.funciones.map(funcion => {
          return {
            ...funcion,
            fecha: this.formatDate(funcion.fecha),
          };
        });
      } catch (error) {
        console.error("Error al cargar datos de funciones:", error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(value) {
      if (!value) return "";

      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(value);

      return new Intl.DateTimeFormat("es-ES", options).format(date);
    },
  },
  template: `
    <div>
      <h2 class="presentacion">Conoce un poco acerca de nuestros espectáculos</h2>
      <section class="container my-5">
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(funcionGroup, groupIndex) in chunkedFunciones" :key="groupIndex" class="carousel-item" :class="{ 'active': groupIndex === 0 }">
              <div class="row">
                <div v-for="(funcion, index) in funcionGroup" :key="index" class="col-md-4">
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
  computed: {
    chunkedFunciones() {
      const size = 3;
      return this.funciones.reduce((accumulator, currentValue, index) => {
        const chunkIndex = Math.floor(index / size);

        if (!accumulator[chunkIndex]) {
          accumulator[chunkIndex] = [];
        }

        accumulator[chunkIndex].push(currentValue);

        return accumulator;
      }, []);
    },
  },
};
