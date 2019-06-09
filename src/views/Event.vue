<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Eventos</h1>
      </v-flex>
    </v-layout>
    <v-layout class="mt-4" row>
      <v-flex xs12>
        <v-card>
          <v-list two-line subheader>
            <v-subheader inset class="blue--text">Próximos eventos</v-subheader>

            <v-list-tile v-for="item in items" :key="item.title" avatar @click>
              <v-list-tile-avatar>
                <v-icon class="blue lighten-1 white--text">bookmark</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="primary">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-subheader inset>Eventos concluidos</v-subheader>

            <v-list-tile v-for="item in items2" :key="item.title" avatar @click>
              <v-list-tile-avatar>
                <v-icon class="grey white--text">bookmark_border</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn  icon ripple>
                  <v-icon color="primary">timeline</v-icon>
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

@Component
export default class Event extends Vue {
  items: any = [
    {
      title: "Photos",
      subtitle: "Jan 9, 2014"
    },
    {
      title: "Recipes",
      subtitle: "Jan 17, 2014"
    },
    {
      title: "Work",
      subtitle: "Jan 28, 2014"
    }
  ];

  items2: any = [
    {
      title: "Vacation itinerary",
      subtitle: "Jan 20, 2014"
    },
    {
      title: "Kitchen remodel",
      subtitle: "Jan 10, 2014"
    }
  ];
}
</script>

<style>
</style>