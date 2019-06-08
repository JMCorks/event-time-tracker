<template>
  <nav>
    <v-toolbar flat dark color="primary" app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-avatar color="grey lighten-4">
        <img src="../assets/btt-round-logo.jpg" alt="avatar">
      </v-avatar>
      <v-toolbar-title class="headline">
        <span>CicloClube BTT Elvas</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app :mini-variant.sync="mini" hide-overlay stateless>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-btn icon v-if="mini" @click.stop="mini = !mini">
              <v-icon color="primary">chevron_right</v-icon>
            </v-btn>

            <v-list-tile-content>
              <v-list-tile-title>Menu</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon v-if="!mini" @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  data(): any {
    return {
      drawer: false,
      snackbar: false,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      mini: true,
      right: null
    };
  }
}
</script>

<style>
</style>