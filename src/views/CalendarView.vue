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
              <template v-for="event in eventsMap[date]">
                <v-menu :key="event.title" v-model="event.open" full-width offset-x>
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
                      <v-btn icon>
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="event.title"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>favorite</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.details"></span>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat color="secondary">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <v-btn color="primary" @click="$refs.calendar.prev()">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 class="text-sm-right">
        <v-btn color="primary" @click="$refs.calendar.next()">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MapperForState } from "vuex";
import { State, Action, Getter } from "vuex-class";
import { EventModel } from "../models/event/EventModel";

@Component
export default class CalendarView extends Vue {
  @Getter("events") events: EventModel[];
  @Action("getEvents") getEvents: any;

  private now: Date = new Date();
  public today: string = `${this.now.getFullYear()}-${this.now.getMonth() +
    1}-${this.now.getDate()}`;

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
