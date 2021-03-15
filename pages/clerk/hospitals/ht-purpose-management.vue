<template>
  <div>
    <b-list-group horizontal="md">
      <b-list-group-item>Screenings</b-list-group-item>
      <b-list-group-item>Diagnosis</b-list-group-item>
      <b-list-group-item>Surgeries</b-list-group-item>
    </b-list-group>
    <div>
      <div class="">{{screenings}}</div>
      <div class="">{{diagnosis}}</div>
      <div class="">{{surgeries}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import { IClerkDiagnosis, IClerkScreening, IClerkSurgery } from '~/api/models/clerk.model';
import ClerkStore from '~/store/clerk-store';

@Component({
  layout: 'dashboard'
})
export default class HTPurposeManagement extends Vue{
  clerkStore = getModule(ClerkStore, this.$store)
  
  
  public get screenings() : IClerkScreening[] {
    return this.clerkStore.screenings
  }
  public get diagnosis() : IClerkDiagnosis[] {
    return this.clerkStore.diagnosis
  }
  public get surgeries() : IClerkSurgery[] {
    return this.clerkStore.surgeries
  }
  

  mounted(){
    const hospitalId = this.clerkStore.clerkHospital.hospital_id
    if(hospitalId){
      this.clerkStore.getScreenings(hospitalId)
      this.clerkStore.getDiagnosis(hospitalId)
      this.clerkStore.getSurgeries(hospitalId)
    }
    else alert('No hospital id')
    
  }
}
</script>