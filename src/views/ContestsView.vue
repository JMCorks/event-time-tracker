<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Selecionar prova</h1>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row>
      <v-flex xs12>
        <v-card>
          <v-list two-line subheader>
            <v-list-tile v-for="event in events" :key="event._id" avatar>
              <v-list-tile-avatar>
                <v-icon class="blue lighten-1 white--text">timer</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ event.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ event.details }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn round icon ripple @click="goToEvent(event)">
                  <v-icon color="primary">check</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import { Getter, Action } from "vuex-class";

import { EventModel } from "../models/event/EventModel";

@Component
export default class ContestsView extends Vue {
  @Getter("events") events!: EventModel[];
  @Action("getEvents") getEvents!: () => EventModel[];

  created() {
    this.getEvents();
  }

  goToEvent(event: EventModel) {
    this.$router.push({
      name: "contest",
      params: { id: "" + event._id }
    });
  }
}
</script>

<style>
</style>