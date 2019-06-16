<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Escalões</h1>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row>
      <v-flex xs12>
        <v-card>
          <v-list two-line subheader>
            <v-subheader inset class="blue--text">Escalões masculinos</v-subheader>

            <v-list-tile v-for="scale in maleScales" :key="scale.name" avatar>
              <v-list-tile-avatar>
                <v-icon class="blue lighten-1 white--text">people</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ scale.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ scale.fromAge }} anos - {{ scale.toAge }} anos</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-subheader inset class="pink--text">Escalões femininos</v-subheader>

            <v-list-tile v-for="scale in femaleScales" :key="scale.name" avatar>
              <v-list-tile-avatar>
                <v-icon class="pink lighten-1 white--text">people</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ scale.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ scale.fromAge }} anos - {{ scale.toAge }} anos</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { ScaleModel } from "@/models/scale/ScaleModel";
import { ScalesService } from "@/services/scales/ScalesService";
import { GenderEnum } from "../services/scales/GenderEnum";

@Component
export default class ScalesView extends Vue {
  private scales!: ScaleModel[];

  get maleScales() {
    return this.scales.filter(s => s.gender === GenderEnum.Male);
  }

  get femaleScales() {
    return this.scales.filter(s => s.gender === GenderEnum.Female);
  }

  created() {
    this.scales = ScalesService.getScales();
  }
}
</script>

<style>
</style>