<template>
  <div>
    <main-content-with-menu>
      <template #menu>
        <nuxt-link class="aside-menu-link" :to="{name: 'manager-hospitals-health-workers-management'}">Health Workers Management</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: 'manager-hospitals-ht-purpose-management'}">Health Technology Purpose Management</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: 'manager-hospitals-ht-physical-nature'}">Health Technology Physical Nature</nuxt-link>
      </template>
      <nuxt-child/>
    </main-content-with-menu>
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
export default class Hospitals extends Vue{
  
}
</script>