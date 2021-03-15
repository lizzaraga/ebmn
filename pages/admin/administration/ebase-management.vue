<template>
  <div>
    {{clerks}}
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
export default class EBaseManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)

  
  public get clerks(){
    return this.adminStore.clerks
  }
  
  mounted(){
    this.adminStore.getClerks()
  }
}
</script>