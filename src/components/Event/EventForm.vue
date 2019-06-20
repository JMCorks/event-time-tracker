<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="pa-3">
      <v-text-field
        v-model="formData.title"
        :rules="requiredFieldValidation"
        label="Título"
        required
      ></v-text-field>
      <v-text-field
        v-model="formData.organizerEmail"
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
            v-model="formData.date"
            label="Data do evento"
            prepend-icon="event"
            :rules="requiredFieldValidation"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="formData.date" @input="datepickerMenu = false"></v-date-picker>
      </v-menu>

      <v-textarea v-model="formData.details" label="Descrição"></v-textarea>

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

import { EventModel } from "@/models/event/EventModel";

@Component({
  props: {
    formData: {
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
  @Action("postEvents") postEvents!: (newEvent: EventModel) => EventModel;
  @Action("putEvent") putEvent!: (event: EventModel) => EventModel;
  @Prop() formData!: EventModel;
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

  private mapFormToEvent(): EventModel {
    let event: EventModel = new EventModel(
      this.formData.title,
      this.formData.date,
      this.formData.details,
      this.formData.organizerEmail
    );

    if (!this.isCreating) {
      event._id = this.formData._id;
      event.contesters = this.formData.contesters;
    }

    return event;
  }

  public validateAndSubmit() {
    if ((this.$refs.form as HTMLFormElement).validate()) {
      if (this.isCreating) {
        this.postEvents(this.mapFormToEvent());
      } else {
        this.putEvent(this.mapFormToEvent());
      }

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