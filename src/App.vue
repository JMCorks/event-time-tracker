<template>
  <v-app>
    <NavBar />
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import NavBar from "./components/NavBar";
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    HelloWorld,
    Home,
    NavBar
  },
  data() {
    return {
      //
    };
  }
};
</script>
