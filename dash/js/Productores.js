// Productores.js
export default {
    data() {
        return {
            productores: [],
            productorAEditar: { nombre: '' },
            nuevoProductor: { nombre: '' },
        };
    },
    mounted() {
        this.cargarProductores();
    },
    methods: {
        logout() {
            alert("Sesión expirada")
            clearInterval(this.tokenCheckInterval); 
            localStorage.removeItem("access_token"); 
            window.location.href = "/index.html"; 
          },
        abrirModalAgregar() {
            this.nuevoProductor = { nombre: '' };
            $('#agregarProductorModal').modal('show');
        },
        async agregarProductor() {
            try {
                const token = localStorage.getItem('access_token');
                const headers = new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(this.nuevoProductor),
                    redirect: 'follow',
                };
                const response = await fetch('https://gcandia1992.pythonanywhere.com/dashboard/productores', requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al agregar el productor. Código: ${response.status}`);
                }
                console.log('Productor agregado exitosamente');
                this.cargarProductores(); 
                $('#agregarProductorModal').modal('hide');
            } catch (error) {
                console.error('Error al agregar el productor:', error);
                this.logout();
            }
        },
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
                this.logout();
            }
        },
        async editarProductor(productor) {
            try {
                const idProductor = productor.id;
                const token = localStorage.getItem('access_token');
                console.log('Pre Token:', token);
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
                const api = `https://gcandia1992.pythonanywhere.com/dashboard/productores/${idProductor}`
                const response = await fetch(api, requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al editar el productor. Código: ${response.status}`);
                }
                console.log('Productor editado exitosamente');
                this.cargarProductores() 
            } catch (error) {
                console.error('Error al editar el productor:', error);
                this.logout();
            }
        },
        editarProductorAbrirModal(productor) {
            this.productorAEditar = { ...productor }; 
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
                this.cargarProductores();  
            } catch (error) {
                console.error('Error al eliminar el productor:', error);
                this.logout();
            }
        },
        eliminarProductorAbrirModal(productor) {
            this.productorAEliminar = productor;
            if (confirm('¿Estás seguro de que deseas eliminar este productor?')) {
                this.eliminarProductor(this.productorAEliminar);
            }
        },
        guardarCambios() {
            const productor = this.productorAEditar;
            this.editarProductor(productor);
            $('#editarProductorModal').modal('hide');
        },
    },

    template: `
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- Page Heading -->
        <h1 class="h3 mb-4 text-gray-800">Administración de productores</h1>

        <!-- Botón para abrir el modal de agregar -->
        <button type="button" class="btn btn-success" @click="abrirModalAgregar">Agregar Productor</button><br><br>

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
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                                            
                        <tbody>
                            <tr v-for="productor in productores" :key="productor.id">
                                <td>{{ productor.id }}</td>
                                <td>{{ productor.nombre }}</td>
                                <td>
                                    <a @click="editarProductorAbrirModal(productor)" class="btn-sm btn-primary" href="#" role="button">
                                        <i class="fas fa-fw fa-edit"></i>
                                    </a>
                                </td>
                                <td>
                                    <a @click="eliminarProductorAbrirModal(productor)" class="btn-sm btn-danger" href="#" role="button">
                                        <i class="fas fa-fw fa-trash-alt"></i>
                                    </a>
                                </td>
                            </tr>
                        <tbody>
                    </table>
                </div>
            </div>
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
                    <form>
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input v-model="productorAEditar.nombre" type="text" class="form-control" required />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="guardarCambios">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Modal de agregar -->
    <div class="modal" id="agregarProductorModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agregar Productor</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Contenido del formulario de agregar -->
                    <form>
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input v-model="nuevoProductor.nombre" type="text" class="form-control" required />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="agregarProductor">Agregar Productor</button>
                </div>
            </div>
        </div>
    </div>    
    `,
};