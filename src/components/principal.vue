<template>
    <Hero />
    <Services />
    <Products />
    <Category />
</template>

<script setup>
 
  import Category from "./category.vue"
  import Hero from "./hero.vue"
  import Products from './newProducts.vue'
  import Services from './services.vue'

  components: {Hero , Category ,Products, Services}

</script>
