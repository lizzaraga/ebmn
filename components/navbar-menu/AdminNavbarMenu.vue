<template>
  <div class="v-menu">
    <nuxt-link class="v-item" to="/">
      <i class="bi bi-pie-chart icon"></i>
      <span class="text">My data</span>
    </nuxt-link>
    <nuxt-link class="v-item" :to="{name: 'admin-administration'}">
      <i class="bi bi-building icon"></i>
      <span class="text">General Administration</span>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>