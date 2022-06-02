<template>
  <body class="overflow-y-hidden dark:bg-gray-900">
        <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div class="flex justify-start item-start space-y-2 flex-col">
                <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Orden de Compra No.{{this.numeroComprobante}}</h1>
                <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{{this.fecha}}</p>
            </div> 
            <div class="mt-5 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-2 xl:space-y-0">
                <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Detalles de Compra</p>
                        <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                            <div class="pb-4 md:pb-8 w-full md:w-40">
                                <img class="w-full hidden md:block" src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
                            </div>
                            <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div class="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">Premium Quaility Dress</h3>
                                    <div class="flex justify-start items-start flex-col space-y-2">
                                        <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Style: </span> Italic Minimal Design</p>
                                        <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                                        <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                                    </div>
                                </div>
                                <div class="flex justify-between space-x-8 items-start w-full">
                                    <p class="text-base dark:text-white xl:text-lg leading-6">$36.00 <span class="text-red-300 line-through"> $45.00</span></p>
                                    <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p>
                                    <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">$36.00</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                            <div class="w-full md:w-40">
                                <img class="w-full hidden md:block" src="https://i.ibb.co/s6snNx0/Rectangle-17.png" alt="dress" />
                                <img class="w-full md:hidden" src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png" alt="dress" />
                            </div>
                            <div class="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                                <div class="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">High Quaility Italic Dress</h3>
                                    <div class="flex justify-start items-start flex-col space-y-2">
                                        <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Style: </span> Italic Minimal Design</p>
                                        <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                                        <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                                    </div>
                                </div>
                                <div class="flex justify-between space-x-8 items-start w-full">
                                    <p class="text-base dark:text-white xl:text-lg leading-6">$20.00 <span class="text-red-300 line-through"> $30.00</span></p>
                                    <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p>
                                    <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">$20.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Resumen</h3>
                            <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div class="flex justify-between w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{{this.subtotal}}</p>
                                </div>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">Descuento</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">-{{this.descuento}}</p>
                                </div>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">IVA (12%)</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">${{this.iva}}</p>
                                </div>
                            </div>
                            <div class="flex justify-between items-center w-full">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{{this.total}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Datos Cliente</h3>
                    <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div class="flex flex-col justify-start items-start flex-shrink-0">
                            <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <div class="flex justify-start items-start flex-col space-y-2">
                                    <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">Identificación</p>
                                    <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">{{this.identCliente}}</p>
                                </div>
                            </div>
    
                            <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <i class="pi pi-user"></i>
                                <p class="cursor-pointer text-sm leading-5 ">{{this.nombreCliente}}</p>
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

<style>

</style>