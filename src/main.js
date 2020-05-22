import firebase from 'firebase/app';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store/index';
import messagePlugin from './utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';
import Loader from './components/app/Loader.vue';
import dateFilter from './filters/date.filter';
import 'firebase/auth';
import 'firebase/database';
import currencyFilter from './filters/currency.filter';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);


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
