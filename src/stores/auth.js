import { defineStore } from "pinia";
import { getUser, getAccessToken, quitSession } from '../services/auth';

export const useAuthStore = defineStore({
    id:'auth',
    state:() =>({
        user:getUser(),
        token:getAccessToken(),
    }),
    getters:{
        isLoggedIn(state) {
            return !!state.token;
        },
        userName(state){
            return state.user
        }      
    },
    actions:{
        setToken(token){
            this.token = token
        },
        setUser(){
            this.user = getUser()
        },
        logout(){
            this.token = null 
            quitSession()
            this.$router.push('/');
        },
    },
})
