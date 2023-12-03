// Productores.js
export default {
    data() {
        return {
            productores: [],
            productorAEditar: { nombre: '' },
        };
    },
    mounted() {
        this.cargarProductores();
    },
    methods: {
        async cargarProductores() {
            try {
                const token = localStorage.getItem("access_token");
        
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${token}`);
        
                const requestOptions = {
                    method: "GET",
                    headers: headers,
                    redirect: "follow",
                };
        
                const response = await fetch("https://gcandia1992.pythonanywhere.com/productores", requestOptions);
        
                if (!response.ok) {
                    throw new Error(`Error al cargar datos de productores. Código: ${response.status}`);
                }
        
                const data = await response.json();
                this.productores = data.productores;
            } catch (error) {
                console.error("Error al cargar datos de productores:", error);
            }
        },
        async editarProductor(productor) {
            try {
                const idProductor = productor.id;
                const token = localStorage.getItem('access_token');
        
                if (!token) {
                    console.error('Token de acceso no encontrado');
                    return;
                }
        
                const headers = new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
        
                const requestOptions = {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(productor),
                    redirect: 'follow',
                };
        
                const response = await fetch(`https://gcandia1992.pythonanywhere.com/dashboard/productores/${idProductor}`, requestOptions);
        
                if (!response.ok) {
                    throw new Error(`Error al editar el productor. Código: ${response.status}`);
                }
        
                console.log('Productor editado exitosamente');
                // Puedes realizar acciones adicionales después de la edición si es necesario
            } catch (error) {
                console.error('Error al editar el productor:', error);
            }
        },
        // Nuevo método para abrir el modal de edición
        editarProductorAbrirModal(productor) {
            // Puedes almacenar temporalmente el productor que se editará
            this.productorAEditar = { ...productor }; // Clonar el objeto para evitar modificar directamente el productor en la lista

            // Abrir el modal de edición
            $('#editarProductorModal').modal('show');
        },
        async eliminarProductor(productor) {
            try {
                const idProductor = productor.id;
                const token = localStorage.getItem('access_token');
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${token}`);

                const requestOptions = {
                    method: "DELETE",
                    headers: headers,
                    redirect: "follow",
                };

                const response = await fetch(`https://gcandia1992.pythonanywhere.com/dashboard/productores/${idProductor}`, requestOptions);

                if (!response.ok) {
                    throw new Error(`Error al eliminar el productor. Código: ${response.status}`);
                }

                console.log('Productor eliminado exitosamente');
                // Puedes realizar acciones adicionales después de la eliminación si es necesario
                this.cargarProductores();  // Recargar la lista de productores
            } catch (error) {
                console.error('Error al eliminar el productor:', error);
            }
        },

        // Nuevo método para abrir el modal de confirmación
        eliminarProductorAbrirModal(productor) {
            // Puedes almacenar temporalmente el productor que se eliminará
            this.productorAEliminar = productor;

            // Abre el modal de confirmación de Bootstrap directamente
            if (confirm('¿Estás seguro de que deseas eliminar este productor?')) {
                // Si el usuario hace clic en "Aceptar", llama al método para eliminar
                this.eliminarProductor(this.productorAEliminar);
            }
        },
        guardarCambios() {
            // Lógica para guardar los cambios después de la edición
            const productor = this.productorAEditar;
    
            // Realiza la solicitud de edición utilizando la función editarProductor existente
            this.editarProductor(productor);
    
            // Cierra el modal después de guardar los cambios
            $('#editarProductorModal').modal('hide');
        },
    },

    template: `
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
            </div>
            
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                                            
                        <tbody>
                            <tr v-for="productor in productores" :key="productor.id">
                                <td>{{ productor.id }}</td>
                                <td>{{ productor.nombre }}</td>
                                <td>
                                    <a @click="editarProductorAbrirModal(productor)" class="btn-sm btn-primary" href="#" role="button">Editar</a>
                                    <a @click="eliminarProductorAbrirModal(productor)" class="btn-sm btn-danger" href="#" role="button">Eliminar</a>
                                </td>
                            </tr>
                        <tbody>
                    </table>
                </div>
            </div>

            <!-- Modal de edición -->
            <div class="modal" id="editarProductorModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editar Productor</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- Contenido del formulario de edición -->
                            <label for="nombre">Nombre:</label>
                            <input v-model="productorAEditar.nombre" type="text" required />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" @click="guardarCambios">Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `,
};