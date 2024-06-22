import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bulma/css/bulma.css'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import TitleVue from './views/Title.vue'
import { provideSharedData } from './helpers/useCommon.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const app = createApp(App)

app.use(createPinia()).use(router).use(provideSharedData)
app.component('VueDatePicker', VueDatePicker)
app.component('Title', TitleVue)
app.mount('#app')
