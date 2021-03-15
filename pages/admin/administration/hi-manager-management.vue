<template>
  <div>
    {{managers}}
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
export default class HIManagerManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)

  
  public get managers(){
    return this.adminStore.managers
  }
  
  mounted(){
    this.adminStore.getManagers()
  }
}
</script>