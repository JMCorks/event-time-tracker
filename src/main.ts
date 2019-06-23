import Vue from "vue";

import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { PersistenceService } from "./services/persistence/PersistenceService";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate: () => {
    PersistenceService.initDB("events.db");
    PersistenceService.initDB("persons.db");
  }
}).$mount("#app");
