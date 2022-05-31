<template>

    <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 mt-2" style="z-index:0;">Historial de Compras</h2>
    <div class="container">
        <DataTable :value="compras" :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,30]" responsiveLayout="scroll"
            currentPageReportTemplate="Mostrando {first} a {last} registros de {totalRecords}">
            <Column field="nombre_producto" header="# Comprobante"></Column>
            <Column field="nombre_producto" header="Fecha"></Column>
            <Column field="nombre_producto" header="Nombre Cliente"></Column>
            <Column field="nombre_producto" header="Total"></Column>
            <Column :exportable="false" >
                <template #body="slotProps">
                     <Button icon="pi pi-search" class="p-button-rounded p-button-help mr-2" @click="viewDetails(slotProps.data.nombre_producto)" />
                </template>
            </Column>
        </DataTable>    
	</div>
</template>
<script>
    export default {
        data(){
            return{
               compras:[] 
            }
        },
        mounted(){
            this.getCompras()
        },
        methods:{
            async getCompras(){
                await this.axios.get('http://10.147.17.173:5002/public/productosNuevos'
                ).then(response => {
                    if(response.data !=null){

                       this.compras = response.data
                       console.log(this.compras)
                    }
                }).catch (e=> {
                    this.$toast.add({severity:'error', summary: 'Error', detail: e.response.data.detail, life: 3000});
                })
            },
            viewDetails(id){
                console.log(id)
            }
        }
    }
</script>

<style>
    .container{
        padding:3rem;
    }
</style>