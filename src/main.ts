import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .mount('#app')
