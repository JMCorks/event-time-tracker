import { Module } from "vuex";
import DataStore from "nedb";

import { EventModel } from "@/models/event/EventModel";
import { EventsState } from "@/models/event/EventsState";
import { RootState } from '@/models/RootState';

export const eventsModule: Module<EventsState, RootState> = {
    state: {
        events: []
    },
    getters: {
        events: (state: EventsState) => state.events || []
    },
    mutations: {
        setEvents(state: EventsState, events: EventModel[]) {
            state.events = events;
        }
    },
    actions: {
        getEvents({ commit }) {
            const events: EventModel[] = [
                new EventModel("Vacation", "2019-06-30", "Going to the beach!")
            ];

            return commit("setEvents", events);
        }
    }
};