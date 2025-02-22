import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './style.css'
import 'vuetify/styles'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()

app.use(
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  }),
)
// app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
