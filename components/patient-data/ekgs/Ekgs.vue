<template>
  <div id="ekgs">
    <div>
      {{ekgs}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import EkgStore from '@/store/patient-data/ekg-store'

@Component
export default class Ekgs extends Vue{
  private ekgStore = getModule(EkgStore, this.$store)

  
  public get ekgs() {
    return this.ekgStore.ekgs
  }
  async mounted(){
    await this.ekgStore.getEkgs(27)
  }
}
</script>