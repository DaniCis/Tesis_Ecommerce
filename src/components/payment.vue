<template>
<Toast />
 <div class="col-12 lg:col-6 ">
    <h4 class="text-2xl text-gray-500 mb-5">Datos Personales</h4>
    <div class="p-10 rounded-md shadow-md bg-white">
        <div>
            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                <div class="grid">
                    <div class="grid mb-3">
                        <div class="col-12 md:col-6">
                            <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.tipo_ident.$invalid && submitted}" >Tipo de Identificación</label>
                            <Dropdown v-model="v$.tipo_ident.$model" :options="tipo" optionLabel="nombre" placeholder="Seleccione" />
                            <small v-if="(v$.tipo_ident.$invalid && submitted) || v$.tipo_ident.$pending.$response" class="p-error">Este campo es requerido</small>
                        </div>
                        <div class="col-12 md:col-6">
                            <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.ident.$invalid && submitted}" >Identificación</label>
                            <InputNumber  v-model="v$.ident.$model" :useGrouping="false" :change="verificarCliente(ident)" />
                            <div v-if="submitted">
                                <small v-if="(v$.ident.$model == null) || v$.ident.$pending.$response" class="p-error">Este campo es requerido</small>
                                <small v-if="(v$.ident.$invalid && v$.ident.$model !=null) || v$.ident.$pending.$response" class="p-error">Debe tener máx.13 dígitos</small>
                            </div>
                        </div>
                    </div>
                    <div class="grid mb-3">
                        <div class="col-12 md:col-6">
                            <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.nombre.$invalid && submitted}" >Nombre</label>
                            <InputText type='text' v-model="v$.nombre.$model" placeholder="Nombre" />
                            <small v-if="(v$.nombre.$invalid && submitted) || v$.nombre.$pending.$response" class="p-error">Este campo es requerido</small>
                        </div>
                        <div class="col-12 md:col-6">
                            <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.direccion.$invalid && submitted}" >Dirección</label>
                            <InputText type='text' v-model="v$.direccion.$model" placeholder="Dirección" />
                            <small v-if="(v$.direccion.$invalid && submitted) || v$.direccion.$pending.$response" class="p-error">Este campo es requerido</small>
                        </div>
                    </div>
                    <div class="grid ">
                        <div class="col-12 md:col-6">
                            <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.telf.$invalid && submitted}" >Teléfono</label>
                            <InputNumber  v-model="v$.telf.$model" :useGrouping="false" />
                            <div v-if="submitted">
                                <small v-if="(v$.telf.$model ==null) || v$.telf.$pending.$response" class="p-error">Este campo es requerido</small>
                                <small v-if="(v$.telf.$invalid && v$.telf.$model !=null) || v$.telf.$pending.$response" class="p-error">Debe tener máx.13 dígitos</small>
                            </div>
                        </div>
                        <div class="col-12 md:col-6">
                            <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.correo.$invalid && submitted}" >Correo</label>
                            <InputText type='email' v-model="v$.correo.$model" placeholder="Correo" />
                            <div v-if="submitted">
                                <small v-if="(v$.correo.$model =='') || v$.correo.$pending.$response" class="p-error">Este campo es requerido</small>
                                <small v-if="(v$.correo.$invalid && v$.correo.$model !='') || v$.correo.$pending.$response" class="p-error">Formato no válido</small>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
        <div class="mb-6 flex flex-wrap -mx-3w-full">
            <div class="w-2/3 px-3">
                <label class="block mb-3 text-gray-600" for="">Expiraion date</label>
                <div class="flex">
                    <select class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6">
                    <option>Month</option>
                    </select>
                </div>
            </div>
            <div class="w-1/3 px-3">
                <label class="block mb-3 text-gray-600" for="">CVC</label>
                <input type="tel" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest"/>
            </div>
        </div>
        <div class="mb-6 text-right">
            <span class="text-right font-bold">{{ total }}USD</span>
        </div>
        <div>
            <router-link to='/orderSummary' class="w-full text-ceenter px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">
            Confirmar Compra
            </router-link>
        </div>
    </div>
 </div>
</template>

<script>
    import { email, required, maxLength } from "@vuelidate/validators"
    import { useVuelidate } from "@vuelidate/core"

    export default {
        name: "Payment",
        setup: () => ({ v$: useVuelidate() }),
        props:{
            total:Number
        },
        data(){
            return{
                tipo_ident:null,
                tipo:[
                    {nombre:"Cédula", valor: 'Cedula'},
                    {nombre:"RUC", valor: 'RUC'}
                ],
                ident:null,
                nombre:'',
                direccion:'',
                telf:null,
                correo:'',
                submitted: false,
                existe: true,
            };
        },
        validations() {
            return {
                user: { required },
                password: { required },
                tipo_ident:{ required },
                ident:{ 
                    required,
                    maxLengthValue: maxLength(13)
                    },
                nombre:{ required },
                direccion: { required },
                telf: {
                    required,
                    maxLengthValue: maxLength(13)
                    },
                correo:{
                    required, 
                    email
                }
            }
        },
        methods:{
            handleSubmit(isFormValid) {
                this.submitted = true
                if (!isFormValid)
                    return
                //this.registrarCliente()
            },

            async verificarCliente(ident){
                /*await this.axios.get(`http://10.147.17.173:5004/clientes/findByIdentificacion/${ident}`
                ).then(response => {
                    this.existe = response.data
                    console.log(this.existe)
                })
                .catch(e => {
                    this.$toast.add({severity:'error', summary:'Error', detail: e.response.data.detail, life: 3000})
                })*/
            }
        }
    }
</script>