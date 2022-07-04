<template>
  <Toast />
  <div class="bg-white">
    <div>
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div class="fixed inset-0 flex z-40">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div class="px-4 flex items-center justify-between">
                  <h2 class="text-lg font-medium text-gray-900">Filtro</h2>
                  <button type="button" class="-mr-8 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400" @click="mobileFiltersOpen = false">
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <form class="mt-1 border-t border-gray-200">
                  <div class="p-inputgroup mt-6 ml-4 mb-2" style="width:260px">
                    <InputText   v-model="v$.textoBuscar.$model" :class="{'p-invalid':v$.textoBuscar.$invalid && submitted}"  placeholder="Buscar" class="search"/>
                    <Button icon="pi pi-search" class="p-button-info" v-show="this.mostrar" @click="handleSubmit(!v$.$invalid)"/>
                    <Button icon="pi pi-times" class="p-button-info" v-show="!this.mostrar" @click="limpiarBuscar()" />
                  </div>
                  <small v-if="(v$.textoBuscar.$invalid && submitted) || v$.textoBuscar.$pending.$response" class="p-error">Este campo es requerido</small> 
                  <Disclosure as="div" class="border-t border-gray-200 px-4 py-4" v-slot="{ open }" v-if="this.marcas.length > 0">
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton class="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                        <span class="font-medium text-gray-900">Filtrar por marca</span>
                        <span class="ml-6 flex items-center">
                          <PlusSmIcon v-if="!open" class="h-8 w-8" aria-hidden="true" />
                          <MinusSmIcon v-else class="h-8 w-8" aria-hidden="true" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div v-for="(option, optionIdx) in marcas" :key="option.value" class="flex items-center">
                          <input :id="optionIdx" :value="option.value" type="checkbox" v-model='marcasSeleccionadas' :checked="option.checked" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                          <label :for="optionIdx" class="ml-3 min-w-0 flex-1 text-gray-500">
                            {{ option.label }}
                          </label>
                        </div>
                      </div>
                      <Button class="mt-6 p-button-info" label="Buscar" @click='buscarMarca(marcasSeleccionadas)' ></Button>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
                
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8" style=" position:relative; z-index:0;" >
        <div class="relative z-10 flex items-baseline justify-between pt-6">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 mt-2" style="z-index:0;">Búsqueda de Productos</h2>
          <div class="flex items-center">
            <button type="button" class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden" @click="mobileFiltersOpen = true">
              <FilterIcon class="w-8 h-8" aria-hidden="true" />
            </button>
          </div>
        </div>
        <section aria-labelledby="products-heading" class="pt-2 pb-18">
          <div class="grid">
            <form class="col-2 hidden lg:block "> 
              <div class="p-inputgroup mt-6 ">
                <InputText v-model="v$.textoBuscar.$model" :class="{'p-invalid':v$.textoBuscar.$invalid && submitted}"  placeholder="Buscar" class="search"/>
                <Button icon="pi pi-search" class="p-button-info" v-show="this.mostrar" @click="handleSubmit(!v$.$invalid)"/>
                <Button icon="pi pi-times" class="p-button-info" v-show="!this.mostrar" @click="limpiarBuscar()" />
              </div>
              <small v-if="(v$.textoBuscar.$invalid && submitted) || v$.textoBuscar.$pending.$response" class="p-error">Este campo es requerido</small>

              <Disclosure as="div"  class="border-b border-gray-200 py-6" v-slot="{ open }" v-if="this.marcas.length > 0">
                <h3 class="-my-3 flow-root">
                  <DisclosureButton class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                    <span class="font-medium text-gray-900">Filtrar por marca</span>
                    <span class="ml-6 flex items-center">
                      <PlusSmIcon v-if="!open" class="h-8 w-8" aria-hidden="true" />
                      <MinusSmIcon v-else class="h-8 w-8" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-5">
                  <div class="space-y-4">
                    <div v-for="(option, optionIdx) in marcas" :key="option.value" class="flex items-center">
                      <input :id="optionIdx" :value="option.value" v-model="marcasSeleccionadas" type="checkbox" :checked="option.checked" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                      <label :for="optionIdx" class="ml-2 text-sm text-gray-600"> {{ option.label }}</label>
                    </div>
                  </div>
                 <Button class="mt-6 p-button-info" label="Buscar" @click='buscarMarca(marcasSeleccionadas,this.textoBuscar)' ></Button>
                </DisclosurePanel>
              </Disclosure>
            </form>
            <div class="col-12 lg:col-10 content-section layout-content" v-if="this.mostrar">
                <span class='no-result mt-3 font-medium'>¿No encuentras lo que necesitas? </span>
                <span class='no-result mt-2 font-medium'> Búscalo aquí</span>
                <div class="mt-6 no-result">  
                  <img src="https://marketing4ecommerce.cl/wp-content/uploads/2020/02/buscador-avanzado-para-tu-eCommerce.jpg">
                </div>
            </div>
              <div class="col-12 lg:col-10 content-section layout-content" v-else  >
                <div v-if="!this.vacio">
                  <span class=" mt-9 ml-6">Resultados encontrados para: {{this.texto}}</span>
                  <div class="card" >
                    <DataView :value="productos" :layout="layout" :paginator="true" :rows="8" :sortOrder="sortOrder" :sortField="sortField">
                      <template #header>
                        <div class="grid grid-nogutter">
                          <div class="col-6" style="text-align: left">
                            <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por Precio" @change="onSortChange($event)"/>
                          </div>
                          <div class="col-6" style="text-align: right; z-index:0">
                            <DataViewLayoutOptions v-model="layout" />
                          </div>
                        </div>
                      </template>
                      <template #list="slotProps">
                        <div class="col-12">
                          <div class="product-list-item">
                            <img :src="`http://10.147.17.173:5002/productos/images_medium/${slotProps.data.id_producto}/${slotProps.data.imagen_producto[0]}`" :alt="slotProps.data.nombre_producto" @click="openModal(slotProps.data.id_producto)"/>
                            <div class="product-list-detail">
                              <div class="product-name">{{slotProps.data.nombre_producto}}</div>
                              <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.marca_producto}}</span>
                            </div>
                            <div class="product-list-action">
                              <div v-if="slotProps.data.descuentoPorcentaje_item==0">
                                <span class="product-price">{{slotProps.data.pvp_item}}</span>
                              </div>
                              <div v-else>
                                <span class="product-price">${{slotProps.data.precioDescuento_producto}}</span>
                                <span class="ml-2" style="text-decoration:line-through">{{slotProps.data.pvp_item}}</span>
                              </div>
                              <Button  @click="addToCart(slotProps.data.id_producto)" icon="pi pi-shopping-cart" label="Añadir al carrito"></Button>
                              <span class="product-badge status-instock">En Stock</span>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template #grid="slotProps">
                        <div class="col-12 md:col-3">
                          <div class="product-grid-item card">
                            <div class="product-grid-item-top">
                              <div>
                                <i class="pi pi-tag product-category-icon"></i>
                                <span class="product-category">{{slotProps.data.marca_producto}}</span>
                              </div>
                              <span class="product-badge status-instock">En Stock</span>
                            </div>
                            <div class="product-grid-item-content">
                              <img :src="`http://10.147.17.173:5002/productos/images_medium/${slotProps.data.id_producto}/${slotProps.data.imagen_producto[0]}`" :alt="slotProps.data.nombre_producto" @click="openModal(slotProps.data.id_producto)"/>
                              <div class="product-name">{{slotProps.data.nombre_producto}}</div>
                            </div>
                            <div class="product-grid-item-bottom">
                              <div v-if="slotProps.data.descuentoPorcentaje_item==0">
                                <span class="product-price">{{slotProps.data.pvp_item}}</span>
                              </div>
                              <div v-else>
                                <span class="product-price">${{slotProps.data.precioDescuento_producto}}</span>
                                <span class="ml-2" style="text-decoration:line-through">{{slotProps.data.pvp_item}}</span>
                              </div>
                              <Button  @click="addToCart(slotProps.data.id_producto)" icon="pi pi-shopping-cart"></Button>
                            </div>
                          </div>
                        </div>
                      </template>
                    </DataView>
                  </div>
                </div>
                <div v-else class="no-result col-12 lg:col-10 content-section layout-content" >
                  <div class="flex" style="flex-direction:column">
                    <span class="text-center font-medium">Resultados no encontrados para: {{this.texto}}</span>
                    <img src="https://www.ecommerce-nation.com/wp-content/uploads/2017/08/How-to-Give-Your-E-Commerce-No-Results-Page-the-Power-to-Sell.png" >
                  </div>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Details v-if="open" :open="this.open" @getModalValue="getValue($event)" :id="this.id" />
    </div>
  </div>
</template>

<script>
 import { ref as ref2} from 'vue'
  import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { XIcon } from '@heroicons/vue/outline'
  import { FilterIcon, MinusSmIcon, PlusSmIcon, } from '@heroicons/vue/solid'
  import { required } from "@vuelidate/validators"
  import { useVuelidate } from "@vuelidate/core"
  import { initializeApp } from 'firebase/app'
  import { getDatabase, ref , push, update, get} from 'firebase/database'
  import { getAccessToken, getUser } from '../services/auth';
  import { useCartStore } from '../stores/carrito'
  import Details from '../components/details.vue'
  import config from '../services/config'

  var app = initializeApp(config);
  var db = getDatabase(app)

  export default {
    components: {
      Dialog,
      DialogPanel,
      Disclosure,
      DisclosureButton,
      DisclosurePanel,
      TransitionChild,
      TransitionRoot,
      FilterIcon,
      MinusSmIcon,
      PlusSmIcon,
      XIcon,
      Details
    },

    setup() {
      const mobileFiltersOpen = ref2(false)
      const cartStore = useCartStore()
      const v$ = useVuelidate()
      return { mobileFiltersOpen, v$ ,cartStore}
    },

    data() {
      return { 
        open:false,
        mostrar:true,
        submitted: false,
        vacio:false,
        textoBuscar:'',
        texto:'',
        productos: [],
        temp:[],
        productos2:[],
        marcas:[],
        marcasSeleccionadas:[],
        layout: 'list',
        id:null,
        sortKey: null,
        sortOrder: null,
        sortField: null,
        sortOptions: [
          {label: 'Más alto a bajo', value: '!pvp_item'},
          {label: 'Más bajo a alto', value: 'pvp_item'},
        ]
      }
    },

    validations() {
      return {
        textoBuscar: { required },
      }
    },

    methods: {
      handleSubmit(isFormValid) {
        this.submitted = true
        if (!isFormValid) {
          return
        }
        this.buscar()
      },

      buscar(){
        if(this.textoBuscar !== '')
          this.mostrar = false
        this.texto = this.textoBuscar
        this.buscarProductos(this.texto)
        this.texto = this.texto.toUpperCase()
      },
      
      limpiarBuscar(){
        this.submitted = false
        this.texto = ''
        this.mostrar = true
        this.productos = []
        this.marcas = []
      },
      
      async buscarProductos(texto){
        this.vacio=false
        await this.axios.get(`http://10.147.17.173:5002/productos/public/findByWord/${texto}`
        ).then((response) => {
          if(response.data !=null){
            this.temp = response.data
            for (let i = 0; i < this.temp.length; i++) {
              if(this.temp[i].descuentoPorcentaje_item != 0 ){
                var descuento = (parseFloat(this.temp[i].descuentoPorcentaje_item))/100
                var precioFinal = (this.temp[i].pvp_item.slice(1)) * descuento.toFixed(2)
              }
              else{
                precioFinal = this.temp[i].pvp_item.slice(1)
              }
              var contenido ={
                pvp_item : this.temp[i].pvp_item,
                id_producto: this.temp[i].id_producto,
                nombre_producto: this.temp[i].nombre_producto,
                imagen_producto: this.temp[i].imagen_producto,
                descuentoPorcentaje_item: this.temp[i].descuentoPorcentaje_item,
                precioDescuento_producto : precioFinal,
                marca_producto:this.temp[i].marca_producto
              }
              this.productos.push(contenido)
            }
            this.obtenerMarcas(this.productos)
          }
          else{
            this.productos=[]
            this.vacio=true
          }
        }).catch (e => {
          this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
        })
      },
      
      obtenerMarcas(productos){
        for (var i = 0; i < productos.length; i++) {
          var marca = {
            value: productos[i].marca_producto,
            label: productos[i].marca_producto,
            checked:true
          }
          this.marcas.push(marca)
        }
      },

      async buscarMarca(marcas,texto){
        this.vacio=false
        this.productos = []
        this.productos2 =[]
        var coincidencias = []
        await this.axios.get(`http://10.147.17.173:5002/productos/public/findByWord/${texto}`
        ).then((response) => {
          if(response.data !=null){
            this.temp = response.data
            for (let i = 0; i < this.temp.length; i++) {
              if(this.temp[i].descuentoPorcentaje_item != 0 ){
                var descuento = (parseFloat(this.temp[i].descuentoPorcentaje_item))/100
                var precioFinal = (this.temp[i].pvp_item.slice(1)) * descuento.toFixed(2)
              }
              else{
                precioFinal = this.temp[i].pvp_item.slice(1)
              }
              var contenido ={
                pvp_item : this.temp[i].pvp_item,
                id_producto: this.temp[i].id_producto,
                nombre_producto: this.temp[i].nombre_producto,
                imagen_producto: this.temp[i].imagen_producto,
                descuentoPorcentaje_item: this.temp[i].descuentoPorcentaje_item,
                precioDescuento_producto : precioFinal,
                marca_producto:this.temp[i].marca_producto
              }
              this.productos2.push(contenido)
            }
          }
          else{
            this.productos2=[]
            this.vacio=true
          }
        }).catch (e => {
          this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
        })

        if(marcas.length !=0){
          for (let i = 0; i < this.productos2.length; i++) {
            if(marcas.includes(this.productos2[i].marca_producto)){
              coincidencias.push(this.productos2[i])
            }
          }
          this.productos = coincidencias
        }else
        this.productos = this.productos2
      },

      openModal(id){
        this.id = id
        this.open = true
      },

      getValue(e) {     
        this.open = !e;
      },

      onSortChange(event){
        const value = event.value.value;
        const sortValue = event.value;
        console.log(value)
        console.log(sortValue)
        if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
          this.sortKey = sortValue;
        }
        else {
          this.sortOrder = 1;
          this.sortField = value;
          this.sortKey = sortValue;
        }
      },
      addToCart(id){
        var ident =''
        if( getAccessToken() == null)
          ident = localStorage.getItem('ID')
        else
          ident = getUser()
        var carritoUser = ref(db, 'carrito/'+ ident)

        const promesa2 = this.getDetalleProducto(id)
        promesa2.then(
          response => {
            const stock = response
            var promesa = this.verificarExistencia(carritoUser, id)
            promesa.then(
              result => {
                if(result){
                  if(result.cantidad +1 <= stock){
                    var articuloRef = ref(db, 'carrito/'+ ident + '/' +result.key)
                    update(articuloRef,{
                      cantidad : result.cantidad + 1
                    })
                    this.terminarCompra()
                  }else{
                    this.$toast.add({severity:'error', summary:'Error', detail: 'Cantidad agregada fuera de stock', life: 3000})
                  }
                }else{
                  push(carritoUser,{
                    cantidad:1,
                    id: id
                  })
                  this.terminarCompra()
                }
              }
            )
          }
        )
	  	},

      terminarCompra(){
        this.cartStore.getNumber()
        this.$toast.add({severity:'success', detail: 'Producto añadido al carrito de compras', life: 3000})
      },

      verificarExistencia(ref, id){
        var productosExistentes = []
        const valor = get(ref).then((snapshot) => {
          snapshot.forEach(function (childSnapshot) {  
            var value = childSnapshot.val()
            var id ={
              key : childSnapshot.key,
              id: value.id,
              cantidad: value.cantidad
            }
            productosExistentes.push(id)
          })
          for (let i = 0; i < productosExistentes.length; i++) {
            if(id == productosExistentes[i].id)
              return productosExistentes[i]
          }
        })
        return valor
      },

      async getDetalleProducto(id){
			  const valor = await this.axios.get(`http://10.147.17.173:5002/detalleProducto/venta/findById/${id}`
        ).then(response => {
          const stock = response.data.cantidad_producto
				  return stock
        })
        .catch(e => {
          this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
        })
			  return valor
      },
    }
}
</script>

<style lang="scss" scoped>
  .no-result{
    display:flex;
    justify-content: center;
    align-content: center;
  }
  .search{
    width: 260px;
  }

  @media screen and (max-width: 1200px){
    .search{
      width:180px;
    }
  }

  @media screen and (min-width: 1201px) and (max-width: 1380px){
    .search{
      width:210px;
    }
  }
  .p-selectbutton{
    box-shadow: none;
  }

  .p-dropdown {
      width: 14rem;
      font-weight: normal;
  }

  .product-name {
    font-size: 1rem;
    font-weight: 700;
    text-transform:capitalize;
  }

  .product-category-icon {
    vertical-align: middle;
    margin-right: .5rem;
  }

  .product-category {
    font-weight: 600;
    vertical-align: middle;
  }

  ::v-deep(.product-list-item) {
    display: flex;
    align-items: center;
    padding: 1rem;
    width: 100%;
    img {
      width: 150px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      margin-right: 2rem;
    }
    .product-list-detail {
      flex: 1 1 0;
    }
    .p-rating {
      margin: 0 0 .5rem 0;
    }
    .product-price {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: .5rem;
      align-self: flex-end;
    }
    .product-list-action {
      display: flex;
      flex-direction: column;
    }
    .p-button {
      margin-bottom: .5rem;
    }
  }

  ::v-deep(.product-grid-item) {
    margin: .5rem;
    border: 1px solid var(--surface-border);
    .product-grid-item-top,
    .product-grid-item-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    img {
      width: 60%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      margin: 1.5rem 0;
      display: inline;
    }
    .product-grid-item-content {
      text-align: center;
    }
    .product-price {
      font-size: 1.3rem;
      font-weight: 600;
    }
    .product-name{
      height: 3rem;
    }
  }

  @media screen and (max-width: 576px) {
    
    .product-list-item {
      flex-direction: column;
      align-items: center;
      img {
        width: 50%;
        margin: 2rem 0;
      }
      .product-list-detail {
        text-align: center;
      }
      .product-price {
        align-self: center;
      }
      .product-list-action {
        display: flex;
        flex-direction: column;
      }
      .product-list-action {
        margin-top: 2rem;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    }
  }

  .product-badge {
    border-radius: 2px;
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;
  }

  .product-badge.status-instock {
    background: #87e48a;
    color: #256029;
    width:82px;
  }

  .layout-content .card {
    background:#fff;
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 2rem;
  } 
</style>