<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import Calendar from "./views/Calendar";

export default {
  name: "App",
  components: {
    Calendar,
    NavBar
  },
  data() {
    return {
      //
    };
  }
};
</script>
