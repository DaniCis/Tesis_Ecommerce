<template>
	<div class="content pt-10 pb-2">
		<div class="content-section implementation">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1" >
                <Carousel :value="categorias" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
                    <template #header>
                        <div class="lg:text-center">
                            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Marcas</h2>
                            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Empresas Con Las Que Trabajamos</p>
                            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
                        </div>
                    </template>
                    <template #item="slotProps">
                        <div class="product-item">
                            <div class="product-item-content">
                                <div class="mb-2">
                                    <img :src="slotProps.data.imagen" :alt="slotProps.data.nombre" class="product-image" />
                                </div>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
            categorias: [],
			responsiveOptions: [
				{
					breakpoint: '1024px',
					numVisible: 3,
					numScroll: 3
				},
				{
					breakpoint: '600px',
					numVisible: 2,
					numScroll: 2
				},
				{
					breakpoint: '480px',
					numVisible: 1,
					numScroll: 1
				}
			]
		}
	},
	mounted() {
        this.categorias=[
            {"nombre": "marca","imagen": "https://logos-marcas.com/wp-content/uploads/2020/11/Kingston-Technology-Logo.png"},
            {"nombre": "marca","imagen": "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-2016-present.jpg"},
            {"nombre": "marca","imagen": "https://logos-marcas.com/wp-content/uploads/2020/11/Logitech-Logotipo-1997-2012.jpg"},
            {"nombre": "marca","imagen": "https://logos-marcas.com/wp-content/uploads/2020/11/HP-Logo.png"},
            {"nombre": "marca","imagen": "https://logos-marcas.com/wp-content/uploads/2020/07/Asus-Logo.png"},
            {"nombre": "marca","imagen": "https://logos-marcas.com/wp-content/uploads/2020/12/Epson-Logo.png"},
        ]
    },
}
</script>

<style lang="scss" scoped>
    .content{
        background-color: #f6f6f6;
    }
    .product-item {
        .product-item-content {
            border: none;
            margin: .3rem;
            text-align: center;
            padding: 2rem 0;
            img{
                display: block;
                margin: 0px auto;
            }
        }
        .product-image {
            width: 60%;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
        }
    }
</style>