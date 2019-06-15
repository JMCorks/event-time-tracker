import Vue from "vue";
import "./plugins/vuetify"
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { EventsService } from './services/EventsService';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created: () => {
    EventsService.initDB();
  }
}).$mount("#app");
