<template>
  <div>
    
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import MainContentWithMenu from '~/components/MainContentWithMenu.vue';

@Component({
  layout: 'dashboard',
  components: {
    mainContentWithMenu: MainContentWithMenu
  }
})
export default class HTPurposeManagement extends Vue{

}
</script>