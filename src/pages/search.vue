<template>
  <Toast />
  <div class="bg-white">
    <div>
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
                  <button type="button" class="-mr-8 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400" @click="mobileFiltersOpen = false">
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <form class="mt-1 border-t border-gray-200">
                  <span class="p-input-icon-left ml-4 mt-3 mb-3">
                    <i class="pi pi-search" />
                    <InputText type="text" placeholder="Buscar" style="width:270px" />
                  </span>  
                  <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-t border-gray-200 px-4 py-4" v-slot="{ open }">
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton class="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
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
                  <Button class='mt-2 ml-4' label="Buscar" ></Button>
                </form>
                
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative z-10 flex items-baseline justify-between pt-6 pb-5 border-b border-gray-200">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Búsqueda de Productos</h2>
          <div class="flex items-center">
            <button type="button" class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden" @click="mobileFiltersOpen = true">
              <FilterIcon class="w-8 h-8" aria-hidden="true" />
            </button>
          </div>
        </div>
        <section aria-labelledby="products-heading" class="pt-2 pb-20">
          <div class="grid">
            <form class="col-2 hidden lg:block"> 
              <span class="p-input-icon-left mt-6">
                <i class="pi pi-search" />
                <InputText type="text" placeholder="Buscar" style="width:260px" />
              </span>        
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
              <Button class='mt-4' label="Buscar" ></Button>
            </form>
            <div class="col-10 content-section layout-content">
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
      <Details v-if="open" :open="this.open" @getModalValue="getValue($event)" :id="this.id" />
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
import {  FilterIcon, MinusSmIcon, PlusSmIcon, } from '@heroicons/vue/solid'
import Details from '../components/details.vue'

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
    FilterIcon,
    MinusSmIcon,
    PlusSmIcon,
    XIcon,
    Details
  },
  setup() {
    const mobileFiltersOpen = ref(false)
    return {
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
    openModal(id){
			this.id = id
			this.open = true
		},

		getValue(e) {     
			this.open = !e;
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

<style lang="scss" scoped>
.p-selectbutton{
	box-shadow: none;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}
.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}
.product-description {
	margin: 0 0 1rem 0;
}
.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}
.product-category {
	font-weight: 600;
	vertical-align: middle;
}
::v-deep(.product-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;
	img {
		width: 150px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}
	.product-list-detail {
		flex: 1 1 0;
	}
	.p-rating {
		margin: 0 0 .5rem 0;
	}
	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}
	.product-list-action {
		display: flex;
		flex-direction: column;
	}
	.p-button {
		margin-bottom: .5rem;
	}
}
::v-deep(.product-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);
	.product-grid-item-top,
	.product-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	img {
		width: 75%;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
		display: inline;
	}
	.product-grid-item-content {
		text-align: center;
	}
	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}
@media screen and (max-width: 576px) {
	.product-list-item {
		flex-direction: column;
		align-items: center;
		img {
			width: 75%;
			margin: 2rem 0;
		}
		.product-list-detail {
			text-align: center;
		}
		.product-price {
			align-self: center;
		}
		.product-list-action {
			display: flex;
			flex-direction: column;
		}
		.product-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}

.product-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;
}

.product-badge.status-instock {
	background: #87e48a;
	color: #256029;
	width:82px;
}

.product-badge.status-outofstock {
	background: #FFCDD2;
	color: #C63737;
}

.product-badge.status-lowstock {
	background: #FEEDAF;
	color: #8A5340;
}
.layout-content .card {
    background:#fff;
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
}
</style>