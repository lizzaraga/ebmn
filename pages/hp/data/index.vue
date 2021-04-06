<template>
  <div >
    <patient-data :patientId="patientId"/>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import PatientData from '~/components/patient-data/PatientData.vue';
import AuthStore from '~/store/auth-store';
@Component({
  layout: 'dashboard',
  components:{
    patientData: PatientData
  }
})
export default class HpDataPage extends Vue{
  private authStore = getModule(AuthStore, this.$store)
  get patientId(){
    return this.authStore.user.id
  }
}
</script>