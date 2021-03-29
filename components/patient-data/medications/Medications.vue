<template>
  <div id="medications">
    <div>
      {{medications}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import MedicationStore from '~/store/patient-data/medication-store';

@Component
export default class Medications extends Vue{
  private medicationStore = getModule(MedicationStore, this.$store)

  
  public get medications() {
    return this.medicationStore.medications
  }
  async mounted(){
    await this.medicationStore.getMedications(27)
  }
}
</script>