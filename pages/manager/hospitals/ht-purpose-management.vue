<template>
  <div>
    <div class="row">
      <div class="col-4">{{screenings}}</div>
      <div class="col-4">{{diagnosis}}</div>
      <div class="col-4">{{surgeries}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import MainContentWithMenu from '~/components/MainContentWithMenu.vue';
import ManagerStore from '~/store/manager-store';

@Component({
  layout: 'dashboard',
  components: {
    mainContentWithMenu: MainContentWithMenu
  }
})
export default class HTPurposeManagement extends Vue{
  private managerStore = getModule(ManagerStore, this.$store)

  public get screenings() {
    return this.managerStore.screenings
  }
  public get diagnosis() {
    return this.managerStore.diagnosis
  }
  public get surgeries() {
    return this.managerStore.surgeries
  }

  async mounted(){
    this.managerStore.getScreenings()
    this.managerStore.getDiagnosis()
    this.managerStore.getSurgeries()
  }
}
</script>