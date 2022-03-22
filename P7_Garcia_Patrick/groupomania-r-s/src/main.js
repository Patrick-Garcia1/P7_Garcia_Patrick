import { createApp } from 'vue'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue'
import router from './router'
import store from './store'
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { fas } from '@fortawesome/free-solid-svg-icons'

//library.add(fas);

//createApp(App).use(store).use(router).component('fa', FontAwesomeIcon).mount('#app');
createApp(App).use(store).use(router).mount('#app');
