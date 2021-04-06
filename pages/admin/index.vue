<template>
  <div>
    
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component({
  layout: 'dashboard'
})
export default class Admin extends Vue{
  mounted(){
    this.$router.push({name: 'admin-data'})
  }

}
</script>