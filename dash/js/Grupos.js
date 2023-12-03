// Grupos.js
export default {
    data() {
        return {
            grupos: [],
            grupoAEditar: { nombre: '', integrantes: 0 },
            nuevoGrupo: { nombre: '', integrantes: 0 },
        };
    },
    mounted() {
        this.cargarGrupos();
    },
    methods: {
        logout() {
            alert("Sesión expirada")
            clearInterval(this.tokenCheckInterval); 
            localStorage.removeItem("access_token"); 
            window.location.href = "/index.html"; 
          },
        abrirModalAgregar() {
            this.nuevoGrupo = { nombre: '', integrantes: 0 };
            $('#agregarGrupoModal').modal('show');
        },
        async agregarGrupo() {
            try {
                const token = localStorage.getItem('access_token');
                const headers = new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(this.nuevoGrupo),
                    redirect: 'follow',
                };
                const response = await fetch('https://gcandia1992.pythonanywhere.com/dashboard/grupos', requestOptions);
                if (!response.ok) {
                    this.logout();
                }
                console.log('Grupo agregado exitosamente');
                this.cargarGrupos(); // Recargar la lista
                $('#agregarGrupoModal').modal('hide');
            } catch (error) {
                console.error('Error al agregar el grupo:', error);
                this.logout();
            }
        },
        async cargarGrupos() {
            try {
                const token = localStorage.getItem("access_token");
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${token}`);
                const requestOptions = {
                    method: "GET",
                    headers: headers,
                    redirect: "follow",
                };
                const response = await fetch("https://gcandia1992.pythonanywhere.com/grupos", requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al cargar datos de grupos. Código: ${response.status}`);
                }
                const data = await response.json();
                this.grupos = data.grupos;
            } catch (error) {
                Alert("Error al cargar datos de grupos:", error);
            }
        },
        async editarGrupo(grupo) {
            try {
                const idGrupo = grupo.id;
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
                    body: JSON.stringify(grupo),
                    redirect: 'follow',
                };
                const api = `https://gcandia1992.pythonanywhere.com/dashboard/grupos/${idGrupo}`
                const response = await fetch(api, requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al editar el grupo. Código: ${response.status}`);
                }
                console.log('Grupo editado exitosamente');
                this.cargarGrupos();
            } catch (error) {
                console.error('Error al editar el grupo:', error);
                this.logout();
            }
        },
        editarGrupoAbrirModal(grupo) {
            this.grupoAEditar = { ...grupo }; 
            $('#editarGrupoModal').modal('show');
        },
        async eliminarGrupo(grupo) {
            try {
                const idGrupo = grupo.id;
                const token = localStorage.getItem('access_token');
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${token}`);
                const requestOptions = {
                    method: "DELETE",
                    headers: headers,
                    redirect: "follow",
                };
                const response = await fetch(`https://gcandia1992.pythonanywhere.com/dashboard/grupos/${idGrupo}`, requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al eliminar el grupo. Código: ${response.status}`);
                }
                console.log('Grupo eliminado exitosamente');
                this.cargarGrupos();  
            } catch (error) {
                alert('Error al eliminar el grupo:', error);
                this.logout();
            }
        },
        eliminarGrupoAbrirModal(grupo) {
            this.grupoAEliminar = grupo;
            if (confirm('¿Estás seguro de que deseas eliminar este grupo?')) {
                this.eliminarGrupo(this.grupoAEliminar);
            }
        },
        guardarCambios() {
            const grupo = this.grupoAEditar;
            this.editarGrupo(grupo);
            $('#editarGrupoModal').modal('hide');
        },
    },

    template: `
        <!-- Begin Page Content -->
        <div class="container-fluid">
            <!-- Page Heading -->
            <h1 class="h3 mb-4 text-gray-800">Administración de grupos</h1>

            <!-- Botón para abrir el modal de agregar -->
            <button type="button" class="btn btn-success" @click="abrirModalAgregar">Agregar Grupo</button><br><br>

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
                                    <th>Integrantes</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                                                
                            <tbody>
                                <tr v-for="grupo in grupos" :key="grupo.id">
                                    <td>{{ grupo.id }}</td>
                                    <td>{{ grupo.nombre }}</td>
                                    <td>{{ grupo.integrantes }}</td>
                                    <td>
                                        <a @click="editarGrupoAbrirModal(grupo)" class="btn-sm btn-primary" href="#" role="button">
                                            <i class="fas fa-fw fa-edit"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <a @click="eliminarGrupoAbrirModal(grupo)" class="btn-sm btn-danger" href="#" role="button">
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
        <div class="modal" id="editarGrupoModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Grupo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Contenido del formulario de edición -->
                        <form>
                            <div class="form-group">
                                <label for="nombre">Nombre:</label>
                                <input v-model="grupoAEditar.nombre" type="text" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="integrantes">Integrantes:</label>
                                <input v-model="grupoAEditar.integrantes" type="number" class="form-control" required />
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
        <div class="modal" id="agregarGrupoModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Agregar Grupo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Contenido del formulario de agregar -->
                        <form>
                            <div class="form-group">
                                <label for="nombre">Nombre:</label>
                                <input v-model="nuevoGrupo.nombre" type="text" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="integrantes">Integrantes:</label>
                                <input v-model="nuevoGrupo.integrantes" type="number" class="form-control" required />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="agregarGrupo">Agregar Grupo</button>
                    </div>
                </div>
            </div>
        </div>

    `,
};
