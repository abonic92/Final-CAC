export default {
  data() {
    return {
        carrito: [],
        carritoVacio: true,    
    };
  },
  mounted() {
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
    },
    sumarCantidad(index) {
        this.carrito[index].cantidad++;
        // Actualizar el carrito localmente
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        },
    eliminarDelCarrito(index) {
        this.carrito.splice(index, 1);
        // Actualizar el carrito localmente
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    },
  },
  template: `
  <div class="cuerpo">
        <h2 class="container23">Carrito de Compras</h2>
          <section class="carrito">
              <div class="table-container">
                  <!-- Agrega una condición para mostrar el botón correcto -->
                  <button v-if="carritoVacio" class="btn btn-outline-success" onclick="comenzarComprando()">Comenzar a comprar</button>
                  <button v-else class="btn btn-outline-primary" onclick="continuarComprando()">Continuar comprando</button>

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

                        <button
                        type="button"
                        class="btn btn-outline-primary"
                        data-bs-toggle="button"
                        aria-pressed="false"
                        autocomplete="off"
                        @click="sumarCantidad(index)"
                        >+</button>

                        <button
                            type="button"
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
      <div class="modal fade" id="confirmarCompraModal" tabindex="-1" aria-labelledby="confirmarCompraModalLabel" aria-hidden="true">
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