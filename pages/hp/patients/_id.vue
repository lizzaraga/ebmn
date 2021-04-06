<template>
  <nuxt-child/>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
@Component({
  validate({route}){
    return !isNaN(Number(route.params.id))
  }
})
export default class HpPatients extends Vue{

}
</script>