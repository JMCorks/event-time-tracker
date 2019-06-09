<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="pa-3">
      <v-text-field
        v-model="eventFormData.title"
        :rules="requiredFieldValidation"
        label="Título"
        required
      ></v-text-field>
      <v-text-field
        v-model="eventFormData.organizerEmail"
        :rules="emailValidation"
        label="E-mail"
        required
      ></v-text-field>

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
            label="Data do evento"
            prepend-icon="event"
            :rules="requiredFieldValidation"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="datepickerMenu = false"></v-date-picker>
      </v-menu>

      <v-btn :disabled="!valid" color="success" @click="validate">Criar</v-btn>
      <v-btn color="error" @click="close">Cancelar</v-btn>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EventModel } from "@/models/event/EventModel";

@Component({
  props: {
    eventFormData: {
      type: EventModel,
      required: true
    },
    close: {
      type: Function,
      required: true
    }
  }
})
export default class EventForm extends Vue {
  public valid: boolean = true;
  public datepickerMenu: boolean = false;
  public date: string = new Date().toISOString().substr(0, 10);

  public requiredFieldValidation: [(f: string) => any] = [
    (f: string) => !!f || "Campo obrigatório"
  ];

  public emailValidation: [(f: string) => any] = [
    (f: string) => /.+@.+/.test(f) || "E-mail inválido"
  ];

  public validate() {
    if ((this.$refs.form as HTMLFormElement).validate()) {
      this.reset();
      this.resetValidation();
      this.close();
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