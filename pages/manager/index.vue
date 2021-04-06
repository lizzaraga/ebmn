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
export default class Manager extends Vue{
  mounted(){
    this.$router.push({name: 'manager-data'})
  }
}
</script>