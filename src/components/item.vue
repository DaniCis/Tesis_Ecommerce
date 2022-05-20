<template>
  <div class="grid grid-cols-8 overflow-hidden col-gap-6 mb-5">
    <img class="col-span-3 rounded bg-gray-600 h-18 w-2 object-center" :src="`http://10.147.17.173:5002/productos/images_small/${item.id}/${item.imagen}`" :alt='item.nombre' />
    <div class="mt-2 ml-4 col-span-5">
      <div class="flex">
        <h6 class="text-sm font-semibold text-gray-800 flex-grow">{{item.nombre}}</h6>
      </div>
      <p class="text-xs truncate text-gray-600">Cant. {{item.cantidad}}</p>
      <span class="text-sm text-gray-900">$ {{ item.precio}}</span>
    </div>
  </div>
</template>

<script>
    export default {
    name: "Item",
    props: {
        item: Object
    }
    };
</script>
