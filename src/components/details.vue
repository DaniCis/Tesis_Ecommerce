<template>
    <Toast />
    <TransitionRoot as="template" :show="open">
        <Dialog as="div"  class="fixed z-10 inset-0 overflow-y-auto" @close="closeModal">
        <div class="flex min-h-screen text-center md:block md:px-2 lg:px-4" style="font-size: 0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="hidden fixed inset-0  bg-opacity-75 transition-opacity md:block" style="background-color:#5e5e62cc" />
            </TransitionChild>
            <span class="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">&#8203;</span>
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 md:scale-100" leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
            <div class="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div class="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 ">
                    <button type="button" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8" @click="closeModal">
                        <XIcon class="h-8 w-8" aria-hidden="true" />
                    </button>
                    <div class="w-full grid" v-if="stock == null">
                        <div class='col-12 md:col-6' >
                            <Skeleton class="mb-2" width="100%" height="18rem"/>
                        </div>
                        <div class=' field col-12 md:col-6' >
                            <Skeleton class="mb-2" width="80%" height="2.5rem"/>
                            <Skeleton class="mb-3" width="30%" height="1.5rem"/>
                            <Skeleton class="mb-3" width="80%" height="1.5rem"/>
                            <Skeleton class="mb-2" width="30%" height="1.5rem"/>
                            <Skeleton class="mb-3" width="80%" height="1.5rem"/>
                            <Skeleton class="mb-2" width="30%" height="1.5rem"/>
                            <Skeleton class="mb-3" width="30%" height="3rem"/>
                            <Skeleton class="mb-2" width="80%" height="3rem"/>
                        </div>
                    </div>
                    <div v-else class="w-full grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8" style="display:grid">
                        <div class="mt-4 rounded-lg  overflow-hidden sm:col-span-4 lg:col-span-5">
                            <Galleria :value="imagenes" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px" :showThumbnails="false" :showIndicators="true" >
                                <template #item="slotProps">
                                    <img :src="`http://10.147.17.173:5002/productos/images/${id}/${slotProps.item.nombreImagen}`" style="width: 100%; display: block;" />
                                </template>
                            </Galleria>
                        </div>
                        <div class="sm:col-span-8 lg:col-span-7">
                            <h2 class="text-2xl font-extrabold text-gray-900 sm:pr-12">
                                {{nombre}}
                            </h2>
                            <section aria-labelledby="information-heading" class="mt-2">
                                <p class="text-2xl text-gray-900">{{precio}}</p>
                            </section>
                            <section aria-labelledby="options-heading" class="mt-4">
                                <form @submit.prevent="addToCart(cantidad)">
                                    <div>
                                        <div>
                                            <label class="block text-500 font-medium mb-2">{{detalle}}</label>
                                        </div>
                                        <div  class="mt-4">
                                            <label class="block text-800 font-medium mb-2">Marca</label>
                                            <label class="block text-500 font-medium mb-2">{{marca}}</label>
                                        </div>
                                        <div  class="mt-4">
                                            <label class="block text-800 font-medium mb-2" for='stock'>Stock</label>
                                            <InputNumber id='stock' v-model='cantidad' :min="1" :max="stock" showButtons/>
                                        </div>
                                    </div>
                                    <button type="submit" class="mt-5 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Añadir al carrito</button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            </TransitionChild>
        </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
	import {
        Dialog,
        DialogOverlay,
        TransitionChild,
        TransitionRoot,
	} from '@headlessui/vue'
	import { XIcon } from '@heroicons/vue/outline'
    import { initializeApp } from 'firebase/app'
    import { getDatabase, ref, push} from 'firebase/database'
    import { getAccessToken, getUser } from '../services/auth'
    import config from '../services/config'

    var app = initializeApp(config);
    var db = getDatabase(app)

export default {
    components: {
		Dialog,
		DialogOverlay,
		TransitionChild,
		TransitionRoot,
		XIcon,
	},
    data(){
        return{
            nombre:'',
            detalle:'',
            cantidad:1,
            stock:null,
            precio:'',
            marca:'',
            imagenes:[],
            nombres:[],
            responsiveOptions: [
				{
                    breakpoint: '1024px',
                    numVisible: 5
                },
                {
                    breakpoint: '768px',
                    numVisible: 3
                },
                {
                    breakpoint: '560px',
                    numVisible: 1
                }
            ],
        }
    },
    mounted(){
        this.getDetalleProducto(this.id)
    },
    props:{
        open:Boolean,
        id:Number
    },
    methods:{
        closeModal(){
            this.$emit('getModalValue',this.open) 
        },

        addToCart(cantidad){
            var ident =''
			if( getAccessToken() == null)
				ident = localStorage.getItem('ID')
			else
				ident = getUser()
            console.log(ident)
			var carritoUser = ref(db, 'carrito/'+ ident)
			push(carritoUser,{
				cantidad:cantidad,
				id: this.id
			})
			this.$toast.add({severity:'success', detail: 'Producto añadido al carrito de compras', life: 3000});
            setTimeout(()=>{
                this.closeModal()
            }, 3000)
		},

        async getDetalleProducto(id){
            await this.axios.get(`http://10.147.17.173:5002/detalleProducto/venta/findById/${id}`
            ).then(response => {
                this.nombre = response.data.nombre_producto
                this.detalle = response.data.detalle_producto
                this.precio = response.data.pvp_item
                this.stock = response.data.cantidad_producto
                this.marca = response.data.marca_producto
                this.nombres = response.data.imagen_producto
                for (var i = 0; i < this.nombres.length; i++) {
                    var nombre = {
                        nombreImagen: this.nombres[i]
                    }
                    this.imagenes.push(nombre)
                }
            })
            .catch(e => {
                this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
            })
        },
    }
}
</script>

<style>
    .p-inputnumber-buttons-stacked .p-inputnumber-input {
        width: 80px;
    }
</style>