<template>
  <div id="allergies">
    <div>
      {{abusiveSubstances}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import ASStore from '~/store/patient-data/as-store';

@Component
export default class AbusiveSubstances extends Vue{
  private asStore = getModule(ASStore, this.$store)

  
  public get abusiveSubstances() {
    return this.asStore.abusiveSubstances
  }
  async mounted(){
    await this.asStore.getAS(27)
  }
}
</script>