<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Gerir provas</h1>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row>
      <v-flex xs12>
        <v-card>
          <v-list two-line subheader>
            <v-subheader inset class="blue--text">Escolher prova</v-subheader>

            <v-list-tile>
              <v-list-tile-content>
                <v-layout align-center>
                  <v-flex xs6>
                    <v-select
                      v-model="eventIdSelected"
                      item-text="title"
                      item-value="_id"
                      :items="events"
                      label="Prova"
                    />
                  </v-flex>
                  <v-flex xs6 class="text-sm-right">
                    <v-btn round small color="primary" @click="saveEvent(eventIdSelected)">
                      <v-icon left dark>check</v-icon>Guardar
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <div v-if="eventIdSelected">
              <v-subheader inset class="blue--text">Adicionar/Remover concorrentes</v-subheader>

              <v-list-tile v-for="person in persons" :key="person._id" avatar>
                <person-list-avatar :person="person"></person-list-avatar>
                <person-list-entry :person="person"></person-list-entry>

                <v-list-tile-action>
                  <v-btn
                    round
                    icon
                    color="primary"
                    v-if="!personIsonEvent(person, eventIdSelected)"
                    @click="addPersonToEvent(person, eventIdSelected)"
                  >
                    <v-icon color="white">add</v-icon>
                  </v-btn>
                  <v-btn
                    round
                    icon
                    color="red"
                    v-if="personIsonEvent(person, eventIdSelected)"
                    @click="removePersonFromEvent(person, eventIdSelected)"
                  >
                    <v-icon color="white">remove</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </div>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PersonListEntry from "@/components/person/PersonListEntry.vue";
import PersonListAvatar from "@/components/person/PersonListAvatar.vue";

import { ScaleModel } from "@/models/scale/ScaleModel";
import { ScalesService } from "@/services/scales/ScalesService";
import { GenderEnum } from "@/services/scales/GenderEnum";
import { EventModel } from "@/models/event/EventModel";
import { Getter, Action } from "vuex-class";
import { PersonModel } from "@/models/person/PersonModel";

@Component({
  components: {
    PersonListEntry,
    PersonListAvatar
  }
})
export default class ManageContestsView extends Vue {
  @Getter("events") events!: EventModel[];
  @Action("getEvents") getEvents!: () => Promise<EventModel[]>;
  @Action("putEvent") putEvent!: (
    event: EventModel
  ) => Promise<void | PersonModel>;

  @Action("showSuccessMessage") showSuccessMessage!: (message: string) => void;
  @Action("showErrorMessage") showErrorMessage!: (message: string) => void;

  @Getter("persons") persons!: PersonModel[];
  @Action("getPersons") getPersons!: () => PersonModel[];

  eventIdSelected: number = 0;

  private getEventFromId(eventId: number): EventModel {
    const event = this.events.find(e => e._id === eventId);
    return { ...event! };
  }

  public addPersonToEvent(person: PersonModel, eventId: number) {
    const event = this.getEventFromId(eventId);
    event.contesters.push(person._id!);
    this.showSuccessMessage(
      "Concorrente adicionado à prova. (Para confirmar guarde as alterações)"
    );
  }

  public personIsonEvent(person: PersonModel, eventId: number) {
    const event = this.getEventFromId(eventId);
    return event.contesters.some(pId => pId === person._id);
  }

  public removePersonFromEvent(person: PersonModel, eventId: number) {
    const event = this.getEventFromId(eventId);
    const index = event.contesters.indexOf(person._id!);
    event.contesters.splice(index, 1);
    this.showSuccessMessage(
      "Concorrente removido da prova. (Para confirmar guarde as alterações)"
    );
  }

  saveEvent(eventId: number) {
    const event = this.getEventFromId(eventId);
    this.putEvent(event)
      .then(event => {
        this.showSuccessMessage("Evento guardado com sucesso.");
      })
      .catch(error => {
        this.showErrorMessage("Erro a guardar o evento. Erro: " + error);
      });
  }

  created() {
    this.getEvents();
    this.getPersons();
  }
}
</script>

<style>
</style>