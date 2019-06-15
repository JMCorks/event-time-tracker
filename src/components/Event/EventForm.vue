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
            v-model="eventFormData.date"
            label="Data do evento"
            prepend-icon="event"
            :rules="requiredFieldValidation"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="eventFormData.date" @input="datepickerMenu = false"></v-date-picker>
      </v-menu>

      <v-textarea v-model="eventFormData.details" label="Descrição"></v-textarea>

      <v-btn
        :disabled="!valid"
        color="success"
        @click="validateAndSubmit"
      >{{ isCreating? 'Criar': 'Actualizar' }}</v-btn>
      <v-btn color="error" @click="close">Cancelar</v-btn>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { EventModel } from "@/models/event/EventModel";
import { Action } from "vuex-class";

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
  @Action("postEvents") postEvents!: (newEvent: EventModel) => EventModel;
  @Action("putEvent") putEvent!: (event: EventModel) => EventModel;
  @Prop() eventFormData!: EventModel;
  @Prop() close!: Function;

  public valid: boolean = true;
  public datepickerMenu: boolean = false;
  public date: string = new Date().toISOString().substr(0, 10);

  get isCreating(): boolean {
    return !this.eventFormData._id;
  }

  public requiredFieldValidation: [(f: string) => any] = [
    (f: string) => !!f || "Campo obrigatório"
  ];

  public emailValidation: [(f: string) => any] = [
    (f: string) => /.+@.+/.test(f) || "E-mail inválido"
  ];

  private mapFormToEvent(): EventModel {
    let event: EventModel = new EventModel();

    if (!this.isCreating) {
      event._id = this.eventFormData._id;
    }

    event.title = this.eventFormData.title;
    event.date = this.eventFormData.date;
    event.details = this.eventFormData.details;
    event.organizerEmail = this.eventFormData.organizerEmail;
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