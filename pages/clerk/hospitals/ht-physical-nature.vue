<template>
  <div class="data-grid">
    <div class="data-grid-main">
      <div>
        <div class="d-flex">
          <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-physical-nature', hash: '/#drugs'}">Drugs</nuxt-link>
          <nuxt-link class="tab-link" :to="{name: 'clerk-hospitals-ht-physical-nature', hash: '/#vaccines'}">Vaccines</nuxt-link>
        </div>
        
        <div class="patient-data-grid" v-show="$route.hash == '/#drugs'">
          <div class="data-item" :key="dg.medication_id" v-for="dg in drugs">
            <header>
              <div class="title-field">
                <span class="title-key">Rxnorm Code:</span>
                <span class="title-value">{{dg.rxnorm_code}}</span>
              </div>
              <div class="actions">
                <i @click="openEditDrug(dg)" class="bi bi-pen action"></i>
              </div>
            </header>
            <main>
              <div class="data-row">
                <span class="data-key">Description</span>
                <span class="data-value">{{dg.description}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Manager status</span>
                <span class="data-value">{{dg.manager_status}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Clerk status</span>
                <span class="data-value">{{dg.ebase_status}}</span>
              </div>
            </main>
          </div>
        </div>
        <div class="patient-data-grid" v-show="$route.hash == '/#vaccines'">
          <div class="data-item" :key="vac.immunization_id" v-for="vac in vaccines">
            <header>
              <div class="title-field">
                <span class="title-key">Cvx Code:</span>
                <span class="title-value">{{vac.cvx_code}}</span>
              </div>
              <div class="actions">
                <i @click="openEditVaccine(vac)" class="bi bi-pen action"></i>
              </div>
            </header>
            <main>
              <div class="data-row">
                <span class="data-key">Description</span>
                <span class="data-value">{{vac.description}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Manager status</span>
                <span class="data-value">{{vac.manager_status}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Clerk status</span>
                <span class="data-value">{{vac.ebase_status}}</span>
              </div>
            </main>
          </div>
        </div>
      </div>

      <b-modal hide-header hide-footer  body-class="x-modal" id="edit-physical-nature-modal">
        <header class="x-modal__header">
          <span class="title">Edit clerk status</span>
        </header>
        <main>
          <form id="edit-physical-nature-form" @click.prevent>
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
              <button class="btn btn-action" @click="$bvModal.hide('edit-physical-nature-modal')">Cancel</button>
            </footer>
          </form>
          
        </main>
      </b-modal>
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
  
  modalModel = {
    title: '',
    name: '',
    value: null
  }

  currentDrug: IClerkDrug = {}
  currentVaccine: IClerkVaccine = {}

  get options(){
    return [
      {value: null, text: 'Please select one', disabled: true},
      {value: 'False', text: 'False'},
      {value: 'True', text: 'True'},
    ]
  }
  public get vaccines() : IClerkVaccine[] {
    return this.clerkStore.vaccines
  }
  public get drugs() : IClerkDrug[] {
    return this.clerkStore.drugs
  }
  
  openEditDrug(drug: IClerkDrug){
    //@ts-ignore
    this.modalModel = {...this.modalModel, ...{
      value: drug.ebase_status,
      title: 'Drug'
    }}
    this.currentDrug = drug
    //@ts-ignore
    this.$bvModal.show('edit-physical-nature-modal')
  }
  openEditVaccine(vac: IClerkVaccine){
    //@ts-ignore
    this.modalModel = {...this.modalModel, ...{
      value: vac.ebase_status,
      title: 'Vaccine'
    }}
    this.currentVaccine = vac
    //@ts-ignore
    this.$bvModal.show('edit-physical-nature-modal')
  }
  doEdit(){
    const form = document.querySelector('#edit-physical-nature-form')
    //@ts-ignore
    const formData = new FormData(form)
    if(this.modalModel.title == 'Drug'){
      this.clerkStore.updateDrug({
        //@ts-ignore
        ebase_status: formData.get('ebase_status'),
        drug_id: Number(this.currentDrug.drug_id),
        medication_id: Number(this.currentDrug.medication_id)
      })
    }
    else {
      this.clerkStore.updateVaccine({
        //@ts-ignore
        ebase_status: formData.get('ebase_status'),
        vaccine_id: Number(this.currentVaccine.vaccine_id),
        immunization_id: Number(this.currentVaccine.immunization_id),
      })
    }
    //@ts-ignore
    this.$bvModal.hide('edit-physical-nature-modal')
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