<template>
  <div id="surgeries">
    <div>
      {{surgeries}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import SurgeryStore from '@/store/patient-data/surgery-store'
@Component
export default class Surgeries extends Vue{
  private surgeryStore = getModule(SurgeryStore, this.$store)

  
  public get surgeries() {
    return this.surgeryStore.surgeries
  }
  async mounted(){
    await this.surgeryStore.getSurgeries(27)
  }
}
</script>