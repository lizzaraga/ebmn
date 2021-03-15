<template>
  <div>
    <main-content-with-menu>
      <template #menu>
        <nuxt-link class="aside-menu-link" :to="{name: 'admin-administration-hi-management'}">Health Institute Management</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: 'admin-administration-hi-manager-management'}">Health Institute Manager Management</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: 'admin-administration-guidelines'}">Guidelines</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: 'admin-administration-ebase-management'}">eBASE User Management</nuxt-link>
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
export default class Administration extends Vue{

}
</script>