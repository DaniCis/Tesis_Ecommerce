<template>
    <div class="layout-content">
        <Toast />
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
            <div class="text-center mb-5">
                <i class="pi pi-user mb-3" style="font-size: 1.5rem"></i>
                <div class="text-900 text-3xl font-medium mb-4">Iniciar Sesión</div>
                <span class="text-600 font-medium line-height-3">No tienes una cuenta?</span>
                <router-link to="/register" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Crea una aquí</router-link>
            </div>
            <div>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="mb-4">
                        <label class="block text-600 font-medium mb-2" :class="{'p-error':v$.user.$invalid && submitted}">Usuario</label>
                        <InputText type="text" v-model="v$.user.$model" :class="{'p-invalid':v$.user.$invalid && submitted}" placeholder="Usuario" />
                        <small v-if="(v$.user.$invalid && submitted) || v$.user.$pending.$response" class="p-error">Este campo es requerido</small>
                    </div>
                    <div class="mb-4">
                        <label :class="{'p-error':v$.password.$invalid && submitted}" class="block text-600 font-medium mb-2">Contraseña</label>
                        <span class="p-input-icon-left">
                            <i class="pi pi-lock" />
                            <Password  v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" placeholder="Contraseña" toggleMask />
                        </span>
                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">Este campo es requerido</small>
                    </div>
                    <div class="mt-6">
                        <Button type="submit" label="Ingresar" class="w-full"></Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { required } from "@vuelidate/validators"
    import { useVuelidate } from "@vuelidate/core"
    import { useAuthStore } from '../stores/auth'

    export default {
        setup() {
            const v$ = useVuelidate()
            const authStore = useAuthStore()
            return { v$, authStore }
        },
        data(){
            return{
                user:'',
                password:'',
                submitted: false,
            };
        },
        validations() {
            return {
                user: { required },
                password: { required},
            }
        },
        methods:{
            handleSubmit(isFormValid) {
                this.submitted = true
                if (!isFormValid) {
                    return;
                }
                this.login()
            },
            async login() {
                const formData = new FormData();
                formData.append('username',this.user.trim());
                formData.append('password',this.password.trim());
                await this.axios.post(`http://10.147.17.173:5005/login`, formData
                ).then((response) => {
                if(response != null && response != undefined){
                    this.resetForm()
                    localStorage.setItem('token',response.data.access_token)
                    this.authStore.setToken(response.data.access_token)
                    this.authStore.setUser()
                    this.$router.push('/');
                }
                }).catch (e=> { 
                    this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail + '. Vuelva a ingresar', life: 3000});
                })
            },

            resetForm() {
                this.user = '';
                this.password = '';
                this.submitted = false;
            }
        },
    }
</script>

<style lang='scss' scoped>
    .layout-content{
        display: flex;
        justify-content: center;
        background-image: url('https://wallpaperaccess.com/full/295694.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        .surface-card{
            margin-top: 6em;
            margin-bottom: 6em;
        }
    }
</style>