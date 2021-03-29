<template>
  <div id="legal-docs">
    <div>
      {{ld}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import LDStore from '~/store/patient-data/ld-store';
@Component
export default class LegalDocs extends Vue{
  private ldStore = getModule(LDStore, this.$store)
  
  public get ld() {
    return this.ldStore.docs
  }
  async mounted(){
    await this.ldStore.getDocs(27)
  }
}
</script>