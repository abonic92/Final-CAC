import EventBus from './event-bus.js';

export default {
  data() {
    return {
        carrito: [],
        carritoVacio: true,    
    };
  },
  mounted() {
    // Verificar si hay un token de acceso almacenado
    const token = localStorage.getItem("access_token");
    const rolUsuario = localStorage.getItem("user_roles");
    if (!token) {
      localStorage.removeItem("access_token"); 
      localStorage.removeItem("user_roles"); 
      window.location.href = "/sesion.html"; 

    } else {
      // Obtener la fecha de expiración del token del almacenamiento local
      this.tokenExpiration = new Date(localStorage.getItem('tokenExpiration'));

      // Configurar un temporizador para verificar la expiración del token cada 5 minutos
      this.tokenCheckInterval = setInterval(() => {
        this.checkTokenExpiration();
      }, 300000);

    }

    // Recuperar el carrito almacenado localmente
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el carrito está vacío
    this.carritoVacio = carrito.length === 0;

    // Asignar el carrito a la propiedad del componente
    this.carrito = carrito;
  },
  computed: {
    totalGeneral() {
      // Calcular el total sumando los subtotales de cada ítem en el carrito
      return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    },
  },
  methods:{
    restarCantidad(index) {
        // Restar la cantidad del ítem en el carrito
        this.carrito[index].cantidad--;

        // Verificar si la cantidad llegó a 0 y eliminar del carrito
        if (this.carrito[index].cantidad === 0) {
            this.eliminarDelCarrito(index);
        } else {
            // Guardar el carrito actualizado localmente
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
        }
        EventBus.$emit('cantidadMenosCarrito');

    },
    logout() {
        alert("Sesión expirada")
        clearInterval(this.tokenCheckInterval); 
        localStorage.removeItem("access_token"); 
        window.location.href = "/index.html"; 
      },
    sumarCantidad(index) {
        this.carrito[index].cantidad++;
        // Actualizar el carrito localmente
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        EventBus.$emit('carritoActualizado');

        },
    eliminarDelCarrito(index) {
        this.carrito.splice(index, 1);
        // Actualizar el carrito localmente
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    },
    async finalizarCompra() {
        // Obtén la fecha y hora actuales
        const fechaActual = new Date().toISOString().split('T')[0];
        const horaActual = new Date().toLocaleTimeString();
    
        // Recorre el carrito y realiza una llamada a la API por cada función
        for (const item of this.carrito) {
  
            const venta = {
                funcion_id: item.id, // Reemplaza con la propiedad correcta de tu objeto de función
                productor_id: item.productor.id, // Reemplaza con la propiedad correcta de tu objeto de función
                grupo_id: item.grupo.id, // Reemplaza con la propiedad correcta de tu objeto de función
                fecha_venta: fechaActual,
                hora_venta: horaActual,
                monto: item.precio * item.cantidad, // Monto total para esta función en el carrito
            };
    
            try {
                const token = localStorage.getItem('access_token');
                const headers = new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                });
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(venta),
                    redirect: 'follow',
                };
    
                const response = await fetch('https://gcandia1992.pythonanywhere.com/ventas', requestOptions);

                if (!response.ok) {
                    throw new Error(`Error al registrar la venta. Código: ${response.status}`);
                    this.logout();
                }
    
                const data = await response.json();
                this.carrito = []; 
                localStorage.removeItem('carrito');                
                window.location.href = '/gracias.html';

            } catch (error) {
                console.error(error);
                this.logout();
            }
        }

    },
  },
  template: `
  
  <div class="cuerpo">
        <h2 class="container23">Carrito de Compras</h2>
          <section class="carrito">

            <div v-if="carritoVacio" class="boda">
                <div class="row justify-content-center">
                    <div class="card text-center bg-black text-white">
                    <img class="card-img-top"  src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" alt="Title" />
                    <div class="card-body">
                        <h4 class="card-title">Lo sentimos</h4>
                        <p class="card-text">Parece que aún no has agregado ninguna función al carrito</p>
                    </div>
                    </div>
                </div>
            </div>

              <div v-else class="table-container">
              
                    

                  <table class="table table-dark table-hover">
                      <thead>
                          <tr>
                              <th>Imagen</th>
                              <th>Funcion</th>
                              <th>Precio Unitario</th>
                              <th>Cantidad</th>
                              <th>Subtotal</th>
                              <th>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                    <tr v-for="(item, index) in carrito" :key="index">
                        <td><img :src="item.imagen" alt="" class="image"></td>
                        <td>{{ item.titulo }}</td>
                        <td>{{ item.precio }}</td>
                        <td>{{ item.cantidad }}</td>
                        <td>{{ item.precio * item.cantidad }}</td>
                        <td>

                        <button
                        type="button"
                        class="btn btn-outline-warning"
                        data-bs-toggle="button"
                        aria-pressed="false"
                        autocomplete="off"
                        @click="restarCantidad(index)"
                        >-</button>
                        &nbsp;
                        <button
                        type="button"
                        class="btn btn-outline-primary"
                        data-bs-toggle="button"
                        aria-pressed="false"
                        autocomplete="off"
                        @click="sumarCantidad(index)"
                        >+</button>
                        &nbsp;
                        <button
                            type="submit"
                            class="btn btn-outline-danger"
                            data-bs-toggle="button"
                            aria-pressed="false"
                            autocomplete="off"
                            @click="eliminarDelCarrito(index)"
                        >Eliminar</button>
                        </td>
                    </tr>
                    </tbody>


                  <tfoot>
                      <tr>
                          <th colspan="4">Total General:</th>
                          <th>{{ totalGeneral }}</th>
                          <th>

                          <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#confirmarCompraModal">Finalizar Compra</button>

                          </th>
                      </tr>
                  </tfoot>
              </table>
            </div>
          </section>
      </div>

      <!-- Confirmar Compra Modal -->
      <div class="modal fade" id="confirmarCompraModal" ref="confirmarCompraModal" tabindex="-1" aria-labelledby="confirmarCompraModalLabel" aria-hidden="true">
      <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h3 class="modal-title" id="confirmarCompraModalLabel">Confirmar Compra</h3>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <img src="https://img.freepik.com/vector-premium/icono-marca-verificacion-carrito-compras-estilo-comico-ilustracion-vector-dibujos-animados-aprobacion-compra-sobre-fondo-blanco-aislado-confirmar-concepto-negocio-efecto-salpicadura_157943-20863.jpg?w=740"
                                    class="img-fluid rounded-top"
                                    alt=""/>
                    <p>¿Desea confimar su compra?</p>           
                      <h4><strong>Monto Total:</strong> {{ totalGeneral }}</h4>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir comprando</button>
                      <button type="button" class="btn btn-primary" @click="finalizarCompra">Confirmar Compra</button>
                  </div>
              </div>
          </div>
      </div>
  `,
};