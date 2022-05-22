<template>
 <div class="col-12 lg:col-5 ">
  <h4 class="text-2xl text-gray-500 mb-5">Resumen de Compra</h4>
  <div class="p-10 rounded-md shadow-md bg-white">
    <Item :key="i" v-for="(item, i) in items" :item="item"  />
    <div class="grid" style="justify-content:flex-end">
      <span class="col-4 text-sm font-semibold text-gray-900">Subtotal:</span>
      <span class="col-2 text-sm">${{this.subtotal}}</span>  
    </div>
    <div class="grid" style="justify-content:flex-end">
      <span class="col-4 text-sm font-semibold text-gray-900">Descuento:</span>
      <span class="col-2 text-sm">123</span>  
    </div>  
    <div class="grid" style="justify-content:flex-end">
      <span class="col-4 text-sm font-semibold text-gray-900">IVA %12:</span>
      <span class="col-2 text-sm">${{this.iva}}</span>  
    </div>  
    <div class="grid" style="justify-content:flex-end">
      <span class="col-4 text-sm font-semibold text-gray-900">Total:</span>
      <span class="col-2 text-sm">${{this.total}}</span>  
    </div>    
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
        precios:[],
        subtotal:null,
        iva:null,
        total:null,
      }
    },

    mounted(){
      console.log(this.items)
      this.agregarPrecios()
      this.calcularSubtotal()
      this.calcularIva()
      this.calcularTotal()
    },

    methods:{
      agregarPrecios(){
        this.precios=[]
        for (var i = 0; i < this.items.length; i++) {
          const precio = this.items[i].precio
          this.precios.push((parseFloat(precio)))
        }
      },
      
      calcularSubtotal(){  
        this.subtotal = null
        for (var i = 0; i < this.precios.length; i++) 
          this.subtotal += parseFloat(this.precios[i])
        //this.subtotal = this.subtotal.toFixed(2) 
      },

      calcularIva(){
        this.iva = (this.subtotal)
        //this.iva = ((this.iva*0.12).toFixed(2))
        this.iva = this.iva*0.12
      },

      calcularTotal(){
        this.total = null
        this.total = (this.subtotal) + parseFloat(this.iva)
        //this.total = parseFloat(this.total).toFixed(2)
        this.total = parseFloat(this.total)
      },
    }
  }
</script>