<template>
  <v-list-tile-content>
    <v-list-tile-title>{{ person.name }} - {{getPersonAge(person.birth)}}</v-list-tile-title>
    <v-list-tile-sub-title>{{ person.email }} - {{getPersonScale(getPersonAge(person.birth), person.gender)}}</v-list-tile-sub-title>
  </v-list-tile-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PersonModel } from "@/models/person/PersonModel";
import { ScalesService } from "../../services/scales/ScalesService";

@Component({
  props: {
    person: {
      type: PersonModel,
      required: true
    }
  }
})
export default class PersonListEntry extends Vue {
  public getPersonAge(birth: string) {
    return ScalesService.getPersonAge(birth);
  }

  public getPersonScale(age: number, gender: string) {
    return ScalesService.getPersonScale(age, gender);
  }
}
</script>

<style>
</style>