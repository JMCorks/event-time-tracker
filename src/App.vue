<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view/>
    </v-content>
    <v-snackbar v-model="showSnackbar" :timeout="5000" bottom :color="snackbar.color">
      <span>{{ snackbar.text }}</span>
      <v-btn color="white" flat @click="showSnackbar = false;">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  public showSnackbar: boolean = false;
  public snackbar = {
    color: "red",
    text: "test"
  };
}
</script>
