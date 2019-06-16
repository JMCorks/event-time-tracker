<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Eventos</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-sm-right">
        <v-btn color="primary" @click="displayEventForm()">
          <v-icon left dark>add</v-icon>Criar evento
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row>
      <v-flex xs12>
        <v-card>
          <v-list two-line subheader>
            <v-subheader inset class="blue--text">Próximos eventos</v-subheader>

            <v-list-tile v-for="event in nextEvents" :key="event.title" avatar>
              <v-list-tile-avatar>
                <v-icon class="blue lighten-1 white--text">bookmark</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ event.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ event.details }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="primary" @click="displayEventForm(event)">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-subheader inset>Eventos concluidos</v-subheader>

            <v-list-tile v-for="event in lastEvents" :key="event._id" avatar>
              <v-list-tile-avatar>
                <v-icon class="grey white--text">bookmark_border</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ event.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ event.details }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="primary">timeline</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="showEventForm" persistent max-width="500">
      <event-form :event-form-data="selectedEvent" :close="closeEventForm"></event-form>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import { Getter, Action } from "vuex-class";

import { EventModel } from "../models/event/EventModel";
import EventForm from "@/components/event/EventForm.vue";

@Component({
  components: {
    EventForm
  }
})
export default class EventView extends Vue {
  @Getter("events") events!: EventModel[];
  @Action("getEvents") getEvents!: () => EventModel[];

  private selectedEvent: EventModel = new EventModel();
  private showEventForm: boolean = false;
  private now: Date = new Date();
  private nowDate: string = this.now.toISOString().substr(0, 10);

  get nextEvents() {
    return this.events.filter(e => e.date >= this.nowDate);
  }

  get lastEvents() {
    return this.events.filter(e => e.date < this.nowDate);
  }

  created() {
    this.getEvents();
  }

  public displayEventForm(event?: EventModel) {
    this.selectedEvent = event ? { ...event } : new EventModel();
    this.showEventForm = true;
  }

  public closeEventForm() {
    this.showEventForm = false;
  }
}
</script>

<style>
</style>