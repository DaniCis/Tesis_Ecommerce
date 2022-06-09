<template>
    <div class="py-2">
        <h2 class=" ml-8 mt-6 text-3xl font-extrabold tracking-tight text-gray-900" style="z-index:0;">Historial de Compras</h2>
        <div class="container">
            <DataTable :value="compras" :paginator="true" :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10,20,30]" responsiveLayout="scroll"
                currentPageReportTemplate="Mostrando {first} a {last} registros de {totalRecords}">
                <Column field="numeroComprobante_venta" header="# Comprobante"></Column>
                <Column field="fecha_venta" header="Fecha"></Column>
                <Column field="nombre_cliente" header="Nombre Cliente"></Column>
                <Column field="total_venta" header="Total"></Column>
                <Column field="id_venta" :exportable="false" >
                    <template #body="slotProps">
                        <Button icon="pi pi-search" class="p-button-rounded p-button-help mr-2" @click="viewDetails(slotProps.data.id_venta)" />
                    </template>
                </Column>
            </DataTable>    
        </div>
    </div>
    
</template>
<script>
    import { getAccessToken } from '../services/auth'
    export default {
        data(){
            return{
               compras:[],
               usuario:'',
            }
        },
        mounted(){
            this.getCompras()
        },
        methods:{
            async getCompras(){
                await this.axios.get(`http://10.147.17.173:5004/public/ventas/findByCliente`, { headers:{ Authorization: 'Bearer ' + getAccessToken() }
                }).then(response => {
                    if(response.data !=null){
                       this.compras = response.data
                    }
                }).catch (e=> {
                    this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
                })
            },
            viewDetails(id){
                const idVenta = id
                this.$router.push({
                    path:"/saleDetail/"+idVenta,
                })
            }
        }
    }
</script>

<style>
    .container{
        padding:2rem 4rem 0 5rem;
    }
</style>