// script.js

const app = Vue.createApp({
    data() {
      return {
        functions: [],
      };
    },
    mounted() {
      this.fetchFunctions();
    },
    methods: {
      async fetchFunctions() {
        try {
          const response = await fetch('https://picsum.photos/v2/list?page=3');
          const functionsData = await response.json();
          this.functions = functionsData.map((functionInfo) => ({
            id: functionInfo.id,
            author: functionInfo.author,
            download_url: functionInfo.download_url,
            description: 'Agregar descripción aquí', // Puedes agregar más detalles según tu necesidad
          }));
        } catch (error) {
          console.error('Error fetching functions:', error);
        }
      },
      showFunctionDetails(functionInfo) {
        // Lógica para mostrar detalles de la función, si es necesario
        console.log('Detalles de la función:', functionInfo);
      },
    },
  });
  
  app.mount('#app');
  