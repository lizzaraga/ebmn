<template>
  <div >
    <patient-data :patientId="patientId"/>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import PatientData from '~/components/patient-data/PatientData.vue';
import IdStore from '~/store/patient-data/id-store';
@Component({
  layout: 'dashboard',
  components:{
    patientData: PatientData
  }
})
export default class HpPatientsID extends Vue{
  private idStore = getModule(IdStore, this.$store)
  get patientId(){
    return this.idStore.patientId
  }
}
</script>