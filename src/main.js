import {createApp} from 'vue'
import App from './App.vue'
import './assets/styles/scss/style.scss'
import sdk from './plugins/apiCore'

const app = createApp(App)

app.use(sdk).mount('#app')
