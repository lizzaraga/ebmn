<template>
  <div class="data-grid">
    <div class="data-grid-main">
      <div>
        <div class="d-flex">
          <nuxt-link class="tab-link" :to="{name: 'manager-hospitals-ht-physical-nature', hash: '/#drugs'}">Drugs</nuxt-link>
          <nuxt-link class="tab-link" :to="{name: 'manager-hospitals-ht-physical-nature', hash: '/#vaccines'}">Vaccines</nuxt-link>
          <nuxt-link class="tab-link" :to="{name: 'manager-hospitals-ht-physical-nature', hash: '/#referrals-incoming'}">Referrals(Incoming)</nuxt-link>
          <nuxt-link class="tab-link" :to="{name: 'manager-hospitals-ht-physical-nature', hash: '/#referrals-outgoing'}">Referrals(Outgoing)</nuxt-link>
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
        <div class="patient-data-grid" v-show="$route.hash == '/#referrals-incoming'">
          <div class="data-item" :key="iRef.referral_id" v-for="iRef in inReferrals">
            <header>
              <div class="title-field">
                <span class="title-key">Referral Id:</span>
                <span class="title-value">{{iRef.referral_id}}</span>
              </div>
              <div class="actions">
                <i @click="openEditReferral(iRef)" class="bi bi-pen action"></i>
              </div>
            </header>
            <main>
              <div class="data-row">
                <span class="data-key">Patient name</span>
                <span class="data-value">{{iRef.patient_name}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Email</span>
                <span class="data-value">{{iRef.email}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Type referral</span>
                <span class="data-value">{{iRef.type_referral}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Order instructions</span>
                <span class="data-value">{{iRef.order_instructions}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Description</span>
                <span class="data-value">{{iRef.description}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Status</span>
                <span class="data-value">{{iRef.status}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Ordered at</span>
                <span class="data-value">{{oRef.ordered_at}}</span>
              </div>
            </main>
          </div>
        </div>
        <div class="patient-data-grid" v-show="$route.hash == '/#referrals-outgoing'">
          <div class="data-item" :key="oRef.referral_id" v-for="oRef in outReferrals">
            <header>
              <div class="title-field">
                <span class="title-key">Referral Id:</span>
                <span class="title-value">{{oRef.referral_id}}</span>
              </div>
              
            </header>
            <main>
              <div class="data-row">
                <span class="data-key">Patient name</span>
                <span class="data-value">{{oRef.patient_name}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Email</span>
                <span class="data-value">{{oRef.email}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Type referral</span>
                <span class="data-value">{{oRef.type_referral}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Order instructions</span>
                <span class="data-value">{{oRef.order_instructions}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Description</span>
                <span class="data-value">{{oRef.description}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Status</span>
                <span class="data-value">{{oRef.status}}</span>
              </div>
              <div class="data-row">
                <span class="data-key">Ordered at</span>
                <span class="data-value">{{oRef.ordered_at}}</span>
              </div>
            </main>
            
            
          </div>
        </div>
      </div>
       <b-modal hide-header hide-footer  body-class="x-modal" id="edit-physical-nature-modal">
        <header class="x-modal__header">
          <span class="title">Edit manager status</span>
        </header>
        <main>
          <form id="edit-physical-nature-form" @click.prevent>
            <b-row>
              <b-col>
                <b-form-group label="Manager status">
                  <b-form-select 
                  name='manager_status'
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
      <b-modal hide-header hide-footer  body-class="x-modal" id="edit-incoming-referral-modal">
        <header class="x-modal__header">
          <span class="title">Edit referral status</span>
        </header>
        <main>
          <form id="edit-incoming-referral-form" @click.prevent>
            <b-row>
              <b-col>
                <b-form-group label="Manager status">
                  <b-form-select 
                  name='status'
                  :value='currentIRef.status'
                  :options="status"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <footer class="x-modal__footer">
              <button @click="doEditReferral" class="btn btn-action main-action">Edit</button>
              <button class="btn btn-action" @click="$bvModal.hide('edit-incoming-referral-modal')">Cancel</button>
            </footer>
          </form>
          
        </main>
      </b-modal>
    </div>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import { IClerkDrug, IClerkVaccine } from '~/api/models/clerk.model';
import { IReferral } from '~/api/models/manager.model';
import MainContentWithMenu from '~/components/MainContentWithMenu.vue';
import AuthStore from '~/store/auth-store';
import ManagerStore from '~/store/manager-store';

@Component({
  layout: 'dashboard',
  components: {
    mainContentWithMenu: MainContentWithMenu
  }
})
export default class HTPhysicalNature extends Vue{

  private managerStore = getModule(ManagerStore, this.$store)
  modalModel = {
    title: '',
    name: '',
    value: null
  }
  currentDrug: IClerkDrug = {}
  currentVaccine: IClerkVaccine = {}
  currentIRef: IReferral = {}
  get options(){
    return [
      {value: null, text: 'Please select one', disabled: true},
      {value: 'False', text: 'False'},
      {value: 'True', text: 'True'},
    ]
  }
  get status(){
    return [
      {value: null, text: 'Please select one', disabled: true},
      {value: "Done", text: 'Done'},
      {value: "Not Done", text: 'Not Done'}
    ]
  }
  public get drugs() {
    return this.managerStore.drugs
  }
  public get vaccines() {
    return this.managerStore.vaccines
  }
  public get inReferrals(){
    return this.managerStore.inReferrals
  }
  public get outReferrals(){
    return this.managerStore.outReferrals
  }
  openEditDrug(drug: IClerkDrug){
    //@ts-ignore
    this.modalModel = {...this.modalModel, ...{
      value: drug.manager_status,
      title: 'Drug'
    }}
    this.currentDrug = drug
    //@ts-ignore
    this.$bvModal.show('edit-physical-nature-modal')
  }
  openEditVaccine(vac: IClerkVaccine){
    //@ts-ignore
    this.modalModel = {...this.modalModel, ...{
      value: vac.manager_status,
      title: 'Vaccine'
    }}
    this.currentVaccine = vac
    //@ts-ignore
    this.$bvModal.show('edit-physical-nature-modal')
  }
  openEditReferral(iRef: IReferral){
    this.currentIRef = iRef
    //@ts-ignore
    this.$bvModal.show('edit-incoming-referral-modal')
  }
  doEdit(){
    const form = document.querySelector('#edit-physical-nature-form')
    //@ts-ignore
    const formData = new FormData(form)
    if(this.modalModel.title == 'Drug'){
      this.managerStore.updateDrug({
        //@ts-ignore
        manager_status: formData.get('manager_status'),
        drug_id: Number(this.currentDrug.drug_id),
        medication_id: Number(this.currentDrug.medication_id)
      })
    }
    else {
      this.managerStore.updateVaccine({
        //@ts-ignore
        manager_status: formData.get('manager_status'),
        vaccine_id: Number(this.currentVaccine.vaccine_id),
        immunization_id: Number(this.currentVaccine.immunization_id),
      })
    }
    //@ts-ignore
    this.$bvModal.hide('edit-physical-nature-modal')
  }

  doEditReferral(){
    const form = document.querySelector('#edit-incoming-referral-form')
    //@ts-ignore
    const formData = new FormData(form)
    this.managerStore.updateInReferral({referralId: this.currentIRef.referral_id!!, formData})
    //@ts-ignore
    this.$bvModal.hide('edit-incoming-referral-modal')
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    const authStore = getModule(AuthStore, this.$store)
    this.$router.replace({name: 'manager-hospitals-ht-physical-nature', hash: '/#drugs'})
    await this.managerStore.getManagerHospital(authStore.user.id!!)
    this.managerStore.getVaccines()
    this.managerStore.getDrugs()
    this.managerStore.getInRefferals()
    this.managerStore.getOutRefferals()
    
  }
  
}
</script>