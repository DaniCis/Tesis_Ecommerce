<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
  
  import Header from "./components/header.vue"
  import Principal from "./components/principal.vue"
  import Footer from "./components/footer.vue"

  components: { Header, Principal,Footer}

</script>
