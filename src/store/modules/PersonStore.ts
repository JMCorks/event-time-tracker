import { Module } from "vuex";

import { PersonModel } from '@/models/persons/PersonModel';
import { PersonsState } from '@/models/persons/PersonsState';
import { RootState } from "@/models/RootState";
import { PersistenceService } from '@/services/persistence/PersistenceService';

export const personsModule: Module<PersonsState, RootState> = {
    state: {
        persons: []
    },
    getters: {
        persons: (state: PersonsState) => state.persons || []
    },
    mutations: {
        setPersons(state: PersonsState, persons: PersonModel[]) {
            state.persons = persons;
        },
        addPerson(state: PersonsState, newPerson: PersonModel) {
            state.persons.push(newPerson);
        },
        updatePerson(state: PersonsState, personUpdated: PersonModel) {
            const index = state.persons.findIndex(p => p._id === personUpdated._id);
            state.persons[index] = personUpdated;
        }
    },
    actions: {
        getPersons({ commit }) {
            PersistenceService.personsService.findPersons().then(persons => {
                return commit("setPersons", persons);
            });
        },
        postPersons({ commit }, newPerson: PersonModel) {
            PersistenceService.personsService.insertPerson(newPerson).then(person => {
                return commit("addPerson", person);
            });
        },
        putPerson({ commit }, person: PersonModel) {
            PersistenceService.personsService.updatePerson(person).then(person => {
                return commit("updatePerson", person);
            });
        }
    }
};