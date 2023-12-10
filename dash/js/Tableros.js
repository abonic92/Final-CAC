// Tableros.js
export default {
  data() {
    return {
      ventas: [],
      areaChart: null,
      pieChart: null,
      estadisticasMensuales: {},
      estadisticasFunciones: {},
    };
  },
  mounted() {
    this.cargarVentas();
  },
  methods: {
    getColor(index) {
      // Implementa lógica para obtener colores dinámicamente
      // Puedes usar un array predefinido de colores o lógica más compleja según tus necesidades.
      const colors = ['#4e73df', '#1cc88a', '#36b9cc'];
      return colors[index % colors.length];
    },  
    getFunctionTitle(funcionId) {
      // Implementa lógica para obtener el título de la función en base a su ID
      const venta = this.ventas.find(venta => venta.funcion.id === parseInt(funcionId));
      return venta ? venta.funcion.titulo : 'Sin título';
    },
    async cargarVentas() {
      try {
        const headers = new Headers();
        const requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        const response = await fetch(
          "https://gcandia1992.pythonanywhere.com/dashboard/ventas",
          requestOptions
        );
        if (!response.ok) {
          throw new Error(
            `Error al cargar datos de ventas. Código: ${response.status}`
          );
        }
        const data = await response.json();
        this.ventas = data.ventas;
        this.procesarEstadisticas();
        this.updateCharts();
      } catch (error) {
        console.error("Error al cargar datos de ventas:", error);
      }
    },
    procesarEstadisticas() {
      // Resetear las estadísticas
      this.estadisticasMensuales = {};
      this.estadisticasFunciones = {};

      // Procesar estadísticas mensuales y por funciones
      this.ventas.forEach((venta) => {
        const fechaVenta = new Date(venta.fecha_venta);
        const mes = fechaVenta.getMonth() + 1; // Los meses en JavaScript son de 0 a 11

        // Estadísticas mensuales
        if (!this.estadisticasMensuales[mes]) {
          this.estadisticasMensuales[mes] = 0;
        }
        this.estadisticasMensuales[mes] += venta.monto;

        // Estadísticas por funciones
        const funcionId = venta.funcion.id;
        if (!this.estadisticasFunciones[funcionId]) {
          this.estadisticasFunciones[funcionId] = 0;
        }
        this.estadisticasFunciones[funcionId] += venta.monto;
      });
    },
    updateCharts() {
      if (this.areaChart) {
        this.areaChart.destroy();
      }
      if (this.pieChart) {
        this.pieChart.destroy();
      }
      this.initCharts();
    },
    initCharts() {
      this.initAreaChart();
      this.initPieChart();
    },
    initAreaChart() {
      const ctx = document.getElementById('myAreaChart').getContext('2d');

      const data = {
        labels: Object.keys(this.estadisticasMensuales).map(month => {
          // Convertir el número del mes a su nombre abreviado
          const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          return monthNames[parseInt(month) - 1];
        }),
        datasets: [
          {
            label: 'Ventas (Anual)',
            data: Object.values(this.estadisticasMensuales),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          x: {
            type: 'category', // Utilizamos escalas de categoría para los nombres de los meses
            labels: data.labels, // Nombres de los meses
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      };

      this.areaChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
      });
    },
    initPieChart() {
      const ctx = document.getElementById('myPieChart').getContext('2d');
    
      const data = {
        labels: Object.keys(this.estadisticasFunciones).map(funcionId => {
          const funcion = this.ventas.find(venta => venta.funcion.id === parseInt(funcionId)).funcion;
          return funcion.titulo;
        }),
        datasets: [
          {
            data: Object.values(this.estadisticasFunciones),
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            borderWidth: 1,
          },
        ],
      };
    
      this.pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
      });
    },
  },
  template: `
    <div class="container-fluid">
      <div class="row">
        <!-- Area Chart -->
        <div class="col-xl-8 col-lg-7">
          <div class="card shadow mb-4">
            <!-- Card Header - Dropdown -->
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Ventas anuales (por mes)</h6>
              <div class="dropdown no-arrow">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                  <div class="dropdown-header">Dropdown Header:</div>
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
            </div>
            <!-- Card Body -->
            <div class="card-body">
              <div class="chart-area">
                <canvas id="myAreaChart" width="1350" height="640" style="display: block; width: 675px; height: 320px;" class="chartjs-render-monitor"></canvas>
              </div>
            </div>
          </div>
        </div>
        <!-- Pie Chart -->
        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <!-- Card Header - Dropdown -->
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Ingresos por función</h6>
              <div class="dropdown no-arrow">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                  <div class="dropdown-header">Dropdown Header:</div>
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
            </div>
            <!-- Card Body -->
            <div class="card-body">
              <div class="chart-pie pt-4 pb-2">
                <canvas id="myPieChart" width="610" height="490" style="display: block; width: 305px; height: 245px;" class="chartjs-render-monitor"></canvas>
              </div>
              <div class="mt-4 text-center small">
                <!-- Mostrar dinámicamente las leyendas de las funciones -->
                <span v-for="(funcionId, index) in Object.keys(estadisticasFunciones)" :key="index" class="mr-2">
                  <i class="fas fa-circle" :style="{ color: getColor(index) }"></i> {{ getFunctionTitle(funcionId) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
