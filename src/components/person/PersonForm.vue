<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="pa-3">
      <v-card-title primary-title>
        <div>
          <h3
            class="headline mb-0"
          >{{formData._id? 'Editar pessoa ' + formData.name: 'Criar nova pessoa'}}</h3>
        </div>
      </v-card-title>

      <v-text-field v-model="formData.name" :rules="requiredFieldValidation" label="Nome" required></v-text-field>

      <v-text-field v-model="formData.email" :rules="emailValidation" label="E-mail" required></v-text-field>

      <v-menu
        v-model="datepickerMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="formData.birth"
            label="Data de nascimento"
            prepend-icon="event"
            :rules="requiredFieldValidation"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="formData.birth" @input="datepickerMenu = false"></v-date-picker>
      </v-menu>

      <v-text-field
        v-model="formData.idCard"
        :rules="requiredFieldValidation"
        label="Identificador"
        required
      ></v-text-field>

      <v-radio-group v-model="formData.gender" row>
        <v-radio label="Masculino" value="male" key="male"/>
        <v-radio label="Feminino" value="female" key="female"/>
      </v-radio-group>

      <v-btn
        round
        :disabled="!valid"
        color="success"
        @click="validateAndSubmit"
      >{{ isCreating? 'Criar': 'Actualizar' }}</v-btn>
      <v-btn round color="error" @click="close">Cancelar</v-btn>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Action } from "vuex-class";
import { Component, Vue, Prop } from "vue-property-decorator";

import { PersonModel } from "@/models/person/PersonModel";

@Component({
  props: {
    formData: {
      type: PersonModel,
      required: true
    },
    close: {
      type: Function,
      required: true
    }
  }
})
export default class PersonForm extends Vue {
  @Action("postPersons") postPersons!: (
    newEvent: PersonModel
  ) => Promise<void | PersonModel>;

  @Action("putPerson") putPerson!: (
    event: PersonModel
  ) => Promise<void | PersonModel>;

  @Action("showSuccessMessage") showSuccessMessage!: (message: string) => void;
  @Action("showErrorMessage") showErrorMessage!: (message: string) => void;
  @Prop() formData!: PersonModel;
  @Prop() close!: Function;

  public valid: boolean = true;
  public datepickerMenu: boolean = false;

  get isCreating(): boolean {
    return !this.formData._id;
  }

  public requiredFieldValidation: [(f: string) => any] = [
    (f: string) => !!f || "Campo obrigatório"
  ];

  public emailValidation: [(f: string) => any] = [
    (f: string) => /.+@.+/.test(f) || "E-mail inválido"
  ];

  private mapFormToEvent(): PersonModel {
    let person: PersonModel = new PersonModel();

    if (!this.isCreating) {
      person._id = this.formData._id;
    }

    person.name = this.formData.name;
    person.birth = this.formData.birth;
    person.idCard = this.formData.idCard;
    person.email = this.formData.email;
    person.gender = this.formData.gender;
    return person;
  }

  public validateAndSubmit() {
    if ((this.$refs.form as HTMLFormElement).validate()) {
      let action: Promise<void | PersonModel>;

      if (this.isCreating) {
        action = this.postPersons(this.mapFormToEvent());
      } else {
        action = this.putPerson(this.mapFormToEvent());
      }

      action
        .then(result => {
          if (this.isCreating) {
            this.showSuccessMessage("Pessoa criada com sucesso.");
          } else {
            this.showSuccessMessage("Pessoa actualizada com sucesso.");
          }

          this.reset();
          this.resetValidation();
          this.close();
        })
        .catch(error => {
          if (this.isCreating) {
            this.showErrorMessage("Erro a criar a pessoa. Erro: " + error);
          } else {
            this.showErrorMessage("Erro a actualizar a pessoa. Erro: " + error);
          }
        });
    }
  }

  private reset() {
    (this.$refs.form as HTMLFormElement).reset();
  }

  private resetValidation() {
    (this.$refs.form as HTMLFormElement).resetValidation();
  }
}
</script>

<style>
</style>