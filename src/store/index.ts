import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { eventsModule } from "@/store/modules/EventStore";
import { personsModule } from "@/store/modules/PersonStore";
import { RootState } from "@/models/RootState";
import { SnackBarModel } from "@/models/SnackBar";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    snackbar: {
      color: "",
      message: "",
      showSnackbar: false
    }
  },
  getters: {
    snackbar: (state: RootState) => state.snackbar
  },
  mutations: {
    setSnackbar(state: RootState, snackbar: SnackBarModel) {
      state.snackbar = snackbar;
    }
  },
  actions: {
    showSuccessMessage({ commit }, message: string) {
      return commit("setSnackbar", {
        color: "green",
        message: message,
        showSnackbar: true
      });
    },
    showErrorMessage({ commit }, message: string) {
      return commit("setSnackbar", {
        color: "red",
        message: message,
        showSnackbar: true
      });
    }
  },
  modules: {
    eventsModule,
    personsModule
  }
};

export default new Vuex.Store<RootState>(store);
