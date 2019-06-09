<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="event.title" :rules="requiredFieldValidation" label="Título" required></v-text-field>
    <v-text-field v-model="event.organizerEmail" :rules="emailValidation" label="E-mail" required></v-text-field>

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
          v-model="date"
          label="Picker without buttons"
          prepend-icon="event"
          :rules="requiredFieldValidation"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" @input="datepickerMenu = false"></v-date-picker>
    </v-menu>

    <v-btn :disabled="!valid" color="success" @click="validate">Criar</v-btn>
    <v-btn color="error" @click="reset">Limpar</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EventModel } from "@/models/Event/EventModel";

@Component
export default class EventForm extends Vue {
  public valid: boolean = true;

  public requiredFieldValidation: (f: string) => any = (f: string) =>
    !!f || "Campo obrigatório";

  public emailValidation: (f: string) => any = (f: string) =>
    /.+@.+/.test(f) || "E-mail inválido";

  public event: EventModel = new EventModel();

  validate() {
    if ((this.$refs.form as HTMLFormElement).validate()) {
    }
  }

  reset() {
    (this.$refs.form as HTMLFormElement).reset();
  }
}
</script>

<style>
</style>