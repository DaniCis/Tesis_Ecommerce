<template>
  <Toast />
  <TransitionRoot as="template" :show="abrir">
    <Dialog as="div" class="fixed inset-0 overflow-hidden" @close="closeCart">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="absolute inset-0 bg-opacity-75 transition-opacity" style="background-color:#5e5e62cc"/>
        </TransitionChild>

        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="pointer-events-auto w-screen max-w-md">
              <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle class="text-lg font-medium text-gray-900">Carrito de Compras</DialogTitle>
                    <div class="ml-3 flex h-7 items-center">
                      <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" @click="closeCart">
                        <XIcon class="h-8 w-8" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div class="mt-7">
                    <div class="flow-root">
                      <ul role="list" class="-my-6 divide-y divide-gray-200">
                        <li v-if="productos== null">
                          <div class="mt-8 flex justify-center text-center ">
                            <img src='https://www.metro-markets.com/plugins/user/images/emptycart.png'>
                          </div>
                          <div class=" flex justify-center text-center font-medium text-gray-900">
                            <h2>Carrito Vacío</h2>
                          </div>
                        </li>
                        <li v-else v-for="product in productos" :key="product.id" class="flex py-5">
                          <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img :src="`http://10.147.17.173:5002/productos/images_small/${product.id}/${product.imagen}`" :alt='product.nombre' class="h-full w-full object-cover object-center" />
                          </div>
                          <div class="ml-4 flex flex-1 flex-col">
                            <div class="flex justify-between text-base font-medium text-gray-600">
                              <h3>{{ product.nombre }}</h3>
                              <p class="ml-4 text-gray-900">${{ product.precio }}</p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                              <p class="text-gray-500">Cant. {{ product.cantidad }}</p>
                              <div class="flex">
                                <button type="button" @click='quitarElemento(product.key)' class="font-medium text-indigo-600 hover:text-indigo-500">Quitar</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="border-t border-gray-200 py-4 px-4 sm:px-6">
                  <div v-if="productos==null">
                    <div class="mt-4 mb-6 flex justify-center text-center text-sm text-gray-500">
                      <button type="button" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" @click="closeCart" >Seguir Comprando</button>
                    </div>
                  </div>
                  <div v-else>
                     <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${{subtotal}}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div class="mt-5">
                      <router-link to='/checkout' class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</router-link>
                    </div>
                    <div class="mt-4 flex justify-center text-center text-sm text-gray-500">
                      <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="closeCart" >Seguir Comprando<span aria-hidden="true"> &rarr;</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XIcon } from '@heroicons/vue/outline'
  import { initializeApp } from 'firebase/app'
  import { getDatabase, ref , get, remove} from 'firebase/database'
  import { getAccessToken, getUser } from '../services/auth';
  import { useCartStore } from '../stores/carrito'
  import config from '../services/config'

  var app = initializeApp(config);
  var db = getDatabase(app)

  export default {
    setup() {
      const cartStore = useCartStore()
      return { cartStore }
    },
    components: {
      Dialog,
      DialogOverlay,
      DialogTitle,
      TransitionChild,
      TransitionRoot,
      XIcon,
    },
 
    data(){
      return{
        productos:[],
        precios:[],
        subtotal:null,
      }
    },

    props:{
      abrir:Boolean,
    },

    created(){
      this.cargarCarrito()
    },
    
    methods:{
      cargarCarrito(){
        this.productos=[]
        var contenido = []
        var ident =''
        if( getAccessToken() == null)
          ident = localStorage.getItem('ID')
        else
          ident = getUser()

        var carritoRef = ref(db, "carrito/"+ ident)
        
        get(carritoRef).then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach(function (childSnapshot) {  
              var value = childSnapshot.val()
              var producto ={
                key : childSnapshot.key,
                id: value.id,
                cantidad: value.cantidad
              }
              contenido.push(producto)
            })
            
            for (let i = 0; i < contenido.length; i++) {
              this.getDetalleProducto(contenido[i].id,contenido[i].cantidad,contenido[i].key)
            }
          } else {
            this.productos = null
          }
        })
        this.cartStore.getNumber()
      },

      async getDetalleProducto(id,cantidad,key){
        await this.axios.get(`http://10.147.17.173:5002/detalleProducto/venta/findById/${id}`
        ).then(response => {
          var info ={
            id:id,
            nombre :response.data.nombre_producto,
            precio : (response.data.pvp_item.slice(1)*cantidad).toFixed(2),
            imagen : response.data.imagen_producto[0],
            cantidad : cantidad,
            key:key
          }
          this.productos.push(info)
          this.agregarPrecios()
          this.calcularSubtotal()
        })
        .catch(e => {
          this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
        })
      },
      
      agregarPrecios(){
        this.precios=[]
        for (let i = 0; i < this.productos.length; i++) {
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

      quitarElemento(key){
        var ident =''
        if( getAccessToken() == null)
          ident = localStorage.getItem('ID')
        else
          ident = getUser()
        var carritoRef = ref(db, "carrito/"+ ident +'/'+key)
        remove(carritoRef)
        this.cargarCarrito()
      },

      closeCart(){
        this.$emit('getCartValue',this.abrir) 
      },
    }
  }
</script>