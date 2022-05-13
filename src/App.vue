<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
    <CheckToken />
  </div>
</template>

<script setup>
  
  import Header from "./components/header.vue"
  import Principal from "./components/principal.vue"
  import Footer from "./components/footer.vue"
  import CheckToken from "./components/checkToken.vue"

  components: { Header, Principal, Footer, CheckToken}  
  
</script>
