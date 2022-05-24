<template>
  <body class="overflow-y-hidden dark:bg-gray-900">
        <div class="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
            <div class="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
                <div class="w-full lg:w-9/12 xl:w-full">
                    <img class="w-full hidden md:block " src="https://i.ibb.co/ZhjHb0R/Rectangle-19-2.png" alt="wardrobe " />
                    <img class="w-full md:hidden" src="https://i.ibb.co/sbV9CD2/Rectangle-19.png" alt="wardrobe " />
                </div>
                <div class="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ml-6 mr-6">
                    <h3 class="text-2xl xl:text-3xl dark:text-white font-semibold leading-7 xl:leading-9 w-full md:text-left text-gray-800">Orden de Venta No.{{this.numeroComprobante}}</h3>
                    <div class="flex flex-col flex-col justify-start items-start mt-4 xl:mt-6 space-y-10 w-full">
                        <div class="flex justify-start items-start flex-col md:flex-row w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8 lg:w-full">
                            <div class="flex jusitfy-start items-start flex-col space-y-2">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Nombre</p>
                                <p class="text-sm leading-5 dark:text-gray-300 text-gray-600">{{this.nombreCliente}}</p>
                            </div>
                            <div class="flex jusitfy-start items-start flex-col space-y-2">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Identificación</p>
                                <p class="text-sm leading-5 dark:text-gray-300 text-gray-600">{{this.identCliente}}</p>
                            </div>
                            <div class="flex jusitfy-start items-start flex-col space-y-2">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Fecha</p>
                                <p class="text-sm leading-5 dark:text-gray-300 text-gray-600">{{this.fecha}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center w-full mt-6 flex-col space-y-4" style="overflow-x: hidden; overflow-y: auto;max-height:200px">
                        <div v-for="product in this.detalles" :key="product.id_producto" class="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full">
                            <div class="ml-4">
                                <img class="hidden md:block" :src="`http://10.147.17.173:5002/productos/images_small/${product.id_producto}/${product.imagen_producto[0]}`" :alt="product.nombre_producto"/>
                            </div>
                            <div class="flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-4">
                                <div class="flex flex-col md:flex-shrink-0 justify-start items-start">
                                    <h3 class="text-sm dark:text-white w-full font-semibold leading-6 md:leading-5 text-gray-800">{{product.nombre_producto}}</h3>
                                    <div class="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-2">
                                        <p class="text-sm leading-none dark:text-gray-300 text-gray-600">Cant: <span class="text-gray-800 dark:text-white">{{product.cantidad_detalleVenta}}</span></p>
                                        <p v-if="product.descuentoPorcentaje_detalleVenta!=0" class="text-sm leading-none dark:text-gray-300 text-gray-600">Desct: %<span class="text-gray-800 dark:text-white">{{product.descuentoPorcentaje_detalleVenta}}</span></p>
                                    </div>
                                </div>
                                <div class="flex mt-4 md:mt-0 md:justify-end items-center w-full">
                                    <p class="dark:text-white text-1xl font-semibold leading-5 lg:leading-6 text-gray-800">{{product.precio_detalleVenta}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col flex-col justify-start items-start mt-6 space-y-10 w-full">
                        <div class="flex flex-col w-full space-y-4 w-full">
                            <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div class="flex justify-between w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{{this.subtotal}}</p>
                                </div>
                                <div class="flex justify-between w-full">
                                    <p class="text-base leading-4 dark:text-white text-gray-800">Descuento</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">-{{this.descuento}}</p>
                                </div>
                                <div class="flex justify-between w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">IVA (12%)</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">${{this.iva}}</p>
                                </div>
                            </div>
                            <div class="flex justify-between items-center w-full">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{{this.total}}</p>
                            </div>
                            <div class="flex w-full justify-center items-center pt-1 md:pt-2 xl:pt-4 space-y-6 md:space-y-8 flex-col">
                                <router-link to="/"  class="py-4 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 w-full text-center text-base font-medium leading-4 text-white bg-gray-600 hover:bg-black">
                                    Regresar a la Página Principal
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import { getAccessToken } from '../services/auth'

export default {
    data(){
        return{
            nombreCliente:'',
            identCliente:'',
            fecha:'',
            subtotal:null,
            total:null,
            iva:null,
            descuento:null,
            idVenta:null,
            numeroComprobante:null,
            detalles:[],
        }
    },
    mounted(){
        this.idVenta = this.$route.params.id;
        this.getVenta(this.idVenta)
    },
    methods:{
        calcularIva(subtotal, descuento){
            var subt = subtotal.slice(1)
            subt = subt.replace(/,/g, "")
            var desc = descuento.slice(1)
            desc = desc.replace(/,/g, "")
            this.iva = parseFloat(subt) - parseFloat(desc)
            this.iva = (this.iva*0.12).toFixed(2)
        },

        async getVenta(ventaId){
            await this.axios.get(`http://10.147.17.173:5004/public/ventaDetalle/${ventaId}`,{ headers:{ Authorization: 'Bearer ' + getAccessToken() }
            }).then(response => {
                this.fecha = response.data.fecha_venta
                this.numeroComprobante = response.data.numeroComprobante_venta
                this.total = response.data.total_venta
                this.subtotal = response.data.subtotal_venta
                this.descuento = response.data.descuento_venta
                this.nombreCliente = response.data.nombre_cliente
                this.identCliente = response.data.identificacion_cliente
                this.detalles = response.data.detalle_venta
                this.calcularIva(this.subtotal,this.descuento)
            })
            .catch(e => {
                this.$toast.add({severity:'Error', summary:'Error', detail: e.response.data.detail, life: 3000})
            })
        },
    
    }
}
</script>

