<template>
    <Dialog2 header="Sesión Expirada" v-model:visible="displayConfirmation" :style="{width: '400px'}" :modal="true">
      <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color:red" />
          <span>Su sesión ha caducado. Por favor vuelva a ingresar.</span>
      </div>
      <template #footer>
          <Button label="Si" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" autofocus />
      </template>
    </Dialog2>
</template>

<script>
    import { getDecoded } from '../services/auth'
    import { useAuthStore } from '../stores/auth'
    import { mapActions } from 'pinia'

    export default {
        data(){
            return{
                displayConfirmation: false,
            }
        },
        
        async mounted(){
            var decodedToken = getDecoded()
            if (decodedToken != null){
                var date = new Date(decodedToken.exp *1000)
                setTimeout(()=>{
                    this.openConfirmation()
                }, date - Date.now())
            }
        },
        computed:{
            ...mapActions(useAuthStore, ["logout"])
        },
        methods:{
            openConfirmation() {
                this.displayConfirmation = true
            },

            closeConfirmation() {
                this.displayConfirmation = false
                this.logout
            },
        }
    }
</script>