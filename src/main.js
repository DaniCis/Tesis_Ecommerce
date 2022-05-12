import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from "./router"


import './index.css'
import "vue-toastification/dist/index.css"
import '/node_modules/primeflex/primeflex.css'
import 'primevue/resources/themes/tailwind-light/theme.css '
import 'primevue/resources/primevue.min.css '
import 'primeicons/primeicons.css'

import DataView from 'primevue/dataview'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Carousel from 'primevue/carousel'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import InputNumber from 'primevue/inputnumber';
import Galleria from 'primevue/galleria';
import Fieldset from 'primevue/fieldset';
import Skeleton from 'primevue/skeleton';

let config = {
    apiKey: "AIzaSyCpOwHJTTAVtmZKyMzO0hq7vYKi9-yA5UE",
    authDomain: "compunex-19db1.firebaseapp.com",
    databaseURL: "https://compunex-19db1-default-rtdb.firebaseio.com",
    projectId: "compunex-19db1",
    storageBucket: "compunex-19db1.appspot.com",
    messagingSenderId: "999870272695",
    appId: "1:999870272695:web:afabe5b3d5e2a11b8d6932"
}
initializeApp(config);

const app = createApp(App)


app.use(createPinia())
app.use(PrimeVue)
app.use(VueAxios, axios)
app.use(router)
app.use(ToastService)


app.component('Button', Button)
app.component('DataView',DataView)
app.component('DataViewLayoutOptions',DataViewLayoutOptions)
app.component('Dropdown',Dropdown)
app.component('Carousel',Carousel)
app.component('InputText',InputText)
app.component('Password',Password)
app.component('Toast',Toast)
app.component('InputNumber',InputNumber)
app.component('Galleria', Galleria)
app.component('Fieldset',Fieldset)
app.component('Skeleton', Skeleton)

app.mount('#app')
