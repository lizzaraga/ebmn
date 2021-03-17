<template>
  <div>
    <div class="d-flex">
      <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-purpose-management', hash: '/#screenings'}">Screenings</nuxt-link>
      <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-purpose-management', hash: '/#diagnosis'}">Diagnosis</nuxt-link>
      <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-purpose-management', hash: '/#surgeries'}">Surgeries</nuxt-link>
    </div>
   <!--  <div class="row">
      <div class="col-4">{{screenings}}</div>
      <div class="col-4">{{diagnosis}}</div>
      <div class="col-4">{{surgeries}}</div>
    </div> -->
    <div class="data screenings" v-show="$route.hash == '/#screenings'">
      <div class="screening card-data" :key="sc.screening_id" v-for="sc in screenings">
        <header>
          <span class="title">Loinc Code: {{sc.loinc_code}}</span>
        </header>
        <main>
          <div class="row">
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Manager status</span>
              <span class="value">{{sc.manager_status}}</span>
            </div>
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Clerk status</span>
              <span class="value">{{sc.ebase_status}}</span>
            </div>
          </div>
          <div class="d-flex mt-2 flex-column card-data-item">
            <span class="key">Description</span>
            <span class="value">{{sc.description}}</span>
          </div>
        </main>
      </div>
    </div>
    <div class="data diagnosis" v-show="$route.hash == '/#diagnosis'">
      <div class="diagnosis-item card-data" :key="dia.diagnosis_id" v-for="dia in diagnosis">
        <header>
          <span class="title">Icd Code: {{dia.icd_code}}</span>
        </header>
        <main>
          <div class="row">
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Manager status</span>
              <span class="value">{{dia.manager_status}}</span>
            </div>
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Clerk status</span>
              <span class="value">{{dia.ebase_status}}</span>
            </div>
          </div>
          <div class="d-flex mt-2 flex-column card-data-item">
            <span class="key">Description</span>
            <span class="value">{{dia.description}}</span>
          </div>
        </main>
      </div>
    </div>
    <div class="data surgeries card-data" v-show="$route.hash == '/#surgeries'">
      <div class="surgery card-data" :key="sg.surgery_id" v-for="sg in surgeries">
        <header>
          <span class="title">Cpt Code: {{sg.cpt_code}}</span>
        </header>
        <main>
          <div class="row">
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Manager status</span>
              <span class="value">{{sg.manager_status}}</span>
            </div>
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Clerk status</span>
              <span class="value">{{sg.ebase_status}}</span>
            </div>
          </div>
          <div class="d-flex mt-2 flex-column card-data-item">
            <span class="key">Description</span>
            <span class="value">{{sg.description}}</span>
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
    this.$router.replace({name: 'clerk-hospitals-ht-purpose-management', hash: '/#screenings'})
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