<template>
  <div>
    {{hospitals}}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import AdminStore from '@/store/admin-store'

@Component({
  layout: 'dashboard'
})
export default class HIManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)

  
  public get hospitals(){
    return this.adminStore.hospitals
  }
  
  mounted(){
    this.adminStore.getHospitals()
  }
}
</script>