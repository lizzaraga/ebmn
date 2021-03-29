<template>
  <div id="radiologies">
    <div>
      {{problems}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import ProblemStore from '~/store/patient-data/problem-store';

@Component
export default class Problems extends Vue{
  private pbStore = getModule(ProblemStore, this.$store)

  
  public get problems() {
    return this.pbStore.problems
  }
  async mounted(){
    await this.pbStore.getProblems(27)
  }
}
</script>