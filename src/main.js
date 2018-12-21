import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;
Vue.config.devtools = process.env.ENABLE_DEV_TOOLS == 'true';

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
