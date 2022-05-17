import { defineStore } from "pinia"
import { initializeApp } from 'firebase/app'
import { getDatabase, ref , get} from 'firebase/database'
import { getAccessToken, getUser } from '../services/auth';
import config from '../services/config'

var app = initializeApp(config);
var db = getDatabase(app)

export const useCartStore = defineStore({
    id:'cart',
    state:() =>({
        cantidad:0,
    }),
    getters:{
        numberItems(state){
            return state.cantidad
        }      
    },
    actions:{
        getNumber(){
            var contenido = []
            var ident =''
            if( getAccessToken() == null)
                ident = localStorage.getItem('ID')
            else
                ident = getUser()
            var carritoRef = ref(db, "carrito/"+ ident)
            get(carritoRef).then((snapshot) => {
                if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {  
                    var value = childSnapshot.val()
                    contenido.push(value)
                })
                    this.cantidad = contenido.length
                } else {
                    this.cantidad = 0
                }
                console.log(this.cantidad)
            }) 
        },
    },
})