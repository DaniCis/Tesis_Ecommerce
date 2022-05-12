<template>
	<Toast />
	<div class="py-8 px-4 sm:px-6 lg:px-8">
		<div class="lg:text-center">
			<h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Nuevos</h2>
			<p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Nuevos Productos</p>
			<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Lorem ipsum dolor sit amet consect adipisicing elit.</p>
		</div>
		<div class="content-section layout-content implementation mt-4">
            <div class="card">
                <DataView :value="products" :layout="layout" :paginator="true" :rows="8" :sortOrder="sortOrder" :sortField="sortField">
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
									<Button  @click="addToCart(slotProps.data.id_producto)" icon="pi pi-shopping-cart" label="Añadir al carrito" ></Button>
									<span class="product-badge status-instock">En Stock</span>
								</div>
							</div>
						</div>
					</template>
					<template #grid="slotProps">
						<div class="col-12 md:col-3">
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
									<Button @click="addToCart(slotProps.data.id_producto)" icon="pi pi-shopping-cart"></Button>
								</div>
							</div>
						</div>
					</template>
				</DataView>
            </div>
		</div>
		<Details v-if="open" :open="this.open" @getModalValue="getValue($event)" :id="this.id" />
	</div>
</template>

<script>
import Details from './details.vue'

export default {

	components:{Details},
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
            ],


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

		addToCart(id){

			this.$toast.add({severity:'success', detail: 'Producto añadido al carrito de compras', life: 3000});
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
    },
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
	font-size: 1rem;
	font-weight: 700;
	text-transform:capitalize;
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
		font-size: 1.3rem;
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
		width: 60%;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 1.5rem 0;
		display: inline;
	}
	.product-grid-item-content {
		text-align: center;
	}
	.product-price {
		font-size: 1.3rem;
		font-weight: 600;
	}
}
@media screen and (max-width: 576px) {
	.product-list-item {
		flex-direction: column;
		align-items: center;
		img {
			width: 50%;
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

.layout-content .card {
    background:#fff;
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 2rem;
} 
@media screen and (min-width: 1200px){
	.layout-content{
		margin: 5em 9em .5em;
	}
}

</style>