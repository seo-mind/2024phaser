import resetStore from '@/stores/ResetStore'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia().use(resetStore))
app.mount('#app')


app.config.globalProperties.$filters = {
  formatDateStr(value) {
    if (value == null || value == '') {
      return value
    }
    return value.substring(0, 10)
  }
}
