<template>
    <div class="layout-content">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-5" :class="{'lg:w-9': !existe}">
            <div class="text-center mb-5">
                <i class="pi pi-user mb-3" style="font-size: 1.5rem"></i>
                <div class="text-900 text-2xl font-medium mb-3">Registrarse</div>
                <span class="text-600 font-medium line-height-3">Ya tienes una cuenta?</span>
                <router-link to="/login" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Inicia sesión</router-link>
            </div>
            <div>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="grid">
                        <div class="col-12" :class="{'lg:col-6':!existe}">
                            <Fieldset legend="Datos del Usuario">
                                <div class="grid mb-3">
                                    <div class="col-12 md:col-6">
                                        <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.tipo_ident.$invalid && submitted}" >Tipo de Identificación</label>
                                        <Dropdown v-model="v$.tipo_ident.$model" :options="tipo" optionLabel="nombre" placeholder="Seleccione" />
                                        <small v-if="(v$.tipo_ident.$invalid && submitted) || v$.tipo_ident.$pending.$response" class="p-error">Este campo es requerido</small>
                                    </div>
                                    <div class="col-12 md:col-6">
                                        <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.ident.$invalid && submitted}" >Identificación</label>
                                        <InputNumber  v-model="v$.ident.$model" :useGrouping="false" :change="verificarCliente(ident)"/>
                                        <div v-if="submitted">
                                            <small v-if="(v$.ident.$model == null) || v$.ident.$pending.$response" class="p-error">Este campo es requerido</small>
                                            <small v-if="(v$.ident.$invalid && v$.ident.$model !=null) || v$.ident.$pending.$response" class="p-error">Debe tener máx.13 dígitos</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="col-12 md:col-6">
                                        <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.user.$invalid && submitted}">Usuario</label>
                                        <InputText type="text" v-model="v$.user.$model" :class="{'p-invalid':v$.user.$invalid && submitted}" placeholder="Usuario" />
                                        <small v-if="(v$.user.$invalid && submitted) || v$.user.$pending.$response" class="p-error">Este campo es requerido</small>
                                    </div>
                                    <div class="col-12 md:col-6">
                                        <label :class="{'p-error':v$.password.$invalid && submitted}" class="block text-600 font-medium mb-2">Contraseña</label>
                                        <Password  v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" placeholder="Contraseña" toggleMask />
                                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">Este campo es requerido</small>
                                    </div>
                                </div>
                            </Fieldset>
                        </div>
                        <div class="col-12 lg:col-6" v-if="!existe">
                            <Fieldset legend="Datos del Cliente">
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
                            </Fieldset>
                        </div>
                    </div>
                    <div class="mb-1 mt-4 flex flex-row-reverse">
                        <Button type="submit" label="Ingresar" class="w-3  "></Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { email, required, maxLength } from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return{
                user:'',
                password:'',
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
        mounted(){

        },
        methods:{
            handleSubmit(isFormValid) {
                this.submitted = true
                if (!isFormValid)
                    return;
                this.registrarCliente()
            },
            verificarCliente(ident){
                if(ident == null)
                    return
                /*await axios.get(`http://10.147.17.173:5004/clientes/findByIdentificacion/${ident}`
                ).then(response => {
                    this.existe = response.data
                })
                .catch(e => {
                    this.$toast.error(e.response.data.detail)
                })*/
            },
            async registrarCliente(){
                var params = {
                    identificacion_cliente: (this.ident).toString(),
                    tipoIdentificacion_cliente: this.tipo_ident.valor,
                    nombre_cliente: this.nombre.trim(),
                    direccion_cliente: this.direccion.trim(),
                    telefono_cliente: (this.telf).toString(),
                    correo_cliente: this.correo.trim(),
                    nombre_usuario: this.user.trim(),
                    password_usuario: this.password.trim()
                }
                await axios.post(`http://10.147.17.173:5004/crearCliente/`, params
                ).then(() => {
                    this.resetForm()
                    this.$router.push('/');
                }).catch (e => {
                    this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
                })
            },

            resetForm() {
                this.user = ''
                this.password = ''
                this.tipo_ident = null
                this.ident = ''
                this.nombre = ''
                this.direccion = ''
                this.telf = ''
                this.correo = ''
                this.submitted = false
            }
        },
    }
</script>

<style lang='scss' scoped>
    .layout-content{
        display: flex;
        justify-content: center;
        margin-top: 2em;
        margin-bottom: 2em;
    }

</style>