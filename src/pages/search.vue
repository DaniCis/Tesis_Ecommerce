<!--
      require('@tailwindcss/forms'),
-->
<template>
  <div class="bg-white">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 flex z-40">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div class="px-4 flex items-center justify-between">
                  <h2 class="text-lg font-medium text-gray-900">Filtros</h2>
                  <button type="button" class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400" @click="mobileFiltersOpen = false">
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <!-- Filters -->
                <form class="mt-4 border-t border-gray-200">
                  <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton class="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                        <span class="font-medium text-gray-900">
                          {{ section.name }}
                        </span>
                        <span class="ml-6 flex items-center">
                          <PlusSmIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                          <MinusSmIcon v-else class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                          <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-500">
                            {{ option.label }}
                          </label>
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative z-10 flex items-baseline justify-between pt-14 pb-6 border-b border-gray-200">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">Búsqueda de Productos</h1>
          <div class="flex items-center">
            <button type="button" class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden" @click="mobileFiltersOpen = true">
              <FilterIcon class="w-8 h-8" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pt-6 pb-24">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            <!-- Filters -->
            <form class="hidden lg:block">
              
              <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-b border-gray-200 py-6" v-slot="{ open }">
                <h3 class="-my-3 flow-root">
                  <DisclosureButton class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                    <span class="font-medium text-gray-900">
                      {{ section.name }}
                    </span>
                    <span class="ml-6 flex items-center">
                      <PlusSmIcon v-if="!open" class="h-8 w-8" aria-hidden="true" />
                      <MinusSmIcon v-else class="h-8 w-8" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="space-y-4">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                      <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                      <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">
                        {{ option.label }}
                      </label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>
            <div class="content-section">
              <div class="card">
                <DataView :value="products" :layout="layout" :paginator="true" :rows="6" :sortOrder="sortOrder" :sortField="sortField">
                  <template #header>
                    <div class="grid grid-nogutter">
                        <div class="col-6" style="text-align: left">
                            <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por Precio" @change="onSortChange($event)"/>
                        </div>
                        <div class="col-6" style="text-align: right">
                            <DataViewLayoutOptions v-model="layout" />
                        </div>
                    </div>
                  </template>
                  <template #list="slotProps">
                    <div class="col-12">
                      <div class="product-list-item">
                        <img :src="`http://10.147.17.173:5002/productos/images/${slotProps.data.id_producto}/${slotProps.data.imagen_producto[0]}`" :alt="slotProps.data.nombre_producto" @click="openModal(slotProps.data.id_producto)"/>
                        <div class="product-list-detail">
                          <div class="product-name">{{slotProps.data.nombre_producto}}</div>
                          <i class="pi pi-tag product-category-icon"></i><span class="product-category">Nuevo</span>
                        </div>
                        <div class="product-list-action">
                          <span class="product-price">{{slotProps.data.pvp_item}}</span>
                          <Button icon="pi pi-shopping-cart" label="Add to Cart" ></Button>
                          <span class="product-badge status-instock">En Stock</span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #grid="slotProps">
                    <div class="col-12 md:col-4">
                      <div class="product-grid-item card">
                        <div class="product-grid-item-top">
                          <div>
                            <i class="pi pi-tag product-category-icon"></i>
                            <span class="product-category">Nuevo</span>
                          </div>
                          <span class="product-badge status-instock">En Stock</span>
                        </div>
                        <div class="product-grid-item-content">
                          <img :src="`http://10.147.17.173:5002/productos/images/${slotProps.data.id_producto}/${slotProps.data.imagen_producto[0]}`" :alt="slotProps.data.nombre_producto" @click="openModal(slotProps.data.id_producto)"/>
                          <div class="product-name">{{slotProps.data.nombre_producto}}</div>
                        </div>
                        <div class="product-grid-item-bottom">
                          <span class="product-price">{{slotProps.data.pvp_item}}</span>
                          <Button icon="pi pi-shopping-cart"></Button>
                        </div>
                      </div>
                    </div>
                  </template>
                </DataView>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/vue/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const filters = [
  {
    id: 'marca',
    name: 'Marca',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
]

export default {
  components: {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    ChevronDownIcon,
    FilterIcon,
    MinusSmIcon,
    PlusSmIcon,
    ViewGridIcon,
    XIcon,
  },
  setup() {
    const mobileFiltersOpen = ref(false)

    return {
      sortOptions,
      filters,
      mobileFiltersOpen,
    }
  },
  data() {
    return { 
      open:false,
      products: [],
      layout: 'grid',
      id:null,
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
          {label: 'Más alto a bajo', value: '!pvp_item'},
          {label: 'Más bajo a alto', value: 'pvp_item'},
      ]
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    async getProducts(){
      await this.axios.get('http://10.147.17.173:5002/productos/public'
      ).then(response => {
        if(response.data !=null)
          this.products = response.data
      }).catch (e=> {
        this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
      })
    },
    onSortChange(event){
      const value = event.value.value;
      const sortValue = event.value;
      console.log(value)
      console.log(sortValue)
      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
          this.sortKey = sortValue;
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
          this.sortKey = sortValue;
      }
  }
  }
}
</script>