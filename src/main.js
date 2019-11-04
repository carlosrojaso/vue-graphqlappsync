import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { rutas } from "./rutas"
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

Vue.use(VueRouter);
Vue.use(AmplifyPlugin, AmplifyModules)

const enrutador = new VueRouter({
  routes: rutas
});

Vue.config.productionTip = false

new Vue({
  router: enrutador,
  render: h => h(App)
}).$mount('#app')