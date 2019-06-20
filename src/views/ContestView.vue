<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Prova {{eventId}}</h1>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row></v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ContestView extends Vue {
  private eventId: string = this.$route.params.id;
}
</script>

<style>
</style>