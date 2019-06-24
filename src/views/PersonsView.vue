<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Pessoas</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-sm-right">
        <v-btn round color="primary" @click="displayPersonForm()">
          <v-icon left dark>add</v-icon>Criar pessoa
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="persons && persons.length" class="mt-1" row>
      <v-flex xs12>
        <v-card>
          <v-list two-line subheader>
            <v-list-tile v-for="person in persons" :key="person._id" avatar>
              <person-list-avatar :person="person"></person-list-avatar>
              <person-list-entry :person="person"></person-list-entry>

              <v-list-tile-action>
                <v-btn round icon ripple @click="displayPersonForm(person)">
                  <v-icon color="primary">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="showPersonForm" persistent max-width="500">
      <person-form :form-data="selectedPerson" :close="closeForm"></person-form>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import { Getter, Action } from "vuex-class";

import PersonForm from "@/components/person/PersonForm.vue";
import PersonListEntry from "@/components/person/PersonListEntry.vue";
import PersonListAvatar from "@/components/person/PersonListAvatar.vue";

import { PersonModel } from "@/models/person/PersonModel";
import { ScaleModel } from "@/models/scale/ScaleModel";
import { ScalesService } from "@/services/scales/ScalesService";

@Component({
  components: {
    PersonForm,
    PersonListEntry,
    PersonListAvatar
  }
})
export default class PersonsView extends Vue {
  @Getter("persons") persons!: PersonModel[];
  @Action("getPersons") getPersons!: () => PersonModel[];

  private selectedPerson: PersonModel = new PersonModel();
  private showPersonForm: boolean = false;
  private scales!: ScaleModel[];

  created() {
    this.getPersons();
    this.scales = ScalesService.getScales();
  }

  public displayPersonForm(person?: PersonModel) {
    this.selectedPerson = person ? { ...person } : new PersonModel();
    this.showPersonForm = true;
  }

  public closeForm() {
    this.showPersonForm = false;
  }
}
</script>

<style>
</style>