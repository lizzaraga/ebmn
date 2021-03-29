<template>
  <div >
    <patient-data/>
  </div>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import Vue from 'vue'
import PatientData from '~/components/patient-data/PatientData.vue';
@Component({
  layout: 'dashboard',
  components:{
    patientData: PatientData
  }
})
export default class ManagerDataPage extends Vue{
  
}
</script>