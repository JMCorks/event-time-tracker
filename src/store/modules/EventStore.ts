import { Module } from "vuex";

import { EventModel } from "@/models/event/EventModel";
import { EventsState } from "@/models/event/EventsState";
import { RootState } from "@/models/RootState";
import { EventsService } from '@/services/EventsService';

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
        },
        addEvent(state: EventsState, newEvent: EventModel) {
            state.events.push(newEvent);
        },
    },
    actions: {
        getEvents({ commit }) {
            EventsService.findEvents().then(events => {
                return commit("setEvents", events);
            });
        },
        postEvents({ commit }, newEvent: EventModel) {
            EventsService.insertEvent(newEvent).then(event => {
                return commit("addEvent", event);
            });
        }
    }
};