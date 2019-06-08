<template>
  <v-app>
    <v-toolbar dark color="primary" app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>CicloClube BTT Elvas</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    HelloWorld,
    Home
  },
  data() {
    return {
      //
    };
  }
};
</script>
