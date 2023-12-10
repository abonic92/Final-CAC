// Ventas.js
export default {
    data() {
      return {
        ventas: [],
        ventaAEditar: { funcion_id: 0, productor_id: 0, grupo_id: 0, usuario_id: 0, fecha_venta: '', hora_venta: '', monto: 0 },
        nuevaVenta: { funcion_id: 0, productor_id: 0, grupo_id: 0, usuario_id: 0, fecha_venta: '', hora_venta: '', monto: 0 },
      };
    },
    mounted() {
      this.cargarVentas();
    },
    methods: {
      logout() {
        alert("Sesión expirada");
        clearInterval(this.tokenCheckInterval);
        localStorage.removeItem("access_token");
        window.location.href = "/index.html";
      },
      abrirModalAgregar() {
        this.nuevaVenta = { funcion_id: 0, productor_id: 0, grupo_id: 0, usuario_id: 0, fecha_venta: '', hora_venta: '', monto: 0 };
        $('#agregarVentaModal').modal('show');
      },
      async agregarVenta() {
        try {
          const token = localStorage.getItem('access_token');
          const headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          });
          const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(this.nuevaVenta),
            redirect: 'follow',
          };
          const response = await fetch('https://gcandia1992.pythonanywhere.com/dashboard/ventas', requestOptions);
          if (!response.ok) {
            this.logout();
          }
          console.log('Venta agregada exitosamente');
          this.cargarVentas(); // Recargar la lista
          $('#agregarVentaModal').modal('hide');
        } catch (error) {
          console.error('Error al agregar la venta:', error);
          this.logout();
        }
      },
      async cargarVentas() {
        try {
          const token = localStorage.getItem("access_token");
          const headers = new Headers();
          headers.append("Authorization", `Bearer ${token}`);
          const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow",
          };
          const response = await fetch("https://gcandia1992.pythonanywhere.com/dashboard/ventas", requestOptions);
          if (!response.ok) {
            throw new Error(`Error al cargar datos de ventas. Código: ${response}`);
          }
          const data = await response.json();
          this.ventas = data.ventas;
        } catch (error) {
          alert("Error al cargar datos de ventas:", error);
        }
      },
      async editarVenta(venta) {
        try {
          const idVenta = venta.id;
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
            body: JSON.stringify(venta),
            redirect: 'follow',
          };
          const api = `https://gcandia1992.pythonanywhere.com/dashboard/ventas/${idVenta}`;
          const response = await fetch(api, requestOptions);
          if (!response.ok) {
            throw new Error(`Error al editar la venta. Código: ${response.status}`);
          }
          console.log('Venta editada exitosamente');
          this.cargarVentas();
        } catch (error) {
          console.error('Error al editar la venta:', error);
          this.logout();
        }
      },
      editarVentaAbrirModal(venta) {
        this.ventaAEditar = { ...venta };
        $('#editarVentaModal').modal('show');
      },
      async eliminarVenta(venta) {
        try {
          const idVenta = venta.id;
          const token = localStorage.getItem('access_token');
          const headers = new Headers();
          headers.append("Authorization", `Bearer ${token}`);
          const requestOptions = {
            method: "DELETE",
            headers: headers,
            redirect: "follow",
          };
          const response = await fetch(`https://gcandia1992.pythonanywhere.com/dashboard/ventas/${idVenta}`, requestOptions);
          if (!response.ok) {
            throw new Error(`Error al eliminar la venta. Código: ${response.status}`);
          }
          console.log('Venta eliminada exitosamente');
          this.cargarVentas();
        } catch (error) {
          alert('Error al eliminar la venta:', error);
          this.logout();
        }
      },
      eliminarVentaAbrirModal(venta) {
        this.ventaAEliminar = venta;
        if (confirm('¿Estás seguro de que deseas eliminar esta venta?')) {
          this.eliminarVenta(this.ventaAEliminar);
        }
      },
      guardarCambios() {
        const venta = this.ventaAEditar;
        this.editarVenta(venta);
        $('#editarVentaModal').modal('hide');
      },
    },
    template: `
    <!-- Estructura del componente similar a la de Grupos.js -->
    <div class="container-fluid">
      <!-- Page Heading -->
      <h1 class="h3 mb-4 text-gray-800">Administración de ventas</h1>
  
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
                  <th>Función</th>
                  <th>Productor</th>
                  <th>Grupo</th>
                  <th>Usuario</th>
                  <th>Fecha Venta</th>
                  <th>Hora Venta</th>
                  <th>Monto</th>

                </tr>
              </thead>
            
              <tbody>
                <tr v-for="venta in ventas" :key="venta.id">
                  <td>{{ venta.id }}</td>
                  <td>{{ venta.funcion.titulo }}</td>
                  <td>{{ venta.productor.nombre }}</td>
                  <td>{{ venta.grupo.nombre }}</td>
                  <td>{{ venta.usuario.email }}</td>
                  <td>{{ venta.fecha_venta }}</td>
                  <td>{{ venta.hora_venta }}</td>
                  <td>{{ venta.monto }}</td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Modal de edición -->
      <div class="modal" id="editarVentaModal" tabindex="-1" role="dialog">
        <!-- Contenido del modal de edición -->
      </div>
  
      <!-- Modal de agregar -->
      <div class="modal" id="agregarVentaModal" tabindex="-1" role="dialog">
        <!-- Contenido del modal de agregar -->
      </div>
    </div>
    `,
};
