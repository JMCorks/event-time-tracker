<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view/>
    </v-content>
    <v-snackbar v-model="snackbar.showSnackbar" :timeout="5000" bottom :color="snackbar.color">
      <span>{{ snackbar.message }}</span>
      <v-btn color="white" flat @click="snackbar.showSnackbar = false;">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import { Getter } from "vuex-class";
import { SnackBarModel } from "./models/SnackBar";

@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  @Getter("snackbar") snackbar!: SnackBarModel;
}
</script>
