<template>
  <div>
    <b-list-group horizontal="md">
      <b-list-group-item>Drugs</b-list-group-item>
      <b-list-group-item>Vaccines</b-list-group-item>
    </b-list-group>
    <div>
      <div class="">{{vaccines}}</div>
      <div class="">{{drugs}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import { IClerkDrug, IClerkVaccine } from '~/api/models/clerk.model';
import ClerkStore from '~/store/clerk-store';
import HospitalStore from '~/store/hospital-store';

@Component({
  layout: 'dashboard'
})
export default class HTPhysicalNature extends Vue{
  clerkStore = getModule(ClerkStore, this.$store)
  
  
  public get vaccines() : IClerkVaccine[] {
    return this.clerkStore.vaccines
  }
  public get drugs() : IClerkDrug[] {
    return this.clerkStore.drugs
  }
  

  mounted(){
    const hospitalId = this.clerkStore.clerkHospital.hospital_id
    if(hospitalId){
      this.clerkStore.getVaccines(hospitalId)
      this.clerkStore.getDrugs(hospitalId)
    }
    else alert('No hospital id')
    
  }
}
</script>