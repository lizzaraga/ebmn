<template>
  <div class="v-menu">
    <nuxt-link class="v-item" to="/">
      <i class="bi bi-pie-chart icon"></i>
      <span class="text">My data</span>
    </nuxt-link>
    <nuxt-link class="v-item" :to="{name: 'clerk-hospitals'}">
      <i class="bi bi-building icon"></i>
      <span class="text">Hospital Management</span>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>