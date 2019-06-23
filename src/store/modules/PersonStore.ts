import { Module } from "vuex";

import { PersonModel } from "@/models/person/PersonModel";
import { PersonsState } from "@/models/person/PersonsState";
import { RootState } from "@/models/RootState";
import { PersistenceService } from "@/services/persistence/PersistenceService";

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
      state.persons = [...state.persons];
    }
  },
  actions: {
    getPersons({ commit }) {
      PersistenceService.personsService.findPersons().then(persons => {
        const personModels = persons.map(
          person =>
            new PersonModel(
              person.name,
              person.birth,
              person.idCard,
              person.email,
              person.gender,
              person._id
            )
        );
        return commit("setPersons", personModels);
      });
    },
    postPersons(
      { commit },
      newPerson: PersonModel
    ): Promise<void | PersonModel> {
      return PersistenceService.personsService
        .insertPerson(newPerson)
        .then(person => {
          const personModel = new PersonModel(
            person.name,
            person.birth,
            person.idCard,
            person.email,
            person.gender,
            person._id
          );
          return commit("addPerson", personModel);
        });
    },
    putPerson({ commit }, person: PersonModel): Promise<void | PersonModel> {
      return PersistenceService.personsService
        .updatePerson(person)
        .then(person => {
          const personModel = new PersonModel(
            person.name,
            person.birth,
            person.idCard,
            person.email,
            person.gender,
            person._id
          );
          return commit("updatePerson", personModel);
        });
    }
  }
};
