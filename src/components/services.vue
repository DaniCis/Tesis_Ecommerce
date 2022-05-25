<template>
  <div class="content py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Lo que ofrecemos a nuestros clientes</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Nuestros Servicios</p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div v-for="feature in features" :key="feature.name" class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-1 rounded-md bg-indigo-500 text-white">
                <component :is="feature.icon" class="h-6 w-6" aria-hidden="true" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ feature.name }}</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import {CurrencyDollarIcon,ShieldCheckIcon, LibraryIcon, LockClosedIcon } from '@heroicons/vue/outline'

const features = [
  {
    name: 'Precios Competitivos',
    description:
      'Contamos con los mejores precios del mercado a nivel nacional.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Compras 100% Seguras',
    description:
      'Nuestra honestidad y seguridad a su beneficio.',
    icon: LockClosedIcon,
  },
  {
    name: 'Envíos gratuitos dentro de Quito',
    description:
      'Contamos con alianzas estratégicas con varias empresas de transporte.',
    icon: LibraryIcon
  },
  {
    name: 'Productos Garantizados',
    description:
      'Todos nuestros productos cumplen con estándares de calidad para brindar una mejor experiencia de compra.',
    icon: ShieldCheckIcon,
  },
]

export default {
  setup() {
    return {
      features,
    }
  },
}
</script>
<style>
  .content{
    background-color: #f6f6f6;
}
</style>