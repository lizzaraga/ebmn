<template>
  <b-modal size="lg" hide-header hide-footer  body-class="x-modal" id="create-rd-modal">
    <header class="x-modal__header">
      <span class="title">Create Radiology</span>
    </header>
    <main>
      <form id="create-rd-form" @submit.prevent="doStartCreate">
        <div class="row">
          <b-form-group class="col-6 position-relative"  label="Description"> 
            <b-form-input  debounce="100" @focus="showSearchResults"
             v-model="rd.description"  name="description" id="description"></b-form-input>
            <div  v-show="resultsVisible" class="input-search-results-box">
              <header>
                <span class="title">Results</span>
              </header>
              <main>
                <div class="items">
                  <span @click="onSelectLab(lab)" :key="lab.lab_id" class="item" v-for="lab in labHis">{{lab.lab_description}}</span>
                </div>
              </main>
            </div>
          </b-form-group>
          <b-form-group class="col-6"  label="Loinc Code"> 
            <b-form-input :disabled="rd.loincCode.length == 0" v-model="rd.loincCode" 
             name="loinc_code" id="loinc_code"></b-form-input>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-6"  label="Ordered At"> 
            <b-form-select :value="null" :disabled="rd.hospitals.length <= 0" :options="rd.hospitals" name="ordered_at" id="ordered_at"></b-form-select>
          </b-form-group>
          <b-form-group class="col-6" label="Done At"> 
            <b-form-select :value='null' :disabled="rd.hi.length <= 0" :options="rd.hi" name="done_at" id="done_at"></b-form-select>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-12" label="Related Problems"> 
            <b-form-select v-model='selectedPbs' name="related_problems" :disabled="rd.problems.length <= 0" :options="rd.problems" multiple ></b-form-select>
            
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-12" label="Order Instructions"> 
            <b-form-textarea
              placeholder="Instructions"
              rows="3"
              class="form-control"
              name="order_instructions" id="order_instructions"
              no-resize
            ></b-form-textarea>
          </b-form-group>
        </div>
        
      </form>
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('create-rd-modal')">Cancel</button>
      <button @click="doStartCreate" class="btn btn-action">Create</button>
    </footer>

  </b-modal>
</template>
<script lang="ts">
import { Component, getModule, Watch } from 'nuxt-property-decorator'
import Vue from 'vue'
import hiApi from '~/api/hi.api'
import hospitalApi from '~/api/hospital.api'
import { ILabInstitute } from '~/api/models/patient-data.model'
import patientDataApi from '~/api/patient-data.api'
import AuthStore from '~/store/auth-store'
import HospitalStore from '~/store/hospital-store'
import ProblemStore from '~/store/patient-data/problem-store'

@Component
export default class CreateRdModal extends Vue{
  private hospitalStore = getModule(HospitalStore, this.$store) 
  private authStore = getModule(AuthStore, this.$store)
  private problemStore = getModule(ProblemStore, this.$store)
  
  selectedHI!: string
  rd = {
    description: '',
    loincCode: '',
    orderInstrs: '',
    hospitals: [],
    hi: [],
    problems: []
  }
  selectedPbs = []
  labHis: ILabInstitute[] = []

  resultsVisible:boolean = false

  @Watch('rd.description')
  onDescriptionChanged(value: string){
    this.onSearchLoincCodes(value)
  }
  @Watch('rd.loincCode')
  onLoincCodeChanged(value: string){
    this.getHIFromLoincCode(value)
  }

  showSearchResults(){
    this.resultsVisible = true
  }
  hideSearchResults(){
    this.resultsVisible = false
  }
  doStartCreate(){
    const form = document.querySelector("#create-rd-form")
    // @ts-ignore
    const formData = new FormData(form)
    formData.set('related_problems', this.selectedPbs.join(','))
    console.log('Multiselect: ', formData)
    this.$emit('create', formData)
  }

  async onSearchLoincCodes(searchTerm: string){
    try {
      const results = await patientDataApi.searchLoincCodes(this.authStore.token, searchTerm)
      this.labHis = results
    } catch (error) {
      this.labHis = []
      console.log('An errors occurs: onSearchLoincCodes')
    }
  }
  async getHIFromLoincCode(code: string){
    try {
      const res = await hiApi.getHIFromLoincCode(code, this.authStore.token)
      const his = res.map(hi => {
        return {
          text: hi.health_institute_name,
          value: hi.health_institute_name,
        }
      })
      //@ts-ignore
      his.unshift({value: null, text: 'Select an health institute', disabled: true})
      //@ts-ignore
      this.rd = {...this.rd, ...{hi: his}}
    } catch (error) {
      console.log('An errors occurs: getHIFromLoincCode')
    }
  }
  onSelectLab(lab: ILabInstitute){
    console.log('Selected Lab: ', lab)
    // @ts-ignore
    this.rd = {...this.rd, ...{loincCode: lab.lab_loinc_code, description: lab.lab_description}}
    this.hideSearchResults()
    
  }

  async created(){
    try {
      
      const response = await hospitalApi.getHospitals(this.authStore.token)
      const hospitals = response.map((e) => {
        return {
          text: e.hospital_name,
          value: e.hospital_name,
        }
      })
      //@ts-ignore
      hospitals.unshift({value: null, text: 'Please select an option', disabled: true})
      
      // @ts-ignore
      this.rd = {...this.rd, ...{hospitals}}
    } catch (error) {
      alert("Get hospitals failed")
    }
    try {
      await this.problemStore.getProblems(27)
      const pbs = this.problemStore.problems.map(p => {
        return {
          text: p.problem_name, value: p.problem_id
        }
      })
      // @ts-ignore
      pbs.unshift({value: null, text: 'Please select your problems', disabled: true})
      // @ts-ignore
      this.rd = {...this.rd, ...{problems: pbs}}
    } catch (error) {
      alert("Get problems failed")
    }
  }

  
}
</script>


