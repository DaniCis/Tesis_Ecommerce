<template>
	<Toast />
	<div class="py-8 px-4 sm:px-6 lg:px-8">
		<div class="lg:text-center">
			<h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Lo más nuevo</h2>
			<p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Nuevos Productos</p>
			<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">DIsfruta de todos los productos recién llegados a nuestra empresa</p>
		</div>
		<div class="content-section layout-content implementation mt-4">
            <div class="card">
                <DataView :value="products" :layout="layout" :paginator="true" :rows="8" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
                        <div class="grid grid-nogutter">
                            <div class="col-6" style="text-align: left">
                                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por Precio" @change="onSortChange($event)"/>
                            </div>
                            <div class="col-6" style="text-align: right; z-index:0">
                                <DataViewLayoutOptions v-model="layout" />
                            </div>
                        </div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="product-list-item">
								<img :src="`http://10.147.17.173:5002/productos/images_medium/${slotProps.data.id_producto}/${slotProps.data.imagen_producto[0]}`" :alt="slotProps.data.nombre_producto" @click="openModal(slotProps.data.id_producto)"/>
								<div class="product-list-detail">
									<div class="product-name">{{slotProps.data.nombre_producto}}</div>
									<i class="pi pi-tag product-category-icon"></i><span class="product-category">Nuevo</span>
								</div>
								<div class="product-list-action">
									<div v-if="slotProps.data.descuentoPorcentaje_item==0">
										<span class="product-price">{{slotProps.data.pvp_item}}</span>
									</div>
									<div v-else>
										<span class="product-price">${{slotProps.data.precioDescuento_producto}}</span>
										<span class="ml-2" style="text-decoration:line-through">{{slotProps.data.pvp_item}}</span>
									</div>
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
									<img :src="`http://10.147.17.173:5002/productos/images_medium/${slotProps.data.id_producto}/${slotProps.data.imagen_producto[0]}`" :alt="slotProps.data.nombre_producto" @click="openModal(slotProps.data.id_producto)"/>
									<div class="product-name">{{slotProps.data.nombre_producto}}</div>
								</div>
								<div class="product-grid-item-bottom">
									<div v-if="slotProps.data.descuentoPorcentaje_item==0">
										<span class="product-price">{{slotProps.data.pvp_item}}</span>
									</div>
									<div v-else>
										<span class="product-price">${{slotProps.data.precioDescuento_producto}}</span>
										<span class="ml-2" style="text-decoration:line-through">{{slotProps.data.pvp_item}}</span>
									</div>
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
import config from '../services/config'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref , push, update, get} from 'firebase/database'
import { getAccessToken, getUser } from '../services/auth'
import { useCartStore } from '../stores/carrito'

var app = initializeApp(config);
var db = getDatabase(app)

export default {
	setup() {
		const cartStore = useCartStore()
		return { cartStore }
	},
	components:{Details},
    data() {
        return { 
			open:false, 
            products: [],
			temp:[],
            layout: 'grid',
			stock:null,
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
            await this.axios.get('http://10.147.17.173:5002/public/productosNuevos'
            ).then(response => {
                if(response.data !=null){
					this.temp = response.data
					for (let i = 0; i < this.temp.length; i++) {
						if(this.temp[i].descuentoPorcentaje_item != 0 ){
							var descuento = (parseFloat(this.temp[i].descuentoPorcentaje_item))/100
							var precioFinal = (this.temp[i].pvp_item.slice(1)) -
							((this.temp[i].pvp_item.slice(1)) * descuento.toFixed(2))
						}
						else{
							precioFinal = this.temp[i].pvp_item.slice(1)
						}
						var contenido ={
							pvp_item : this.temp[i].pvp_item,
							id_producto: this.temp[i].id_producto,
							nombre_producto: this.temp[i].nombre_producto,
							imagen_producto: this.temp[i].imagen_producto,
							descuentoPorcentaje_item: this.temp[i].descuentoPorcentaje_item,
							precioDescuento_producto : precioFinal
						}
						this.products.push(contenido)
					}
				}
            }).catch (e=> {
				this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
            })
        },

		addToCart(id){
			var ident =''
			if( getAccessToken() == null)
				ident = localStorage.getItem('ID')
			else
				ident = getUser()
			var carritoUser = ref(db, 'carrito/'+ ident)

			const promesa2 = this.getDetalleProducto(id)
			promesa2.then(
				response => {
					const stock = response
					var promesa = this.verificarExistencia(carritoUser, id)
					promesa.then(
						result => {
							if(result){
								if(result.cantidad +1 <= stock){
									var articuloRef = ref(db, 'carrito/'+ ident + '/' +result.key)
									update(articuloRef,{
										cantidad : result.cantidad + 1
									})
									this.terminarCompra()
								}else{
									this.$toast.add({severity:'error', summary:'Error', detail: 'Cantidad agregada fuera de stock', life: 3000})
								}
							}else{
								push(carritoUser,{
									cantidad:1,
									id: id
								})
								this.terminarCompra()
							}
						}
					)
				}
			)
		},

		terminarCompra(){
			this.cartStore.getNumber()
			this.$toast.add({severity:'success', detail: 'Producto añadido al carrito de compras', life: 3000})
		},

		verificarExistencia(ref, id){
			var productosExistentes = []
			const valor = get(ref).then((snapshot) => {
				snapshot.forEach(function (childSnapshot) {  
					var value = childSnapshot.val()
					var id ={
						key : childSnapshot.key,
						id: value.id,
						cantidad: value.cantidad
					}
					productosExistentes.push(id)
				})
				for (let i = 0; i < productosExistentes.length; i++) {
					if(id == productosExistentes[i].id)
						return productosExistentes[i]
				}
			})
			return valor
		},

		async getDetalleProducto(id){
			const valor = await this.axios.get(`http://10.147.17.173:5002/detalleProducto/venta/findById/${id}`
            ).then(response => {
                const stock = response.data.cantidad_producto
				return stock
            })
            .catch(e => {
                this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
            })
			return valor
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
	.product-name{
		height: 3rem;
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