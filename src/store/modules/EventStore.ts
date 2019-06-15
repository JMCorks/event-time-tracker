import { Module } from "vuex";

import { EventModel } from "@/models/event/EventModel";
import { EventsState } from "@/models/event/EventsState";
import { RootState } from "@/models/RootState";
import { PersistenceService } from '@/services/PersistenceService';

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
        updateEvent(state: EventsState, eventUpdated: EventModel) {
            const index = state.events.findIndex(e => e._id === eventUpdated._id);
            state.events[index] = eventUpdated;
        }
    },
    actions: {
        getEvents({ commit }) {
            PersistenceService.eventService.findEvents().then(events => {
                return commit("setEvents", events);
            });
        },
        postEvents({ commit }, newEvent: EventModel) {
            PersistenceService.eventService.insertEvent(newEvent).then(event => {
                return commit("addEvent", event);
            });
        },
        putEvent({ commit }, event: EventModel) {
            PersistenceService.eventService.updateEvent(event).then(event => {
                return commit("updateEvent", event);
            });
        }
    }
};