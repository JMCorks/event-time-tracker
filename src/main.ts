import Vue from "vue";
import "./plugins/vuetify"
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { PersistenceService } from './services/PersistenceService';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created: () => {
    PersistenceService.initDB("../../fs/events.db");
  }
}).$mount("#app");
