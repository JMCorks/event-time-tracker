<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 class="text-sm-left">
        <h1 class="headline">Pessoas</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-sm-right">
        <v-btn color="primary" @click="displayPersonForm()">
          <v-icon left dark>add</v-icon>Criar pessoa
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row>
      <v-flex xs12>
        <v-card>
          <v-list two-line subheader>
            <v-list-tile v-for="person in persons" :key="person._id" avatar>
              <v-list-tile-avatar>
                <v-icon class="blue lighten-1 white--text">person</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ person.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ person.email }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="primary" @click="displayPersonForm(person)">edit</v-icon>
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

@Component({
  components: {
    PersonForm
  }
})
export default class PersonsView extends Vue {
  @Getter("persons") persons!: PersonForm[];
  @Action("getPersons") getPersons!: () => PersonForm[];

  private selectedPerson: PersonForm = new PersonForm();
  private showPersonForm: boolean = false;

  created() {
    this.getPersons();
  }

  public displayPersonForm(person?: PersonForm) {
    this.selectedPerson = person ? { ...person } : new PersonForm();
    this.showPersonForm = true;
  }

  public closeForm() {
    this.showPersonForm = false;
  }
}
</script>

<style>
</style>