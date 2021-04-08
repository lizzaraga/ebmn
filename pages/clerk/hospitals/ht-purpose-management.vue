<template>
  <div class="data-grid">
    <div class="data-grid-main">
      <div>
        <div class="d-flex">
          <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-purpose-management', hash: '/#screenings'}">Screenings</nuxt-link>
          <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-purpose-management', hash: '/#diagnosis'}">Diagnosis</nuxt-link>
          <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-purpose-management', hash: '/#surgeries'}">Surgeries</nuxt-link>
        </div>
      
        <div class="patient-data-grid" v-show="$route.hash == '/#screenings'">
          <div class="data-item" :key="sc.screening_id" v-for="sc in screenings">
            <header>
              <div class="title-field">
                <span class="title-key">Loinc Code:</span>
                <span class="title-value">{{sc.loinc_code}}</span>
              </div>
              <div class="actions">
                <i @click="openEditScreening(sc)" class="bi bi-pen action"></i>
              </div>
            </header>
            <main>
              <div class="data-row">
                <span class="data-key">Description</span>
                <span class="data-value">{{sc.description}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Manager status</span>
                <span class="data-value">{{sc.manager_status}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Clerk status</span>
                <span class="data-value">{{sc.ebase_status}}</span>
              </div>
            </main>
          </div>
        </div>
        <div class="patient-data-grid" v-show="$route.hash == '/#diagnosis'">
          <div class="data-item" :key="dia.diagnosis_id" v-for="dia in diagnosis">
            <header>
              <div class="title-field">
                <span class="title-key">Icd Code:</span>
                <span class="title-value">{{dia.icd_code}}</span>
              </div>
              <div class="actions">
                <i @click="openEditDiagnosis(dia)" class="bi bi-pen action"></i>
              </div>
            </header>
            <main>
              <div class="data-row">
                <span class="data-key">Description</span>
                <span class="data-value">{{dia.description}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Manager status</span>
                <span class="data-value">{{dia.manager_status}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Clerk status</span>
                <span class="data-value">{{dia.ebase_status}}</span>
              </div>
            </main>
          </div>
        </div>
        <div class="patient-data-grid" v-show="$route.hash == '/#surgeries'">
          <div class="data-item" :key="sg.surgery_id" v-for="sg in surgeries">
            <header>
              <div class="title-field">
                <span class="title-key">Cpt Code:</span>
                <span class="title-value">{{sg.cpt_code}}</span>
              </div>
              <div class="actions">
                <i @click="openEditSurgery(sg)" class="bi bi-pen action"></i>
              </div>
            </header>
            <main>
              <div class="data-row">
                <span class="data-key">Description</span>
                <span class="data-value">{{sg.description}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Manager status</span>
                <span class="data-value">{{sg.manager_status}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Clerk status</span>
                <span class="data-value">{{sg.ebase_status}}</span>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
    <b-modal hide-header hide-footer  body-class="x-modal" id="edit-purpose-management-modal">
      <header class="x-modal__header">
        <span class="title">Edit clerk status</span>
      </header>
      <main>
        <form id="edit-purpose-management-form" @click.prevent>
          <b-row>
            <b-col>
              <b-form-group label="Clerk status">
                <b-form-select 
                name='ebase_status'
                :value='modalModel.value'
                :options="options"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <footer class="x-modal__footer">
            <button @click="doEdit" class="btn btn-action main-action">Edit</button>
            <button class="btn btn-action" @click="$bvModal.hide('edit-purpose-management-modal')">Cancel</button>
          </footer>
        </form>
        
      </main>
    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import { IClerkDiagnosis, IClerkScreening, IClerkSurgery, IClerkVaccine } from '~/api/models/clerk.model';
import ClerkStore from '~/store/clerk-store';

@Component({
  layout: 'dashboard'
})
export default class HTPurposeManagement extends Vue{
  clerkStore = getModule(ClerkStore, this.$store)
  
  modalModel = {
    title: '',
    name: '',
    value: null
  }

  currentScreening: IClerkScreening = {}
  currentDiagnosis: IClerkDiagnosis = {}
  currentSurgery: IClerkSurgery = {}

  get options(){
    return [
      {value: null, text: 'Please select one', disabled: true},
      {value: 'False', text: 'False'},
      {value: 'True', text: 'True'},
    ]
  }
  
  public get screenings() : IClerkScreening[] {
    return this.clerkStore.screenings
  }
  public get diagnosis() : IClerkDiagnosis[] {
    return this.clerkStore.diagnosis
  }
  public get surgeries() : IClerkSurgery[] {
    return this.clerkStore.surgeries
  }
  
  openEditScreening(sc: IClerkScreening){
    //@ts-ignore
    this.modalModel = {...this.modalModel, ...{
      value: sc.ebase_status,
      title: 'Screening'
    }}
    this.currentScreening = sc
    //@ts-ignore
    this.$bvModal.show('edit-purpose-management-modal')
  }
  openEditDiagnosis(dg: IClerkDiagnosis){
    //@ts-ignore
    this.modalModel = {...this.modalModel, ...{
      value: dg.ebase_status,
      title: 'Diagnosis'
    }}
    this.currentDiagnosis = dg
    //@ts-ignore
    this.$bvModal.show('edit-purpose-management-modal')
  }
  openEditSurgery(sg: IClerkSurgery){
    //@ts-ignore
    this.modalModel = {...this.modalModel, ...{
      value: sg.ebase_status,
      title: 'Surgery'
    }}
    this.currentSurgery = sg
    //@ts-ignore
    this.$bvModal.show('edit-purpose-management-modal')
  }

  doEdit(){
    const form = document.querySelector('#edit-purpose-management-form')
    //@ts-ignore
    const formData = new FormData(form)
    if(this.modalModel.title == 'Screening'){
      this.clerkStore.updateScreening({
        //@ts-ignore
        ebase_status: formData.get('ebase_status'),
        screening_id: Number(this.currentScreening.screening_id),
        lab_id: Number(this.currentScreening.lab_id)
      })
    }
    else if(this.modalModel.title == 'Diagnosis') {
      this.clerkStore.updateDiagnosis({
        //@ts-ignore
        ebase_status: formData.get('ebase_status'),
        diagnosis_id: Number(this.currentDiagnosis.diagnosis_id),
        problem_id: Number(this.currentDiagnosis.problem_id),
      })
    }
    else {
      this.clerkStore.updateSurgery({
        //@ts-ignore
        ebase_status: formData.get('ebase_status'),
        diagnosis_id: Number(this.currentSurgery.surgery_id),
        cpt_id: Number(this.currentSurgery.cpt_id),
      })
    }
    //@ts-ignore
    this.$bvModal.hide('edit-purpose-management-modal')
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