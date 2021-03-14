<template>
  <div class="v-menu">
    <nuxt-link class="v-item" :to="{name: 'patient'}">
      <i class="bi bi-pie-chart icon"></i>
      <span class="text">My data</span>
    </nuxt-link>
    <nuxt-link class="v-item" :to="{name: 'patient-emergencies'}">
      <i class="bi bi-exclamation-square icon"></i>
      <span class="text">Emergencies</span>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>