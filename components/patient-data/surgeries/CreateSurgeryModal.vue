<template>
  <b-modal size="lg" hide-header hide-footer  body-class="x-modal" id="create-sg-modal">
    <header class="x-modal__header">
      <span class="title">Create Surgery</span>
    </header>
    <main>
      <ValidationObserver>
      <form @submit.prevent id="create-sg-form">
        
          <b-row>
            <b-col class="position-relative">
              <ValidationProvider>
                <b-form-group label-for="description" label="Description">
                  <b-input debounce="100" @focus="showSearchResults" v-model="model.description" id="description" name="description" placeholder="Description"/>
                </b-form-group>
              </ValidationProvider>
              <div  v-show="resultsVisible" class="input-search-results-box">
                <header>
                  <span class="title">Results</span>
                </header>
                <main>
                  <div class="items">
                    <span @click="onSelectCpt(cptSg)" :key="cptSg.surgery_cpt_code" class="item" v-for="cptSg in cptCodes">{{cptSg.surgery_description}}</span>
                  </div>
                </main>
              </div>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="cpt_code" label="Cpt code">
                  <b-input v-model="model.cpt_code" id="cpt_code" name="cpt_code"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="health_institute_dispenser" label="Health Inst. Dispenser">
                  <b-form-select v-model="model.health_institute_dispenser" :options="his" id="ordered_at" name="health_institute_dispenser"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="frozen_section_pathology" label="Frozen section pathology">
                  <b-form-select v-model="model.frozen_section_pathology" :options="frozens" id="frozen_section_pathology" name="frozen_section_pathology"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="surgery_date" label="Surgery date">
                  <b-input v-model="model.surgery_date" type="date" id="surgery_date" name="surgery_date"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="legal_document_approval" label="Legal document">
                  <b-form-file :state ="model.legal_document_for_approval" id="legal_document_approval" name="legal_document_approval"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="related_problems" label="Related problems">
                  <b-form-select v-model="model.related_problems" multiple :options="problems" id="related_problems" name="related_problems"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="comments_before" label="Comments before">
                  <b-textarea v-model="model.comments_before" rows="4" id="comments_before" name="comments_before"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="anaestasia" label="Anaestasia">
                  <b-form-select v-model="model.anaestasia" :options="anaestasia" id="anaestasia" name="anaestasia"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="ordered_at" label="Ordered at">
                  <b-form-select v-model="model.ordered_at" :options="hospitals" id="ordered_at" name="ordered_at"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
        <footer class="x-modal__footer">
          <button @click="doCreateSg" class="btn btn-action main-action">Create</button>
          <button class="btn btn-action" @click="$bvModal.hide('create-sg-modal')">Cancel</button>
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
import { getModule, Prop, Watch } from 'nuxt-property-decorator';
import hospitalApi from '~/api/hospital.api';
import AuthStore from '~/store/auth-store';
import ProblemStore from '~/store/patient-data/problem-store';
import patientDataApi from '~/api/patient-data.api';
import { ICptCodeSurgery } from '~/api/models/patient-data.model';
import hiApi from '~/api/hi.api';
@Component({
  components:{
    ValidationProvider,
    ValidationObserver
  }
})
export default class CreateSgModal extends Vue{
  @Prop({required: true}) patientId!:number
  private authStore = getModule(AuthStore, this.$store)
  private problemStore = getModule(ProblemStore, this.$store)
  problems = []
  his = []
  hospitals = []
  cptCodes: ICptCodeSurgery[] = []
  model = {
    description: '',
    cpt_code: '',
    health_institute_dispenser: null,
    frozen_section_pathology: null,
    surgery_date: '',
    legal_document_for_approval: null,
    related_problems: [],
    coments_before: '',
    ordered_at: null,
    anaestasia: null
  }
  
  
  public get anaestasia() {
    return [
      {text: "Epidural", value: 'Epidural'},
      {text: "General", value: 'General'},
      {text: "LMA", value: 'LMA'},
      {text: "Local", value: 'Local'},
      {text: "Regional", value: 'Regional'},
      {text: "Sedational", value: 'Sedational'},
      {text: "Spinal", value: 'Spinal'},
    ]
  }
  public get frozens() {
    return [
      {text: "True", value: 'True'},
      {text: "False", value: 'False'},
    ]
  }

  // Research
  resultsVisible:boolean = false

  @Watch('model.description')
  onDescriptionChanged(value: string){
    this.onSearchSgsFromCpt(value)
  }
  @Watch('model.cpt_code')
  onLoincCodeChanged(value: string){
    this.getHIFromLoincCode(value)
  }

  showSearchResults(){
    this.resultsVisible = true
  }
  hideSearchResults(){
    this.resultsVisible = false
  }
  async onSearchSgsFromCpt(searchTerm: string){
    try {
      const results = await patientDataApi.searchSgFromCptCode(this.authStore.token, searchTerm)
      this.cptCodes = results
    } catch (error) {
      this.cptCodes = []
      console.log('An errors occurs: onSearchLoincCodes')
    }
  }
  async getHIFromLoincCode(code: string){
    try {
      const res = await hiApi.getHIFromCptCode(this.authStore.token, code)

      console.log('Health institute: ', res)
      //@ts-ignore
      this.his = res.map(hi => {
        return {
          text: hi.health_institute_name,
          value: hi.health_institute_name,
        }
      })
      //@ts-ignore
      this.his.unshift({value: null, text: 'Select an health institute', disabled: true})
      //@ts-ignore
     
    } catch (error) {
      console.log('An errors occurs: getHIFromLoincCode')
    }
  }
  onSelectCpt(cptSg: ICptCodeSurgery){
    
    // @ts-ignore
    this.model = {...this.model, ...{cpt_code: cptSg.surgery_cpt_code, description: cptSg.surgery_description}}
    this.hideSearchResults()
    
  }
  doCreateSg(){
    const form = document.querySelector('#create-sg-form')
    //@ts-ignore
    const formData = new FormData(form)
    this.$emit('create', formData)
    //@ts-ignore
    this.$bvModal.hide('create-sg-modal')
  }

  async created(){
    try {
      
      const response = await hospitalApi.getHospitals(this.authStore.token)
       //@ts-ignore
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
    try {
      await this.problemStore.getProblems(this.patientId)
      // @ts-ignore
      this.problems = this.problemStore.problems.map(p => {
        return {
          text: p.problem_name, value: p.problem_id
        }
      })
      // @ts-ignore
      this.problems.unshift({value: null, text: 'Please select your problems', disabled: true})
      
    } catch (error) {
      alert("Get problems failed")
    }
  }
  
}
</script>