<template>
  <body class="overflow-y-hidden dark:bg-gray-900">
        <div class="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
            <div class="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
                <div class="w-full lg:w-9/12 xl:w-full">
                    <img class="w-full hidden md:block " src="https://i.ibb.co/ZhjHb0R/Rectangle-19-2.png" alt="wardrobe " />
                    <img class="w-full md:hidden" src="https://i.ibb.co/sbV9CD2/Rectangle-19.png" alt="wardrobe " />
                </div>
                <div class="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ml-6">
                    <h3 class="text-3xl xl:text-4xl dark:text-white font-semibold leading-7 xl:leading-9 w-full md:text-left text-gray-800">Order No.{{this.$route.params.id}}</h3>
                    <div class="flex flex-col flex-col justify-start items-start mt-4 xl:mt-6 space-y-10 w-full">
                        <div class="flex justify-start items-start flex-col md:flex-row w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8 lg:w-full">
                            <div class="flex jusitfy-start items-start flex-col space-y-2">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Nombre</p>
                                <p class="text-sm leading-5 dark:text-gray-300 text-gray-600">{{this.nombre}}</p>
                            </div>
                            <div class="flex jusitfy-start items-start flex-col space-y-2">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Identificación</p>
                                <p class="text-sm leading-5 dark:text-gray-300 text-gray-600">{{this.ident}}</p>
                            </div>
                            <div class="flex jusitfy-start items-start flex-col space-y-2">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Fecha</p>
                                <p class="text-sm leading-5 dark:text-gray-300 text-gray-600">{{this.fecha}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center w-full mt-6 flex-col space-y-4">
                        <div class="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full">
                            <div class="-m-px w-40 md:w-32">
                                <img class="hidden md:block" src="https://i.ibb.co/wWp4m6W/Rectangle-8.png" alt="girl-in-red-dress" />
                                <img class="md:hidden" src="https://i.ibb.co/f8pyz8q/Rectangle-8.png" alt="girl-in-red-dress" />
                            </div>
                            <div class="flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-8">
                                <div class="flex flex-col md:flex-shrink-0 justify-start items-start">
                                    <h3 class="text-lg md:text-xl dark:text-white w-full font-semibold leading-6 md:leading-5 text-gray-800">Premium Quaility Red Dress</h3>
                                    <div class="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4">
                                        <p class="text-sm leading-none dark:text-gray-300 text-gray-600">Size: <span class="text-gray-800 dark:text-white"> Small</span></p>
                                        <p class="text-sm leading-none dark:text-gray-300 text-gray-600">Quantity: <span class="text-gray-800 dark:text-white"> 01</span></p>
                                    </div>
                                </div>
                                <div class="flex mt-4 md:mt-0 md:justify-end items-center w-full">
                                    <p class="text-xl dark:text-white lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">$28.00</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full">
                            <div class="-m-px w-40 md:w-32">
                                <img class="hidden md:block" src="https://i.ibb.co/3ftbsMT/Rectangle-8-1.png" alt="girl-in-yellow-dress" />
                                <img class="md:hidden" src="https://i.ibb.co/D79dzHg/Rectangle-8.png" alt="girl-in-yellow-dress" />
                            </div>
                            <div class="flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-8">
                                <div class="flex flex-col md:flex-shrink-0 justify-start items-start">
                                    <h3 class="text-lg md:text-xl dark:text-white font-semibold leading-6 md:leading-5 text-gray-800">Premium Quaility Yellow Dress</h3>
                                    <div class="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4">
                                        <p class="text-sm leading-none dark:text-gray-300 text-gray-600">Size: <span class="text-gray-800 dark:text-white"> Small</span></p>
                                        <p class="text-sm leading-none dark:text-gray-300 text-gray-600">Quantity: <span class="text-gray-800 dark:text-white"> 01</span></p>
                                    </div>
                                </div>
                                <div class="flex mt-4 md:mt-0 md:justify-end items-center w-full">
                                    <p class="text-xl dark:text-white lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">$28.00</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full">
                            <div class="-m-px w-40 md:w-32">
                                <img class="hidden md:block" src="https://i.ibb.co/C7M7Mvx/Rectangle-8-2.png" alt="girl-in-white-dress" />
                                <img class="md:hidden" src="https://i.ibb.co/MsbCZNJ/Rectangle-8.png" alt="girl-in-white-dress" />
                            </div>
                            <div class="flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-8">
                                <div class="flex flex-col md:flex-shrink-0 justify-start items-start">
                                    <h3 class="text-lg md:text-xl dark:text-white font-semibold leading-6 md:leading-5 text-gray-800">Premium Quaility White Dress</h3>
                                    <div class="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4">
                                        <p class="text-sm leading-none dark:text-gray-300 text-gray-600">Size: <span class="text-gray-800 dark:text-white"> Small</span></p>
                                        <p class="text-sm leading-none dark:text-gray-300 text-gray-600">Quantity: <span class="text-gray-800 dark:text-white"> 01</span></p>
                                    </div>
                                </div>
                                <div class="flex mt-4 md:mt-0 md:justify-end items-center w-full">
                                    <p class="text-xl dark:text-white lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">$28.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col flex-col justify-start items-start mt-8 xl:mt-6 space-y-10 w-full">
                        <div class="flex flex-col w-full space-y-4 w-full">
                            <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div class="flex justify-between w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">${{this.subtotal}}</p>
                                </div>
                                <div class="flex justify-between w-full">
                                    <p class="text-base leading-4 dark:text-white text-gray-800">Descuento</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">-${{this.descuento}}</p>
                                </div>
                                <div class="flex justify-between w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">IVA (12%)</p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">${{this.iva}}</p>
                                </div>
                            </div>
                            <div class="flex justify-between items-center w-full">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${{this.total}}</p>
                            </div>
                            <div class="flex w-full justify-center items-center pt-1 md:pt-2 xl:pt-4 space-y-6 md:space-y-8 flex-col">
                                <button class="py-4 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 w-full text-base font-medium leading-4 text-white bg-gray-600 hover:bg-black">Regresar a la página principal</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
export default {
    data(){
        return{
            nombre:'',
            ident:'',
            fecha:'',
            subtotal:null,
            total:null,
            iva:null,
            descuento:null
        }
    },
    mounted(){
        const idVenta = this.$route.params.id;
    },
    methods:{

    }
}
</script>

