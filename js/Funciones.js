export default {
  data() {
    return {
      funciones: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchFunctions();
  },
  methods: {
    formatDate(value) {
      if (!value) return "";

      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const date = new Date(value);

      return new Intl.DateTimeFormat("es-ES", options).format(date);
    },
    async fetchFunctions() {
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

        const response = await fetch(
          "https://gcandia1992.pythonanywhere.com/funciones",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(
            `Error al cargar datos de funciones. Código: ${response.status}`
          );
        }

        const data = await response.json();
        this.funciones = data.funciones.map((funcion) => {
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
    showFunctionDetails(funcion) {
      // Lógica para mostrar detalles de la función, si es necesario
      console.log("Detalles de la función:", funcion);
    },
  },
  template: `
  <main>
    <div v-if="loading" class="loader-overlay">
      <div class="loader">Cargando...</div>
    </div>

    <section class="gallery">
      <div class="boda">
        <div class="containera">
          <div class="row">
            <div class="col-md-4" v-for="funcion in funciones" :key="funcion.id">
              <div class="carda">
                <img :src="funcion.imagen" :alt="funcion.titulo" class="card-img-top"
                  @click="showFunctionDetails(funcion)" />
                <button @click="agregarAlCarrito(funcion)"
                  class="btn btn-outline-warning btn-comprar">COMPRAR</button>
                <div class="intro">
                  <h1 class="card-title">{{ funcion.titulo }}</h1>
                  <p>{{ funcion.fecha }} - {{ funcion.hora }}</p>
                  <p>Grupo: {{ funcion.grupo.nombre }}</p>
                  <p>Productor: {{ funcion.productor.nombre }}</p>
                  <p>Precio: {{ funcion.precio }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  `,
};
