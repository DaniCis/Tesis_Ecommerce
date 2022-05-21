<template>
  <div>
    <Header />
    <div class="mt-8">
      <router-view></router-view>
    </div>
    <Footer />
    <CheckToken v-if="isLoggedIn"/>
  </div>
</template>

<script >
  import Header from "./components/header.vue"
  import Principal from "./components/principal.vue"
  import Footer from "./components/footer.vue"
  import CheckToken from "./components/checkToken.vue"
  import { useAuthStore } from './stores/auth'
  import { mapState } from 'pinia'
  import { v4 as uuidv4 } from 'uuid';

  export default{
    components: { Header, Principal, Footer, CheckToken},
    computed:{
      ...mapState(useAuthStore, ["isLoggedIn"]),
    },

    created(){
      this.crearSessionID()
    },

    methods:{
      /*verificar si hay un token y si no esta expirado. Si esta expirado cerrar sesion*/
      crearSessionID(){
        const id = uuidv4()
        const exp = Date.now() + (3600 * 1000 * 24)
        if(!localStorage.getItem('ID')){
          localStorage.setItem('ID',id)
          localStorage.setItem('ID_exp',exp)
        }
      },
    }
    
  }
</script>
