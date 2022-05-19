<template>
 <div class="col-span-1 lg:col-span-6 order-first lg:order-last">
  <h4 class="text-3xl text-gray-700 mb-5">Resumen de Compra</h4>
  <div class="p-10 rounded-md shadow-md bg-white">
   <Item :key="i" v-for="(item, i) in items" :item="item"  />
  </div>
 </div>
</template>

<script>
import Item from "./item.vue";
export default {
  name: "Summary",
  props: {
    items: Object
  },
  components: {
    Item
  },
  data() {
    return {

    };
  }
};
</script>