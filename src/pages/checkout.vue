<template>
  <div class="container mx-auto p-6 grid col-12">
    <Toast />
    <div class="col-12 lg:col-6">
      <h4 class="text-2xl text-gray-500 mb-5">Orden de Compra</h4>
      <div class="rounded-md bg-white grid p-2 mb-4">
          <div class="col-6 lg:col-4 field-radiobutton">
              <RadioButton id="op1" value="datos" v-model="opcionOrden" />
              <label for="op1">Con Datos</label>
          </div>
          <div class="col-6 field-radiobutton">
              <RadioButton id="op2" value="finales" v-model="opcionOrden" />
              <label for="op2">Consumidor Final</label>
          </div>
      </div>
      <div>
        <h4 class="text-2xl text-gray-500 mb-2 mt-2">Datos Personales</h4>
        <div class="p-10 rounded-md shadow-md bg-white" >
          <div v-if="opcionOrden=='datos'">
            <div class="grid">
              <form class="p-fluid">
                <div class="grid mb-3" >
                  <div class="col-12 md:col-6">
                    <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.tipo_ident.$invalid && submitted}" >Tipo de Identificación</label>
                    <Dropdown v-model="v$.tipo_ident.$model" :options="tipo" optionLabel="nombre" placeholder="Seleccione" :class="{'p-disabled': this.crearNuevo}" />
                    <small v-if="(v$.tipo_ident.$invalid && submitted) || v$.tipo_ident.$pending.$response" class="p-error">Este campo es requerido</small>
                  </div>
                  <div class="col-12 md:col-6">
                    <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.ident.$invalid && submitted}">Identificación</label>
                    <div class="p-inputgroup">
                      <InputNumber v-model="v$.ident.$model" :class="{'p-invalid':v$.ident.$invalid && submitted ,'p-disabled': this.crearNuevo }" placeholder="Identificación" style="height: 50px;" :useGrouping="false"/>
                      <Button icon="pi pi-search" class="p-button-info" v-show="this.mostrar" @click="handleSubmit(!v$.$invalid)"/>
                      <Button icon="pi pi-times" class="p-button-info" v-show="!this.mostrar" @click="limpiarBuscar()" />
                    </div>
                    <div v-if="submitted">
                      <small v-if="(v$.ident.$model == null) || v$.ident.$pending.$response" class="p-error">Este campo es requerido</small>
                      <small v-if="(v$.ident.$invalid && v$.ident.$model !=null) || v$.ident.$pending.$response" class="p-error">Debe tener máx.13 dígitos</small>
                    </div>
                  </div>
                </div>
             </form>
              <div v-show="this.existe">
                <form class="p-fluid mt-3">
                  <div class="mb-4">
                      <div class="flex">
                        <label class="text-600 font-semibold font-medium mb-2">Nombre:</label>
                        <label class="ml-3 text-700" >{{this.nombre}}</label>
                      </div>
                      <div class="flex">
                        <label class="text-600 font-semibold  mb-2">Correo:</label>
                        <label class="ml-4 text-700 ">{{this.correo}}</label>
                      </div>
                  </div>
                  <Button class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold" @click="confirmarCompra(this.id)" label="Confirmar Compra"></Button>
                </form>
              </div>
              <div v-show="this.crearNuevo">
                <form @submit.prevent="registrarCliente()" class="p-fluid mt-3">
                  <div class="grid mb-3">
                    <div class="col-12 md:col-6">
                      <label class="block text-600 font-medium mb-2" :class="{'p-error':nombreRequerido}">Nombre</label>
                      <InputText  v-model="nombre" placeholder="Nombre" />
                      <small v-if="nombreRequerido" class="p-error">Este campo es requerido</small>
                    </div>
                    <div class="col-12 md:col-6">
                      <label class="block text-600 font-medium mb-2" :class="{'p-error':direccionRequerido}">Dirección</label>
                      <InputText  v-model="direccion" placeholder="Dirección"  />
                      <small v-if="direccionRequerido" class="p-error">Este campo es requerido</small>
                    </div>
                  </div>
                  <div class="grid ">
                    <div class="col-12 md:col-6">
                      <label class="block text-600 font-medium mb-2" :class="{'p-error':telfRequerido}">Teléfono</label>
                      <InputNumber v-model="telf" style="height:50px" :useGrouping="false" />
                      <small v-if="telfRequerido" class="p-error">Este campo es requerido</small>
                      <small v-if="longitud" class="p-error">Debe tener máx.13 dígitos</small>
                    </div>
                      <div class="col-12 md:col-6">
                      <label class="block text-600 font-medium mb-2" :class="{'p-error':correoRequerido}">Correo</label>
                      <InputText type='email' v-model="correo" placeholder="Correo"/>
                      <small v-if="correoRequerido" class="p-error">Este campo es requerido</small>
                    </div>
                  </div>
                  <Button type="submit" class="mt-4 w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold" label="Registrar Cliente"/>
                </form>
              </div>
            </div>
          </div>
          <div v-else>
            <form class="p-fluid">
              <div class="mb-4">
                <div class="flex">
                  <label class="text-600 font-semibold font-medium mb-2">Nombre:</label>
                  <label class="ml-3 text-700">Consumidor Final</label>
                </div>
                <div class="flex">
                  <label class="text-600 font-semibold  mb-2">Correo:</label>
                  <label class="ml-4 text-700">999999999</label>
                </div>
              </div>
              <Button class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold" @click="confirmarCompra(3)" label="Confirmar Compra" ></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-5 ">
      <h4 class="text-2xl text-gray-500 mb-5 ">Resumen</h4>
      <div class="p-10 rounded-md shadow-md bg-white">
        <div class="mb-3 border-gray-200 border-b" style="overflow-x: hidden; overflow-y: auto;max-height:24rem">
          <Item :key="i" v-for="(item, i) in this.productos" :item="item"  />
        </div>
        <div class="grid" style="justify-content:flex-end">
          <span class="col-4 text-sm font-semibold text-gray-900">Subtotal:</span>
          <span class="col-2 text-sm">${{this.subtotal}}</span>  
        </div>
        <div class="grid" style="justify-content:flex-end">
          <span class="col-4 text-sm font-semibold text-gray-900">Descuento:</span>
          <span class="col-2 text-sm">-${{this.descuento}}</span>  
        </div>  
        <div class="grid" style="justify-content:flex-end">
          <span class="col-4 text-sm font-semibold text-gray-900">IVA %12:</span>
          <span class="col-2 text-sm">${{this.iva}}</span>  
        </div>  
        <div class="grid" style="justify-content:flex-end">
          <span class="col-4 text-sm font-semibold text-gray-900">Total:</span>
          <span class="col-2 text-sm">${{this.total}}</span>  
        </div>    
      </div>
    </div>
  </div>
</template>

<script>
import Item from "../components/item.vue"
import { mapState } from 'pinia'
import { useCartStore } from '../stores/carrito'
import { required, maxLength } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import { getUser, getAccessToken } from '../services/auth'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref , get, remove } from 'firebase/database'
import config from '../services/config'

var app = initializeApp(config);
var db = getDatabase(app)

export default {
  name: "CheckoutPage",
  components: {Item},

  setup() {
    const v$ = useVuelidate()
    const cartStore = useCartStore()
    return { v$, cartStore }
  },

  data() {
    return {
      productos:[],
      total: null,
      mostrar:true,
      tipo_ident:null,
      tipo:[
        {nombre:"Cédula", valor: 'Cedula'},
        {nombre:"RUC", valor: 'RUC'}
      ],
      id:null,
      ident:null,
      nombre:'',
      direccion:'',
      telf:null,
      correo:'',
      submitted: false,
      existe: false,
      crearNuevo:false,
      opcionOrden:'datos',
      nombreRequerido:false,
      direccionRequerido:false,
      correoRequerido:false,
      telfRequerido:false,
      longitud:false,
      subtotal:null,
      descuento:null,
      iva:null,
      total:null,
      precios:[],
      descuentos:[],
      detalles:[],
    }
  },

  computed:{
    ...mapState(useCartStore, ["numberItems"]) 
  },

  mounted() {
    this.cargarItems()
  },

  validations() {
    return {
      tipo_ident:{ required },
      ident:{ 
        required,
        maxLengthValue: maxLength(13)
      },
    }
  },

  methods: {
    async confirmarCompra(id){
      for (let i = 0; i < this.productos.length; i++) {
        var detalle ={
          cantidad_detalleVenta: this.productos[i].cantidad,
          productos_id_producto: this.productos[i].id
        }
        this.detalles.push(detalle)
      }
      var params = {
        total_venta: parseFloat(this.total).toFixed(2),
        subtotal_venta:parseFloat(this.subtotal).toFixed(2),
        descuento_venta: parseFloat(this.descuento).toFixed(2),
        clientes_id_cliente: id,
        detalle_venta: this.detalles
      }
      await this.axios.post('http://10.147.17.173:5004/public/ventas', params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
      }).then((response) => {
        const idVenta= response.data
        this.$toast.add({severity:'success', summary: 'Compra registrada con éxito', life: 3000})
        this.vaciarCarrito()
        setTimeout(()=>{
          this.$router.push({
            path:"/orderSummary/"+idVenta,
          })
        }, 3000)

      }).catch (e => {
        this.$toast.add({severity:'Error', summary:'Error', detail: e.response.data.detail, life: 3000})
      })
    },
    
    vaciarCarrito(){
      var ident = getUser()
      var carritoRef = ref(db, "carrito/"+ ident)
      remove(carritoRef)
      this.cartStore.getNumber()
    },

    handleSubmit(isFormValid) {
      this.submitted = true
      if (!isFormValid)
        return
      this.verificarCliente(this.ident)
    },

    limpiarBuscar(){
      this.submitted = false
      this.ident = null
      this.mostrar = true
      this.tipo_ident = null
      this.existe = false
      this.crearNuevo = false
    },

    async verificarCliente(ident){
      this.mostrar=false
      await this.axios.get(`http://10.147.17.173:5004/public/clientes/findByIdentificacion/${ident}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
      }).then(response => {
        if(response.data !=null){
          this.existe = true
          this.nombre = response.data.nombre_cliente
          this.correo = response.data.correo_cliente
          this.id = response.data.id_cliente
        }else{
          this.nombre=''
          this.correo=''
          this.existe = false
          this.crearNuevo = true
          this.$toast.add({severity:'info', summary:'Cliente no encontrado', detail: 'Registre sus datos', life: 3000})
        }
      })
      .catch(e => {
        this.$toast.add({severity:'error', summary:'Error', detail: e.response.data.detail, life: 3000})
      })
    },

    async registrarCliente(){
      this.validarForm()
      if(this.nombreRequerido == true || this.correoRequerido == true || this.direccionRequerido == true || this.telfRequerido == true)
        return
      if(String(this.telf).length > 14){
        this.longitud = true
        return
      }else{
        this.longitud = false
      }
      var params = {
        identificacion_cliente: (this.ident).toString(),
        tipoIdentificacion_cliente: this.tipo_ident.valor,
        nombre_cliente: this.nombre.trim(),
        direccion_cliente: this.direccion.trim(),
        telefono_cliente: (this.telf).toString(),
        correo_cliente: this.correo.trim(),
      }
      await this.axios.post(`http://10.147.17.173:5004/ecommerce/clientes`, params,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
      }).then(() => {
        this.$toast.add({severity:'success', summary:'Registro exitoso', detail: 'Cliente registrado con éxito', life: 3000})
        this.existe = true
        this.crearNuevo = false
        //this.tipo_ident = this.tipo_ident.valor
        this.ident = (this.ident).toString()
        this.verificarCliente((this.ident).toString())
      }).catch (e => {
        this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
      })
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
          descuento: response.data.descuentoPorcentaje_item
        }
        this.productos.push(info)
        this.agregarPrecios()
        this.calcularSubtotal()
        this.calcularDescuentoInd()
        this.calcularDescuentoTotal()
        this.calcularIva()
        this.calcularTotal()
      })
      .catch(e => {
        this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
      })
    },
    
    agregarPrecios(){
      this.precios=[]
      for (var i = 0; i < this.productos.length; i++) {
        const precio = this.productos[i].precio
        this.precios.push(precio)
      }
    },
      
    calcularSubtotal(){  
      this.subtotal = null
      for (var i = 0; i < this.precios.length; i++) 
        this.subtotal += parseFloat(this.precios[i])
      this.subtotal = this.subtotal.toFixed(2) 
    },

    calcularDescuentoInd(){
      this.descuentos = []
      for (var i = 0; i < this.productos.length; i++) {
        const desctInd = (parseFloat(this.productos[i].descuento))/100
        const desct = parseFloat(this.productos[i].precio) * desctInd.toFixed(2)
        this.descuentos.push((parseFloat(desct)).toFixed(2))
      }
    },     
    
    calcularDescuentoTotal(){
      this.descuento = null
      for (var i = 0; i < this.descuentos.length; i++)
        this.descuento += parseFloat(this.descuentos[i])
      this.descuento = this.descuento.toFixed(2)
    },

    calcularIva(){
      this.iva = (this.subtotal - this.descuento)
      this.iva = ((this.iva*0.12).toFixed(2))
    },

    calcularTotal(){
      this.total = null
      this.total = (this.subtotal - this.descuento) + parseFloat(this.iva)
      this.total = parseFloat(this.total).toFixed(2)
    },

    validarForm(){
      if(this.nombre == null || this.nombre == '')
        this.nombreRequerido = true
      else
        this.nombreRequerido = false
      if(this.direccion == null || this.direccion == '')
        this.direccionRequerido = true
      else
        this.direccionRequerido = false
      if(this.correo ==null || this.correo == '')
        this.correoRequerido = true
      else
        this.correoRequerido  = false
      if(this.telf == null)
        this.telfRequerido = true
      else
        this.telfRequerido = false
    },
  }
};
</script>