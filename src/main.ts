import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import { setupRouterGuard } from './router/guards'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

setupRouterGuard(router)
