<template>
  <div>
    {{healthWorkers}}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import MainContentWithMenu from '~/components/MainContentWithMenu.vue';
import ManagerStore from '@/store/manager-store'

@Component({
  layout: 'dashboard',
  components: {
    mainContentWithMenu: MainContentWithMenu
  }
})
export default class HealthWorkersManagement extends Vue{

  private managerStore = getModule(ManagerStore, this.$store)

  
  public get healthWorkers(){
    return this.managerStore.healthWorkers
  }
  

  async mounted(){
    await this.managerStore.getHealthWorkers()
  }

}
</script>