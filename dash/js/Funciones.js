// Funciones.js
export default {
    data() {
        return {
            funciones: [],
            funcionAEditar: { titulo: '', fecha: '', hora: '', imagen: '', grupo_id: 0, productor_id: 0, grupo_nombre: '', productor_nombre: '', },
            nuevaFuncion: { titulo: '', fecha: '', hora: '', imagen: '', grupo_id: 0, productor_id: 0 },

        };
    },
    mounted() {
        this.cargarFunciones();
        this.cargarGrupos();  
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
            this.nuevaFuncion = { titulo: '', fecha: '', hora: '', imagen: '', grupo_id: 0, productor_id: 0 };
            $('#agregarFuncionModal').modal('show');
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
                alert("Error al cargar datos de productores:", error);
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
                alert("Error al cargar datos de grupos:", error);
            }
        },
        async agregarFuncion() {
            try {
                const token = localStorage.getItem('access_token');
                const headers = new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(this.nuevaFuncion),
                    redirect: 'follow',
                };
                const response = await fetch('https://gcandia1992.pythonanywhere.com/dashboard/funciones/crear', requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al agregar la función. Código: ${response.status}`);
                }
                console.log('Función agregada exitosamente');
                this.cargarFunciones();
                $('#agregarFuncionModal').modal('hide');
            } catch (error) {
                console.error('Error al agregar la función:', error);
                this.logout();
            }
        },
        async cargarFunciones() {
            try {
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
                this.funciones = data.funciones;
            } catch (error) {
                alert("Error al cargar datos de funciones:", error);
            }
        },
        async editarFuncion(funcion) {
            try {
                const idFuncion = funcion.id;
                const token = localStorage.getItem('access_token');
                if (!token) {
                    console.error('Token de acceso no encontrado');
                    return;
                }
                const funcionEditada = {
                    titulo: funcion.titulo,
                    fecha: funcion.fecha,
                    hora: funcion.hora,
                    imagen: funcion.imagen,
                    grupo_id: funcion.grupo.id, 
                    productor_id: funcion.productor.id,
                };
                const headers = new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
                const requestOptions = {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(funcionEditada),
                    redirect: 'follow',
                };
                const api = `https://gcandia1992.pythonanywhere.com/dashboard/funciones/${idFuncion}`;
                const response = await fetch(api, requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al editar la función. Código: ${response.status}`);
                }
                console.log('Función editada exitosamente');
                this.cargarFunciones();
            } catch (error) {
                console.error('Error al editar la función:', error);
                this.logout();
            }
        },
        async eliminarFuncion(funcion) {
            try {
                const idFuncion = funcion.id;
                const token = localStorage.getItem('access_token');
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${token}`);
                const requestOptions = {
                    method: "DELETE",
                    headers: headers,
                    redirect: "follow",
                };
                const response = await fetch(`https://gcandia1992.pythonanywhere.com/dashboard/funciones/${idFuncion}`, requestOptions);
                if (!response.ok) {
                    throw new Error(`Error al eliminar la función. Código: ${response.status}`);
                }
                console.log('Función eliminada exitosamente');
                this.cargarFunciones();
            } catch (error) {
                console.error('Error al eliminar la función:', error);
                this.logout();
            }
        },
        guardarCambios() {
            const funcion = this.funcionAEditar;
            this.editarFuncion(funcion);
            $('#editarFuncionModal').modal('hide');
        },
        editarFuncionAbrirModal(funcion) {
            this.funcionAEditar = {
                ...funcion,
                grupo_nombre: funcion.grupo.nombre,
                productor_nombre: funcion.productor.nombre,
            };
            $('#editarFuncionModal').modal('show');
        },
        eliminarFuncionAbrirModal(funcion) {
            this.funcionAEliminar = funcion;
            if (confirm('¿Estás seguro de que deseas eliminar esta función?')) {
                this.eliminarFuncion(this.funcionAEliminar);
            }
        },
    },
    template: `
        <div class="container-fluid">
            <h1 class="h3 mb-4 text-gray-800">Administración de funciones</h1>

            <button type="button" class="btn btn-success" @click="abrirModalAgregar">Agregar Función</button><br><br>

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
                                    <th>Título</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Grupo</th>
                                    <th>Productor</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                                                
                            <tbody>
                                <tr v-for="funcion in funciones" :key="funcion.id">
                                    <td>{{ funcion.id }}</td>
                                    <td>{{ funcion.titulo }}</td>
                                    <td>{{ funcion.fecha }}</td>
                                    <td>{{ funcion.hora }}</td>
                                    <td>{{ funcion.grupo.nombre }}</td> <!-- Nueva columna para el nombre del grupo -->
                                    <td>{{ funcion.productor.nombre }}</td> <!-- Nueva columna para el nombre del productor -->
                                    <td>
                                        <a @click="editarFuncionAbrirModal(funcion)" class="btn-sm btn-primary" href="#" role="button">
                                            <i class="fas fa-fw fa-edit"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <a @click="eliminarFuncionAbrirModal(funcion)" class="btn-sm btn-danger" href="#" role="button">
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
        <div class="modal" id="editarFuncionModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Función</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Contenido del formulario de edición -->
                        <div class="form-group">
                            <label for="titulo">Título:</label>
                            <input v-model="funcionAEditar.titulo" type="text" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="fecha">Fecha:</label>
                            <input v-model="funcionAEditar.fecha" type="date" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="hora">Hora:</label>
                            <input v-model="funcionAEditar.hora" type="time" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="imagen">Imagen URL:</label>
                            <input v-model="funcionAEditar.imagen" type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="grupo_id">Grupo:</label>
                            <input v-model="funcionAEditar.grupo_nombre" type="text" class="form-control" disabled />
                        </div>
                        <div class="form-group">
                            <label for="productor_id">Productor:</label>
                            <input v-model="funcionAEditar.productor_nombre" type="text" class="form-control" disabled />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="guardarCambios">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Modal de agregar -->
        <div class="modal" id="agregarFuncionModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Agregar Función</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Contenido del formulario de agregar -->
                        <form>
                            <div class="form-group">
                                <label for="titulo">Título:</label>
                                <input v-model="nuevaFuncion.titulo" type="text" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="fecha">Fecha:</label>
                                <input v-model="nuevaFuncion.fecha" type="date" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="hora">Hora:</label>
                                <input v-model="nuevaFuncion.hora" type="time" class="form-control" required />
                            </div>
                            <div class="form-group">
                                <label for="imagen">Imagen URL:</label>
                                <input v-model="nuevaFuncion.imagen" type="text" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="grupo_id">Grupo:</label>
                                <select v-model="nuevaFuncion.grupo_id" class="form-control">
                                    <option v-for="grupo in grupos" :key="grupo.id" :value="grupo.id">{{ grupo.nombre }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="productor_id">Productor:</label>
                                <select v-model="nuevaFuncion.productor_id" class="form-control">
                                    <option v-for="productor in productores" :key="productor.id" :value="productor.id">{{ productor.nombre }}</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="agregarFuncion">Agregar Función</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    `,
};
