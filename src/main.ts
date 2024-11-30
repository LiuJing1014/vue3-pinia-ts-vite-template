import { createApp } from 'vue'
import '@/style/index.scss'
import App from './App.vue'
import router from '@/router/index.ts'
import store from '@/store/index.ts'

const app = createApp(App)
app.use(router).use(store).mount('#app')
