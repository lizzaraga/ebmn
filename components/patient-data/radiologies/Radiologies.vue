<template>
  <div id="radiologies">
    <div>
      {{radiologies}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import RadiologyStore from '~/store/patient-data/radiology-store';

@Component
export default class Radiologies extends Vue{
  private radiologyStore = getModule(RadiologyStore, this.$store)

  
  public get radiologies() {
    return this.radiologyStore.radiologies
  }
  async mounted(){
    await this.radiologyStore.getRadiologies(27)
  }
}
</script>