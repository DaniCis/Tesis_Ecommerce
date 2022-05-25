<template>
  <div class="bg-white">
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed inset-0 flex z-40 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <div class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div class="px-4 pt-5 pb-2 flex">
              <button type="button" class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400" @click="open = false">
                <span class="sr-only">Close menu</span>
                <XIcon class="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                <a :href="page.href" class="-m-2 p-2 block font-medium text-gray-900 hover:text-gray-400">{{ page.name }}</a>
              </div>
            </div>
            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <div class="flow-root">
                 <router-link to="/login" v-if="!isLoggedIn" class="-m-2 p-2 block font-medium text-gray-700">Iniciar Sesión</router-link>
                 <div class="flex" v-if="isLoggedIn">
                  <Avatar icon="pi pi-user" class="mr-2" style="background-color:#2196F3; color: #ffffff" shape="circle" />
                  <button style="cursor:auto" class="-m-2 p-2 block font-medium text-gray-800 text-sm">{{userName}}</button>
                </div>
              </div>
              <div class="flow-root">
                <router-link to="/register" v-if="!isLoggedIn" class="-m-2 p-2 block font-medium text-gray-700">Crear Cuenta</router-link>
                <a v-if="isLoggedIn" @click="openConfirmation" class="-m-2 p-2 block font-medium text-gray-700 hover:text-gray-400">Cerrar Sesión</a>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>

    <header class=" bg-white">
      <p class="bg-indigo-600 h-10 flex items-center justify-center  font-medium text-white px-4 sm:px-6 lg:px-8">Envíos gratuitos dentro de la ciudad de Quito</p>
      <nav aria-label="Top" class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center">
            <button type="button" class="bg-white p-2 rounded-md text-gray-400 lg:hidden" @click="open = true">
              <span class="sr-only">Open menu</span>
              <MenuIcon class="h-8 w-8" aria-hidden="true" />
            </button>
            <div class="ml-4 lg:ml-0">
              <a href="/">
                <span class="sr-only">Compunex</span>
                <img class="h-8 w-auto" src="../assets/images/CompunexLogo.png" alt="" />
              </a>
            </div>
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="h-full flex space-x-8">
                <router-link v-for="page in navigation.pages" :key="page.name" :to="page.href" class="flex items-center font-medium text-gray-600 hover:text-gray-400">{{ page.name }}</router-link>
              </div>
            </PopoverGroup>
            <div class="ml-auto flex items-center">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <router-link to="/login" v-if="!isLoggedIn" class="text-sm font-medium text-gray-700 hover:text-gray-400">Iniciar Sesión</router-link>
                <div class="ml-2 flex lg:ml-6" v-if="isLoggedIn">
                  <Avatar icon="pi pi-user" class="mr-2" style="background-color:#2196F3; color: #ffffff" shape="circle" />
                  <button style="cursor:auto" class="-m-2 p-2 block font-medium text-gray-800 text-sm">{{userName}}</button>
                </div>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <router-link to="/register" v-if="!isLoggedIn"  class="text-sm font-medium text-gray-700 hover:text-gray-400">Crear Cuenta</router-link>
                <div class="flow-root">
                 <button v-if="isLoggedIn" @click="openConfirmation" style="cursor:pointer" class="-m-2 p-2 block text-sm font-medium text-gray-700 hover:text-gray-400">Cerrar Sesión</button>
                </div>
              </div>
              <div class="flex lg:ml-6">
                <router-link to='/search' class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Buscar</span>
                  <SearchIcon class="w-7 h-9" aria-hidden="true" />
                </router-link>
              </div>
              <div class="ml-4 flow-root lg:ml-6">
                <div class="group -m-2 p-2 flex items-center">
                  <ShoppingCartIcon @click="openCart" class="flex-shrink-0 h-7 w-7 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <Badge :value="numberItems" severity="info" class="mr-2" style='height:24px; min-width:24px'></Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    
    <Dialog2 header="Confirmar" v-model:visible="displayConfirmation" :style="{width: '400px'}" :modal="true">
      <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color:red" />
          <span> ¿Está seguro que desea cerrar sesión?</span>
      </div>
      <template #footer>
          <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
          <Button label="Sí" icon="pi pi-check" @click="close" class="p-button-text" autofocus />
      </template>
    </Dialog2>
    
    <Cart v-if='abrir' :abrir='this.abrir' @getCartValue="getValue($event)" />
  </div>
</template>

<script>
  import { useAuthStore } from '../stores/auth'
  import { useCartStore } from '../stores/carrito'
  import { mapState, mapActions } from 'pinia'
  import { ref as ref2} from 'vue'
  import {
    Dialog,
    DialogOverlay,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { MenuIcon, SearchIcon, ShoppingCartIcon, XIcon, UserIcon } from '@heroicons/vue/outline'
  import Cart from './cart.vue'


  const navigation = {
    pages: [
      { name: 'Nuestros Productos', href: '/products' },
    ],
  }

  export default {
    components: {
      Dialog,
      DialogOverlay,
      Popover,
      PopoverButton,
      PopoverGroup,
      PopoverPanel,
      TransitionChild,
      TransitionRoot,
      MenuIcon,
      SearchIcon,
      ShoppingCartIcon,
      XIcon,
      UserIcon,
      Cart
    },
    setup() {
      const open = ref2(false)
      const cartStore = useCartStore()
      return {
        navigation,
        open,
        cartStore
      }
    },
    data(){
      return{
        abrir:false,
        displayConfirmation: false,
      }
    },

    computed:{
      ...mapState(useAuthStore, ["isLoggedIn"]),
      ...mapState(useAuthStore, ["userName"]),
      ...mapActions(useAuthStore, ["logout"]),
      ...mapState(useCartStore, ["numberItems"]) 
    },
    
    mounted(){  
      this.cartStore.getNumber()
    },

    methods:{
      openCart(){
        this.abrir = true
      },

      getValue(e) {     
        this.abrir = !e
      },

      openConfirmation() {
        this.displayConfirmation = true
      },

      closeConfirmation() {
        this.displayConfirmation = false
      },

      close(){
        this.displayConfirmation = false
        this.logout
        this.cartStore.getNumber()
      }
    }
  }
</script>

<style >
  header{
    position: fixed;
    top:0;
    width: 100%;
    z-index:1;
  }
  .confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>