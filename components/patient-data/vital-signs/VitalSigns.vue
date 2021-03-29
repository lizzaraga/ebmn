<template>
  <div id="vital-signs">
    <div>
      {{vitalSigns}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import VSStore from '~/store/patient-data/vs-store';

@Component
export default class VitalSigns extends Vue{
  private vsStore = getModule(VSStore, this.$store)

  
  public get vitalSigns() {
    return this.vsStore.vitalSigns
  }
  async mounted(){
    await this.vsStore.getVitalSigns(27)
  }
}
</script>