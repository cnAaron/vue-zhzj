import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import 'uno.css'
import '@/assets/css/index.less'
import Rourer from '@/router'
import store from '@/store'

const app = createApp(App)

app.use(Rourer)
app.use(store)

app.mount('#app')
