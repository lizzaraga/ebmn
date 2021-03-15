<template>
  <div>
    {{guidelines}}
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
export default class Guidelines extends Vue{

  private adminStore = getModule(AdminStore, this.$store)

  
  public get guidelines(){
    return this.adminStore.guidelines
  }
  
  mounted(){
    this.adminStore.getGuidelines()
  }

}
</script>