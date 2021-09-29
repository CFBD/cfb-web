import '@babel/polyfill';
import Vue from 'vue';
import './plugins/fontawesome'
import './plugins/axios';
import './plugins/bootstrap-vue';
import './plugins/json-csv';
import './plugins/vue-spinners';
import './plugins/vue-chart';
import './plugins/sentry';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.ENABLE_DEV_TOOLS;

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  });

Vue.filter('titlecase', function(value) {
  return value.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())
              .replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
