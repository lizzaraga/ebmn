<template>
  <div>
    <main>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque minus necessitatibus officia. Consequuntur hic pariatur, cum illo rem vel possimus!
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component({
  layout: 'dashboard',
  
})
export default class HpPatients extends Vue{
  mounted(){
    //this.$router.push({name: 'hp-patients-id', params: {id: 27+''}})
  }
}
</script>