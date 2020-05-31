import firebase from 'firebase/app';
import 'materialize-css/dist/js/materialize.min';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import localizeFilter from './filters/localize.filter';
import messagePlugin from './utils/message.plugin';
import Loader from './components/app/Loader.vue';
import './registerServiceWorker';
import tooltipDirective from './directives/tooltip.directive';
import store from './store/index';
import router from './router/index';
import App from './App.vue';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('localize', localizeFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: 'AIzaSyAGMtJmzkDLyfMREAfzLKyvxkvg4-ijXcA',
  authDomain: 'home-money-crm.firebaseapp.com',
  databaseURL: 'https://home-money-crm.firebaseio.com',
  projectId: 'home-money-crm',
  storageBucket: 'home-money-crm.appspot.com',
  messagingSenderId: '572260526184',
  appId: '1:572260526184:web:62b65aadfab7167d46f3dd',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
