<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Prova {{event.title}}</h1>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row></v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EventModel } from "../models/event/EventModel";
import { PersistenceService } from "../services/persistence/PersistenceService";
import { Action } from "vuex-class";

@Component
export default class ContestView extends Vue {
  @Action("showErrorMessage") showErrorMessage!: (message: string) => void;

  private eventId: string = "";
  private event: EventModel = new EventModel();

  created() {
    this.eventId = this.$route.params.id;
    PersistenceService.eventService
      .findEvents({
        _id: this.eventId
      })
      .then(events => {
        if (events && events.length === 1) {
          this.event = events[0];
        } else {
          this.showErrorMessage(
            "Erro ao ler o evento, por favor contacte o administrador."
          );

          this.$router.push({
            name: "contests"
          });
        }
      });
  }
}
</script>

<style>
</style>