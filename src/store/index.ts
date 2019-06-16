import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { eventsModule } from "@/store/modules/EventStore";
import { personsModule } from "@/store/modules/PersonStore";
import { RootState } from "@/models/RootState";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {},
    modules: {
        eventsModule,
        personsModule
    }
};

export default new Vuex.Store<RootState>(
    store
);
