<template>
  <div class="container mx-auto p-6 grid grid-cols-1 row-gap-12 lg:grid-cols-10 lg:col-gap-10 lg:pt-12">
    <Toast />
    <Payment  :total="total"></Payment>
    <Summary :items="this.productos"></Summary>
  </div>
</template>

<script>
import Payment from "../components/payment.vue"
import Summary from "../components/summary.vue"
import { getUser } from '../services/auth'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref , get,} from 'firebase/database'
import config from '../services/config'

  var app = initializeApp(config);
  var db = getDatabase(app)


export default {
  name: "CheckoutPage",
  components: {
    Payment,
    Summary,
  },
  data() {
    return {
      productos:[],
      total: 0,
    };
  },
  mounted() {
    this.getTotal(this.productos);
    this.cargarItems()
  },
  methods: {
    getTotal(items) {
      items.forEach(item => {
        this.total += item.precio
      });
    },
    cargarItems(){
      var ident = getUser()
      var contenido = []
      var carritoRef = ref(db, "carrito/"+ ident)
        
      get(carritoRef).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnapshot) {  
            var value = childSnapshot.val()
            var producto ={
              id: value.id,
              cantidad: value.cantidad
            }
            contenido.push(producto)
          })
          for (let i = 0; i < contenido.length; i++) {
            this.getDetalleProducto(contenido[i].id, contenido[i].cantidad)
          }
        } else {
          this.productos = null
        }
      })
      console.log(this.productos)
    },

    async getDetalleProducto(id, cantidad){
      await this.axios.get(`http://10.147.17.173:5002/detalleProducto/venta/findById/${id}`
      ).then(response => {
        var info ={
          id:id,
          nombre :response.data.nombre_producto,
          precio : (response.data.pvp_item.slice(1)*cantidad).toFixed(2),
          imagen : response.data.imagen_producto[0],
          cantidad : cantidad,
        }
        this.productos.push(info)
      })
      .catch(e => {
        this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
      })
    },
  }
};
</script>