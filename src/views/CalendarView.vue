<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Calendário</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-sm-right"></v-flex>
    </v-layout>
    <v-layout class="mt-4">
      <v-flex>
        <v-sheet height="500">
          <v-calendar v-model="start" ref="calendar" :now="today" :value="today" color="primary">
            <template v-slot:day="{ date }">
              <div v-for="event in eventsMap[date]" :key="event._id">
                <template>
                  <v-menu :key="event._id" v-model="event.open" full-width offset-x>
                    <template v-slot:activator="{ on }">
                      <div
                        v-if="!event.time"
                        v-ripple
                        class="my-event"
                        v-on="on"
                        v-html="event.title"
                      ></div>
                    </template>
                    <v-card color="grey lighten-4" min-width="350px" flat>
                      <v-toolbar color="primary" dark>
                        <v-toolbar-title v-html="event.title"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn round icon @click="displayEventForm(event)">
                          <v-icon>edit</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-title primary-title>
                        <div>
                          <v-icon class="mr-1" color="primary">mail</v-icon>
                          {{event.organizerEmail}}
                        </div>
                      </v-card-title>
                      <v-card-text>
                        <div>{{event.details}}</div>
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </template>
              </div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <v-btn round color="primary" @click="$refs.calendar.prev()">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 class="text-sm-right">
        <v-btn round color="primary" @click="$refs.calendar.next()">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="showEventForm" persistent max-width="500">
      <event-form :form-data="selectedEvent" :close="closeEventForm"></event-form>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MapperForState } from "vuex";
import { State, Action, Getter } from "vuex-class";
import { EventModel } from "../models/event/EventModel";
import EventForm from "@/components/event/EventForm.vue";

@Component({
  components: {
    EventForm
  }
})
export default class CalendarView extends Vue {
  @Getter("events") events!: EventModel[];
  @Action("getEvents") getEvents!: () => EventModel[];

  private showEventForm: boolean = false;
  private selectedEvent: EventModel = new EventModel();

  private now: Date = new Date();
  public today: string = this.now.toISOString().substr(0, 10);

  public start: string = `${this.now.getFullYear()}-${this.now.getMonth() +
    1}-01`;

  get eventsMap() {
    const map: any = {};
    this.events.forEach((e: any) => (map[e.date] = map[e.date] || []).push(e));
    return map;
  }

  created() {
    this.getEvents();
  }

  public displayEventForm(event: EventModel) {
    this.selectedEvent = event ? { ...event } : new EventModel();
    this.showEventForm = true;
  }

  public closeEventForm() {
    this.showEventForm = false;
  }
}
</script>

<style>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
