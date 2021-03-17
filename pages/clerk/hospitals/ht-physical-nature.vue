<template>
  <div>
    <div class="d-flex">
      <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-physical-nature', hash: '/#drugs'}">Drugs</nuxt-link>
      <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-physical-nature', hash: '/#vaccines'}">Vaccines</nuxt-link>
    </div>
    <!-- <div class="row">
      <div class="col-6">{{drugs}}</div>
      <div class="col-6">{{vaccines}}</div>
    </div> -->
     <div class="data drugs" v-show="$route.hash == '/#drugs'">
      <div class="drug card-data" :key="dg.medication_id" v-for="dg in drugs">
        <header>
          <span class="title">Rxnorm Code: {{dg.rxnorm_code}}</span>
        </header>
        <main>
          <div class="d-flex flex-column card-data-item">
            <span class="key">Description</span>
            <span class="value">{{dg.description}}</span>
          </div>
        </main>
      </div>
    </div>
    <div class="data vaccines" v-show="$route.hash == '/#vaccines'">
      <div class="vaccine card-data" :key="vac.immunization_id" v-for="vac in vaccines">
        <header>
          <span class="title">Cvx Code: {{vac.cvx_code}}</span>
        </header>
        <main>
          <div class="d-flex flex-column card-data-item">
            <span class="key">Description</span>
            <span class="value">{{vac.description}}</span>
          </div>
        </main>
      </div>
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
    this.$router.replace({name: 'clerk-hospitals-ht-physical-nature', hash: '/#drugs'})
    const hospitalId = this.clerkStore.clerkHospital.hospital_id
    if(hospitalId){
      this.clerkStore.getVaccines(hospitalId)
      this.clerkStore.getDrugs(hospitalId)
    }
    else alert('No hospital id')
    
  }
}
</script>