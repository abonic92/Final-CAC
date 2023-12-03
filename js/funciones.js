const app = Vue.createApp({
  data() {
    return {
      funciones: [],
    };
  },
  mounted() {
    this.fetchFunctions();
  },
  methods: {
    async fetchFunctions() {
      try {
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
        this.funciones = data.funciones;
      } catch (error) {
        console.error("Error al cargar datos de funciones:", error);
      }
    },
    showFunctionDetails(funcion) {
      // Lógica para mostrar detalles de la función, si es necesario
      console.log("Detalles de la función:", funcion);
    },
  },
});

app.mount("#app");
