<template>
  <div id="allergies">
    <div>
      {{allergies}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import AllergyStore from '~/store/patient-data/allergy-store';

@Component
export default class Allergies extends Vue{
  private allergyStore = getModule(AllergyStore, this.$store)

  
  public get allergies() {
    return this.allergyStore.allergies
  }
  async mounted(){
    await this.allergyStore.getAllergies(27)
  }
}
</script>