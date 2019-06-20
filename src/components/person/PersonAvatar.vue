<template>
  <v-list-tile-avatar>
    <v-icon v-if="person.gender === 'male'" class="blue lighten-1 white--text">person</v-icon>
    <v-icon v-if="person.gender === 'female'" class="pink lighten-1 white--text">person</v-icon>
  </v-list-tile-avatar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PersonModel } from "@/models/person/PersonModel";

@Component({
  props: {
    person: {
      type: PersonModel,
      required: true
    }
  }
})
export default class PersonAvatar extends Vue {}
</script>

<style>
</style>