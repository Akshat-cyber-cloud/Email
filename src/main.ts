import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import components from '@/components/UI'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

components.forEach((c) => {
  app.component(c.name, c.component)
})

app.use(pinia)
app.use(router)

app.mount('#app')
