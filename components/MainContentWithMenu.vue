<template>
  <div class="main-content-with-menu">
    <section class="main-content-menu">
      <slot name="menu"/>
    </section>
    <div class="main-content">
      <slot/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class MainContentWithMenu extends Vue{

}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/base/_variables.scss';
.main-content-with-menu{
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
  overflow: hidden;
  

  &>.main-content-menu{
    padding-top: $navbar-thickness;
    //border-right: 1px solid #000;
    //background-color: #fdfeff;
    background-color: #E1E9F1;
    
    //box-shadow: 4px 0 12px rgba($color: #000000, $alpha: 0.1);
    z-index: 4;
    height: 100vh;
    overflow-y: auto;
  }
  &>.main-content{
    //padding-top: $navbar-thickness;
    position: relative;
    overflow-y: auto;
    background-color: #EDF1F5;
    
  }
}
</style>