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

  &>.main-content-menu{
    border-right: 1px solid #eee;
    padding: 0.8rem;
  }
}
</style>