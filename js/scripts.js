
document.addEventListener("DOMContentLoaded", function () {
    const app = Vue.createApp({
        data() {
            return {
                eventos: [],
            };
        },
        methods: {
            loadEventos() {
                const apiUrl = "https://picsum.photos/v2/list?page=3"; // Reemplaza con la URL de tu API

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        this.eventos = data;
                    })
                    .catch(error => {
                        console.error("Error al cargar eventos:", error);
                    });
            },
        },
        mounted() {
            this.loadEventos();
        },
    });

    app.mount("#app");
});