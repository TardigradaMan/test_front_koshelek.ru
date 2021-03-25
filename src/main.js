import {createApp} from 'vue'
import App from './App.vue'
// import router from './router'
import './assets/styles/scss/style.scss'
import sdk from './plugins/apiCore'

const app = createApp(App)

app.use(sdk).mount('#app')
