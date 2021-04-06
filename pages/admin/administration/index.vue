<template>
  <div></div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted(){
    this.$router.push({name: 'admin-administration-hi-management'})
  }
})
</script>