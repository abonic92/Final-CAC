// Usuarios.js
export default {
    data() {
        return {
            usuarios: [],
            usuarioAEditar: { nombre: '', apellido: '', email: ''},
            nuevoUsuario: { nombre: '', apellido: '', email: '', password: '' },
        };
    },
    mounted() {
        this.cargarUsuarios();
    },
    methods: {
        logout() {
            alert("Sesión expirada");
            clearInterval(this.tokenCheckInterval);
            localStorage.removeItem("access_token");
            window.location.href = "/index.html";
        },
        abrirModalAgregar() {
            this.nuevoUsuario = { nombre: '', apellido: '', email: '', password: '' };
            $('#agregarUsuarioModal').modal('show');
        },
        async agregarUsuario() {
            try {
                const token = localStorage.getItem('access_token');
                const headers = new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(this.nuevoUsuario),
                    redirect: 'follow',
                };
                const response = await fetch("https://gcandia1992.pythonanywhere.com/dashboard/usuarios", requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al agregar el usuario. Código: ${response.status}`);
                }
                console.log('Usuario agregado exitosamente');
                this.cargarUsuarios();
                $('#agregarUsuarioModal').modal('hide');
            } catch (error) {
                console.error('Error al agregar el usuario:', error);
                this.logout();
            }
        },
        async cargarUsuarios() {
            try {
                const token = localStorage.getItem("access_token");
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${token}`);
                const requestOptions = {
                    method: "GET",
                    headers: headers,
                    redirect: "follow",
                };
                const response = await fetch("https://gcandia1992.pythonanywhere.com/dashboard/usuarios", requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al cargar datos de usuarios. Código: ${response.status}`);
                }
                const data = await response.json();
                this.usuarios = data.usuarios;
            } catch (error) {
                console.error("Error al cargar datos de usuarios:", error);
                this.logout();
            }
        },
        async editarUsuario(usuario) {
            try {
                const idUsuario = usuario.id;
                const token = localStorage.getItem('access_token');
                if (!token) {
                    console.error('Token de acceso no encontrado');
                    return;
                }
        
                const usuarioEditado = {
                    ...usuario,
                };
        
                const headers = new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
        
                const requestOptions = {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(usuarioEditado),
                    redirect: 'follow',
                };
        
                const api = `https://gcandia1992.pythonanywhere.com/dashboard/usuarios/${idUsuario}`;

                const response = await fetch(api, requestOptions);
        
                if (!response.ok) {
                    throw new Error(`Error al editar el usuario. Código: ${response.status}`);
                }
        
                console.log('Usuario editado exitosamente');
                this.cargarUsuarios();
            } catch (error) {
                this.logout();
            }
        },
        editarUsuarioAbrirModal(usuario) {
            this.usuarioAEditar = JSON.parse(JSON.stringify(usuario));
            $('#editarUsuarioModal').modal('show');
        },
        async eliminarUsuario(usuario) {
            try {
                const idUsuario = usuario.id;
                const token = localStorage.getItem('access_token');
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${token}`);
                const requestOptions = {
                    method: "DELETE",
                    headers: headers,
                    redirect: "follow",
                };
                const response = await fetch(`https://gcandia1992.pythonanywhere.com/dashboard/usuarios/${idUsuario}`, requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al eliminar el usuario. Código: ${response.status}`);
                }
                console.log('Usuario eliminado exitosamente');
                this.cargarUsuarios();
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                this.logout();
            }
        },
        eliminarUsuarioAbrirModal(usuario) {
            if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                this.eliminarUsuario(usuario);
            }
        },
        guardarCambios() {
            const usuario = this.usuarioAEditar;
            this.editarUsuario(usuario);
            $('#editarUsuarioModal').modal('hide');
        },
    },

    template: `
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- Page Heading -->
        <h1 class="h3 mb-4 text-gray-800">Administración de usuarios</h1>

        <!-- Botón para abrir el modal de agregar -->
        <button type="button" class="btn btn-success" @click="abrirModalAgregar">Agregar Usuario</button><br><br>

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
                                <th>Apellido</th>
                                <th>Rol</th>
                                <th>Email</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="usuario in usuarios" :key="usuario.id">
                                <td>{{ usuario.id }}</td>
                                <td>{{ usuario.nombre }}</td>
                                <td>{{ usuario.apellido }}</td>
                                <td>{{ usuario.roles[0].name }}</td>
                                <td>{{ usuario.email }}</td>
                                <td>
                                    <a @click="editarUsuarioAbrirModal(usuario)" class="btn-sm btn-primary" href="#" role="button">
                                        <i class="fas fa-fw fa-edit"></i>
                                    </a>
                                </td>
                                <td>
                                    <a @click="eliminarUsuarioAbrirModal(usuario)" class="btn-sm btn-danger" href="#" role="button">
                                        <i class="fas fa-fw fa-trash-alt"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de edición -->
    <div class="modal" id="editarUsuarioModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Contenido del formulario de edición -->
                    <form>
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input v-model="usuarioAEditar.nombre" type="text" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="apellido">Apellido:</label>
                            <input v-model="usuarioAEditar.apellido" type="text" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input v-model="usuarioAEditar.email" type="email" class="form-control" required />
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
    <div class="modal" id="agregarUsuarioModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agregar Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Contenido del formulario de agregar -->
                    <form>
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input v-model="nuevoUsuario.nombre" type="text" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="apellido">Apellido:</label>
                            <input v-model="nuevoUsuario.apellido" type="text" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input v-model="nuevoUsuario.email" type="email" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña:</label>
                            <input v-model="nuevoUsuario.password" type="password" class="form-control" required />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="agregarUsuario">Agregar Usuario</button>
                </div>
            </div>
        </div>
    </div>
    `,
};

