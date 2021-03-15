<template>
  <div>
    <div class="row">
      <div class="col-6">{{drugs}}</div>
      <div class="col-6">{{vaccines}}</div>
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
export default class HTPhysicalNature extends Vue{

  private managerStore = getModule(ManagerStore, this.$store)

  public get drugs() {
    return this.managerStore.drugs
  }
  public get vaccines() {
    return this.managerStore.vaccines
  }

  async mounted(){
    this.managerStore.getVaccines()
    this.managerStore.getDrugs()
  }
  
}
</script>