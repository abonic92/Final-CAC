export default {
  data() {
    return {
      carritoVacio: true,
    };
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
                      <tr>
                          <td><img src="/img/sala.jpg" alt="" class="image"></td>
                          <td>fffffffffffffffffffffffffddddddddddddddddddddddddddddddd</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <button
                                  type="button"
                                  class="btn btn-outline-warning "
                                  data-bs-toggle="button"
                                  aria-pressed="false"
                                  autocomplete="off"
                              >-
                              </button>
                              <button
                              type="button"
                              class="btn btn-outline-primary"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autocomplete="off"
                              >+
                              </button>
                              
                              <button
                                  type="button"
                                  class="btn btn-outline-danger"
                                  data-bs-toggle="button"
                                  aria-pressed="false"
                                  autocomplete="off"
                              >
                                  Eliminar
                              </button>
                          </td>
                      </tr>
                      <tr>
                          <td><img src="/img/" alt=""></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <button
                                  type="button"
                                  class="btn btn-outline-warning "
                                  data-bs-toggle="button"
                                  aria-pressed="false"
                                  autocomplete="off"
                              >-
                              </button>
                              <button
                              type="button"
                              class="btn btn-outline-primary"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autocomplete="off"
                              >+
                              </button>
                              
                              <button
                                  type="button"
                                  class="btn btn-outline-danger"
                                  data-bs-toggle="button"
                                  aria-pressed="false"
                                  autocomplete="off"
                              >
                                  Eliminar
                              </button>
                              
                          </td>
                      </tr>
                      <tr>
                          <td><img src="/img/" alt=""></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                              <button
                              type="button"
                              class="btn btn-outline-warning "
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autocomplete="off"
                          >-
                          </button>
                          <button
                          type="button"
                          class="btn btn-outline-primary"
                          data-bs-toggle="button"
                          aria-pressed="false"
                          autocomplete="off"
                          >+
                          </button>
                          
                          <button
                              type="button"
                              class="btn btn-outline-danger"
                              data-bs-toggle="button"
                              aria-pressed="false"
                              autocomplete="off"
                          >
                              Eliminar
                          </button>
                              <!-- <button @click="eliminarDelCarrito(index)" class="boton-rojo">Eliminar</button> -->
                          </td>
                      </tr>
                  </tbody>

                  <tfoot>
                      <tr>
                          <th colspan="4">Total General:</th>
                          <th>Calcular Total</th>
                          <th>
                              <div class="d-grid gap-2">
                                  <button type="button" name="" id="" class="btn btn-outline-success">Finalizar Compra</button>
                              </div>
                              <!-- <button @click="finalizarCompra" class="boton-verde">Finalizar Compra</button> -->
                          </th>
                      </tr>
                  </tfoot>
              </table>
            </div>
          </section>
      </div>
  `,
};