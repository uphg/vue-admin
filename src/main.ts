import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import { setupRouterGuard } from './router/guards'
import router from './router/router'
import { registerGlobalComponents } from './shared/components'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import './styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

registerGlobalComponents(app)
setupRouterGuard(router)
