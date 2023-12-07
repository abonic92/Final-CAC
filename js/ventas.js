const app = Vue.createApp({
    data() {
      return {
        funciones: [],
        cart: [],
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
      showFunctionDetails(funcion) {
        // Lógica para mostrar detalles de la función, si es necesario
        console.log("Detalles de la función:", funcion);
      },
      addToCart(funcion) {
        // Lógica para agregar al carrito
        const cartItem = this.cart.find(item => item.id === funcion.id);
  
        if (cartItem) {
          cartItem.quantity++;
        } else {
          this.cart.push({
            id: funcion.id,
            titulo: funcion.titulo,
            quantity: 1,
          });
        }
      },
      decreaseQuantity(funcion) {
        // Lógica para disminuir la cantidad en el carrito
        const cartItem = this.cart.find(item => item.id === funcion.id);
  
        if (cartItem && cartItem.quantity > 0) {
          cartItem.quantity--;
        }
      },
      increaseQuantity(funcion) {
        // Lógica para aumentar la cantidad en el carrito
        const cartItem = this.cart.find(item => item.id === funcion.id);
  
        if (cartItem) {
          cartItem.quantity++;
        }
      },
      getCartItemQuantity(funcion) {
        // Función para obtener la cantidad de un artículo en el carrito
        const cartItem = this.cart.find(item => item.id === funcion.id);
        return cartItem ? cartItem.quantity : 0;
      },
    },
  });
  
  app.mount("#app");
  