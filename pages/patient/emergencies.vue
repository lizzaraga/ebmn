<template>
  <div>
    <main-content-with-menu>
      <template #menu>
        <nuxt-link class="aside-menu-link" :to="{name: 'patient-emergencies'}">Emergency notifications</nuxt-link>
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
export default class Emergencies extends Vue{

}
</script>