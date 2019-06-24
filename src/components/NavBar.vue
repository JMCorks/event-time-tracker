<template>
  <nav>
    <v-toolbar flat dark color="primary" app>
      <v-avatar color="grey lighten-4">
        <img src="../assets/btt-round-logo.jpg" alt="avatar">
      </v-avatar>
      <v-toolbar-title class="headline">
        <span>CicloClube BTT Elvas - Gestor de provas</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="minimize" icon>
        <v-icon>minimize</v-icon>
      </v-btn>

      <v-btn @click="maximize" icon>
        <v-icon>filter_none</v-icon>
      </v-btn>

      <v-btn @click="close" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app :mini-variant="mini" hide-overlay stateless>
      <v-toolbar color="primary" flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-btn round color="white" icon v-if="mini" @click.stop="mini = !mini">
              <v-icon color="primary">chevron_right</v-icon>
            </v-btn>

            <v-list-tile-content>
              <v-list-tile-title class="white--text">Menu</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn round color="white" icon v-if="!mini" @click.stop="mini = !mini">
                <v-icon color="primary">chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in items" :key="item.title" router :to="item.route">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
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
import electron from "electron";

@Component
export default class NavBar extends Vue {
  items = [
    { title: "Calendário", icon: "date_range", route: "/calendar" },
    { title: "Eventos", icon: "event", route: "/events" },
    { title: "Pessoas", icon: "people", route: "/persons" },
    { title: "Escalões", icon: "list", route: "/scales" },
    { title: "Gerir provas", icon: "group_add", route: "/manage-contest" },
    { title: "Provas", icon: "timer", route: "/contests" }
  ];

  drawer: boolean = true;
  mini: boolean = true;

  public minimize() {
    /* const window = electron.remote.getCurrentWindow();
    window.minimize(); */
  }

  public close() {
    /* const window = electron.remote.getCurrentWindow();
    window.close(); */
  }

  public maximize() {
    /* var window = electron.remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    } */
  }
}
</script>

<style>
</style>