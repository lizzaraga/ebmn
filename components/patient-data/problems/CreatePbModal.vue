<template>
  <b-modal size="lg" hide-header hide-footer  body-class="x-modal" id="create-pb-modal">
    <header class="x-modal__header">
      <span class="title">Create Problem</span>
    </header>
    <main>
      <ValidationObserver v-slot='{invalid}'>
        <form @submit.prevent id="create-pb-form">
          <b-row>
            <b-col class="position-relative">
              <ValidationProvider>
                <b-form-group label="Diagnosis name">
                  <b-input v-model="model.diagnosis_name" id="description" name="description" placeholder="Diagnosis name"/>
                </b-form-group>
              </ValidationProvider>
              <div  v-show="searchState.show" class="input-search-results-box">
                <header>
                  <span class="title">Results</span>
                </header>
                <main>
                  <div class="items">
                    <span @click="onSelectDiagnosis(item)" :key="item.diagnosis_id" class="item" v-for="item in searchState.results">{{item.description}}</span>
                  </div>
                </main>
              </div>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Icd code">
                  <b-input  v-model="model.icd_code" id="icd_code" name="icd_code" placeholder="Icd code"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Treatment done at">
                  <b-form-select :options="his" v-model="model.treatment_done_at" name="treatment_done_at"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Diagnosed at">
                  <b-form-select :options="hospitals" v-model="model.diagnosed_at" name="diagnosed_at"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Organ system">
                  <b-form-select :options="organs" v-model='model.organ_system' name="organ_system"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Current status">
                  <b-form-select :options="status" v-model='model.current_status' name="current_status"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            
          </b-row>
          <b-row >
            <b-col>
              <ValidationProvider>
                <b-form-group label="Priority">
                  <b-form-select :options="priorities" v-model='model.priority' name="priority"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Date onset">
                  <b-input type="date" name="date_onset"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <footer class="x-modal__footer">
            <button :disabled="invalid" @click="doStartCreate" class="btn btn-action main-action">Create</button>
            <button class="btn btn-action" @click="$bvModal.hide('create-pb-modal')">Cancel</button>
          </footer>
        </form>
      </ValidationObserver>
    </main>
  </b-modal>
    
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import { Watch } from 'vue-property-decorator';
import patientDataApi from '~/api/patient-data.api';
import { getModule } from 'vuex-module-decorators';
import AuthStore from '~/store/auth-store';
import { IClerkDiagnosis } from '~/api/models/clerk.model';
import hiApi from '~/api/hi.api';
import hospitalApi from '~/api/hospital.api';
@Component({
  components:{
    ValidationProvider,
    ValidationObserver
  }
})
export default class CreatePbModal extends Vue{
  private authStore = getModule(AuthStore, this.$store)
  model =  {
    diagnosis_name: '',
    icd_code: '',
    treatment_done_at: null,
    diagnosed_at: null,
    organ_system: null,
    current_status: null,
    priority: null,
    date_onset: ''
  }
  his = [

  ]
  hospitals = []
  searchState = {
    isLoading: false,
    show: false,
    selectionOccurs: false,
    results: []
  }

  @Watch('model.diagnosis_name')
  onDiagnosisChanged(value: string){
    
    if(value.trim() != "" && this.searchState.selectionOccurs == false){
      this.onSearchDiagnosis(value)
    }
    if(this.searchState.selectionOccurs){
      this.searchState.selectionOccurs = false
    }
  }
  @Watch('searchState.results')
  onResultsChanged(value: any[]){
    if(value.length > 0)
      this.searchState.show = true
  }
  @Watch('model.icd_code')
  onCodeChanged(value: string){
    if(value.trim() != ''){
      this.onSearchHis(value)
    }
  }

  get organs(){
    return [
      {
        value: null, text: 'Please select one', disabled: true,
        
      },
      {value: 'Respiratory', text: 'Respiratory'},
      {value: 'Cardiovascular', text: 'Cardiovascular'},
    ]
  }
  get priorities(){
    return [
      {value: null, text: 'Please select one', disabled: true,},
      {value: 'Normal', text: 'Normal'},
      {value: 'Severe', text: 'Severe'},
      {value: 'Very severe', text: 'Very severe'}
    ]
  }
  get status(){
    return [
      {value: null, text: 'Please select one', disabled: true,},
      {value: 'On going treatment', text: 'On going treatment'},
      {value: 'Pending treatment', text: 'Pending treatment'},
      {value: 'Treated', text: 'Treated'}
    ]
  }

  async onSearchHis(value: string){
    try {
      const res = await hiApi.getHIPromIcdCode(this.authStore.token, value)
      //@ts-ignore
      this.his = res.map(hi => {
        return {
          text: hi.health_institute_name,
          value: hi.health_institute_name,
        }
      })
      //@ts-ignore
      his.unshift({value: null, text: 'Select an health institute', disabled: true})
      
    } catch (error) {
      console.log('An errors occurs: getHIFromIcdCode')
    }
  }
  onSelectDiagnosis(data: IClerkDiagnosis){
    this.searchState.show = false,
    this.searchState.selectionOccurs = true
    //@ts-ignore
    this.model.icd_code = data.icd_code
    //@ts-ignore
    this.model.diagnosis_name = data.description
  }
  async onSearchDiagnosis(value: string){
    try {
      this.searchState.isLoading = true
      const res = await patientDataApi.searchDiagnosis(this.authStore.token, value)
      //@ts-ignore
      this.searchState = {...this.searchState, ...{isLoading: false, results: res, }}
    } catch (error) {
      this.searchState.results = []
      this.searchState.isLoading = false
    }
  }

  doStartCreate(){
    const form = document.querySelector('#create-pb-form')
     //@ts-ignore
    const formData = new FormData(form)
    this.$emit('create', formData)
    //@ts-ignore
    this.$bvModal.hide('create-pb-modal')
  }

  async created(){
    try {
      
      const response = await hospitalApi.getHospitals(this.authStore.token)
      // @ts-ignore
      this.hospitals = response.map((e) => {
        return {
          text: e.hospital_name,
          value: e.hospital_name,
        }
      })
      //@ts-ignore
      this.hospitals.unshift({value: null, text: 'Please select an option', disabled: true})
    } catch (error) {
      alert("Get hospitals failed")
    }
  }
}
</script>