<template>
  <div>
    <Header />
    <router-view></router-view>
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
