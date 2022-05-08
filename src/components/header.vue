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
                  <UserIcon class="h-5 text-gray-400 mr-1" aria-hidden="true" />
                  <span class="block font-medium text-gray-700">{{userName}}</span>
                </div>
              </div>
              <div class="flow-root">
                <router-link to="/register" v-if="!isLoggedIn" class="-m-2 p-2 block font-medium text-gray-700">Crear Cuenta</router-link>
                <a v-if="isLoggedIn" @click="logout" class="-m-2 p-2 block font-medium text-gray-700 hover:text-gray-400">Cerrar Sesión</a>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <p class="bg-indigo-600 h-10 flex items-center justify-center  font-medium text-white px-4 sm:px-6 lg:px-8">Get free delivery on orders over $100</p>
      <nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center font-medium text-gray-600 hover:text-gray-400">{{ page.name }}</a>
              </div>
            </PopoverGroup>
            <div class="ml-auto flex items-center">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <router-link to="/login" v-if="!isLoggedIn" class="text-sm font-medium text-gray-700 hover:text-gray-400">Iniciar Sesión</router-link>
                <div class="ml-2 flex lg:ml-6" v-if="isLoggedIn">
                  <UserIcon class="h-5 w-5 text-gray-400 mr-1" aria-hidden="true" />
                  <span class="-m-2 p-2 block font-medium text-gray-700 text-sm">{{userName}}</span>
                </div>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <router-link to="/register" v-if="!isLoggedIn"  class="text-sm font-medium text-gray-700 hover:text-gray-400">Crear Cuenta</router-link>
                <div class="flow-root">
                 <button v-if="isLoggedIn" @click="logout" style="cursor:pointer" class="-m-2 p-2 block text-sm font-medium text-gray-700 hover:text-gray-400">Cerrar Sesión</button>
                </div>
              </div>
              <div class="flex lg:ml-6">
                <router-link to='/search' class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <SearchIcon class="w-7 h-9" aria-hidden="true" />
                </router-link>
              </div>
              <div class="ml-4 flow-root lg:ml-6">
                <a href="#" class="group -m-2 p-2 flex items-center">
                  <ShoppingCartIcon @click="openCart" class="flex-shrink-0 h-7 w-7 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <Cart :abrir='this.abrir' @getCartValue="getValue($event)" />
  </div>
</template>

<script>
  import { useAuthStore } from '../stores/auth'
  import { mapState, mapActions } from 'pinia'
  import { ref } from 'vue'
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
      { name: 'Nuestros Productos', href: '#' },
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
      const open = ref(false)
      return {
        navigation,
        open,
      }
    },
    data(){
      return{
        abrir:false
      }
    },
    computed:{
      ...mapState(useAuthStore, ["isLoggedIn"]),
      ...mapState(useAuthStore, ["userName"]),
       ...mapActions(useAuthStore, ["logout"])
    },
    methods:{
      openCart(){
        this.abrir = true
      },

      getValue(e) {     
        this.abrir = !e;
      },

    }
  }
</script>

<style>
 
</style>