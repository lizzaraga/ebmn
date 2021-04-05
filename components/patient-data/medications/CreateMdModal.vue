<template>
  <b-modal size="lg"  hide-header hide-footer  body-class="x-modal" id="create-md-modal">
    <header class="x-modal__header">
      <span class="title">Create Medication</span>
    </header>
    <main>
      <ValidationObserver>
        <form @submit.prevent="doCreateMd" id="create-md-form">
          <b-row>
            <b-col class="position-relative">
              <ValidationProvider>
                <b-form-group  label-for="rxnorm_label" label="Rxnorm label">
                  <b-input debounce="100" @focus="showSearchResults" v-model="model.rxnorm_label" placeholder="Rxnorm label" name="rxnorm_label" id="rxnorm_label"/>
                  
                </b-form-group>
              </ValidationProvider>
              <div  v-show="resultsVisible" class="input-search-results-box">
                <header>
                  <span class="title">Results</span>
                </header>
                <main>
                  <div class="items">
                    <span @click="onSelectRxnormLabel(rx)" :key="rx.medication_id" class="item" v-for="rx in rxnormLabels">{{rx.medication_rxnorm_label}}</span>
                  </div>
                </main>
              </div>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="dispenser_health_institute" label="Dispenser health institute">
                  <b-form-select :disabled='his.length < 1' :options="his" v-model="model.dispenser_health_institute"  name="dispenser_health_institute" id="dispenser_health_institute"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="ordered_by" label="Order by">
                  <b-form-select :disabled='hospitals.length < 1' :options="hospitals" v-model="model.hospital"  name="ordered_by" id="ordered_by"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="related_problems" label="Related problems">
                  <b-form-select multiple :disabled='problems.length < 1' v-model="model.related_problems" :options="problems" name="related_problems" id="related_problems"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="route" label="Route">
                  <b-form-select v-model="model.route" :options="routes" name="route" id="route"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="frequency" label="Frequency">
                  <b-form-select v-model="model.frequency" :options="frequencies" name="frequency" id="frequency"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="type_of_therapy" label="Type of therapy">
                  <b-form-select v-model="model.type_of_therapy" :options="therapies" name="type_of_therapy" id="type_of_therapy"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="duration" label="Duration">
                  <b-input v-model="model.duration" placeholder="Duration" name="duration" id="duration"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="instructions_on_prescription" label="Instr. on prescription">
                  <b-input v-model="model.instructions_on_prescription" placeholder="Instructions on presciption" name="instructions_on_prescription" id="instructions_on_prescription"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="dosage" label="Dosage">
                  <b-input v-model="model.dosage" placeholder="Dosage" name="dosage" id="dosage"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="dosage_unit" label="Dosage unit">
                  <b-form-select v-model="model.dosage_unit" :options="units" name="dosage_unit" id="dosage_unit"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="dosage_volume" label="Dosage volume">
                  <b-input v-model="model.dosage_volume" placeholder="Dosage volume" name="dosage_volume" id="dosage_volume"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="dosage_volume_unit" label="Dosage volume unit">
                  <b-form-select v-model="model.dosage_volume_unit" :options="volumes" name="dosage_volume_unit" id="dosage_volume_unit"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
        </form>
      </ValidationObserver>
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('create-md-modal')">Cancel</button>
      <button @click="doCreateMd" class="btn btn-action">Create</button>
    </footer>
  </b-modal>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import patientDataApi from '~/api/patient-data.api';
import { getModule } from 'vuex-module-decorators';
import AuthStore from '~/store/auth-store';
import hospitalApi from '~/api/hospital.api';
import hiApi from '~/api/hi.api';
import { Watch } from 'nuxt-property-decorator';
import { IRxNormLabel } from '~/api/models/patient-data.model';
import { IHealthInstitute } from '~/api/models/hospital.model';
@Component({
  components:{
    ValidationProvider,
    ValidationObserver
  }
})
export default class CreateMdModal extends Vue{
  private authStore = getModule(AuthStore, this.$store)
  rxnormLabels: IRxNormLabel[] = [] 
  his: IHealthInstitute[] = []
  problems = [] 
  hospitals = [] 

  resultsVisible = false

  model = {
    rxnorm_label: '',
    dispenser_health_institute: null,
    route: null,
    frequency: null,
    type_of_therapy: null,
    related_problems : [],
    duration: '',
    instructions_on_prescription: '',
    dosage: '',
    dosage_unit: null,
    dosage_volume: '',
    dosage_volume_unit: null,
    hospital: null

  }
  
  public get routes() {
    return [
      {
        text: 'Please choose one', value: null, disabled: true
      },
      {text: 'Oral route', value: 'Oral route'},
      {text: 'Injection route', value: 'Injection route'},
      {text: 'Sublingual and buccal routes', value: 'Sublingual and buccal routes'},
      {text: 'Rectal route', value: 'Rectal route'},
      {text: 'Vaginal route', value: 'Vaginal route'},
      {text: 'Ocular route', value: 'Ocular route'},
      {text: 'Otic route', value: 'Otic route'},
      {text: 'Nasal route', value: 'Nasal route'},
      {text: 'Inhalation route', value: 'Inhalation route'},
      {text: 'Nebulization route', value: 'Nebulization route'},
      {text: 'Cutaneous route', value: 'Cutaneous route'},
      {text: 'Transdermal route', value: 'Transdermal route'},
    ]
  }
  public get frequencies(){
    return [
      {text: 'Please choose one', value: null, disabled: true},
      {text: 'Daily', value: 'Daily'},
      {text: 'Twice daily', value: 'Twice daily'},
      {text: 'Three times daily', value: 'Three times daily'},
      {text: 'Four times daily', value: 'Four times daily'},
      {text: 'As needed', value: 'As needed'},
      {text: 'Every other day', value: 'Every other day'},
      {text: 'Before meal', value: 'Before meal'},
      {text: 'After meal', value: 'After meal'},
      {text: 'Bed time', value: 'Bed time'},
    ]
  }
  public get volumes(){
    return [
      {text: 'Please choose one', value: null, disabled: true},
      {text: 'Tablet', value: 'Tablet'},
      {text: 'Teaspoon', value: 'Teaspoon'},
      {text: 'Tablespoon', value: 'Tablespoon'},
      {text: 'Ounce', value: 'Ounce'},
    ]
  }
  public get therapies(){
    return [
      {text: 'Please choose one', value: null, disabled: true},
      {text: 'Acute', value: 'Acute'},
      {text: 'Continuous', value: 'Continuous'},
      {text: 'Maintenance', value: 'Maintenance'},
    ]
  }
  public get units(){
    return [
      {text: 'Please choose one', value: null, disabled: true},
      {text: 'mg', value: 'mg'},
      {text: 'ml', value: 'ml'},
    ]
  }

  @Watch('model.rxnorm_label')
  onLabelChanged(value: string){
    if(value.trim() != ''){
      this.onSearchRxnormLabels(value)
    }
      
  }

  showSearchResults(){
    this.resultsVisible = true
  }
  hideSearchResults(){
    this.resultsVisible = false
  }

  async onSearchRxnormLabels(searchTerm: string){
    try {
      const results = await patientDataApi.searchMdFromRxService(this.authStore.token, searchTerm)
      this.rxnormLabels = results
    } catch (error) {
      this.rxnormLabels = []
      console.log('An errors occurs: onSearchRxnormLabels')
    }
  }

  onSelectRxnormLabel(rx: IRxNormLabel){
    // @ts-ignore
    this.model = {...this.model, ...{rxnorm_label: rx.medication_rxnorm_label}}
    this.hideSearchResults()
    this.getHIFromRxnorm(rx.medication_rxnorm_label)
    
  }
  
  async getHIFromRxnorm(code: string){
    try {
      const res = await hiApi.getHIFromRxNormLabel(this.authStore.token, code)
      this.his = []
      //@ts-ignore
      this.his = res.map(hi => {
        return {
          text: hi.health_institute_name,
          value: hi.health_institute_name,
        }
      })
      //@ts-ignore
      this.his.unshift({value: null, text: 'Select an health institute', disabled: true})
      
    } catch (error) {
      console.log('An errors occurs: getHIFromLoincCode')
    }
  }

  doCreateMd(){
    const form = document.querySelector('#create-md-form')
    //@ts-ignore
    const formData = new FormData(form)
    this.$emit('create', formData)
  }

  async created(){
    try {
      const {token} = this.authStore.user
      //@ts-ignore
      this.problems = (await patientDataApi.getProblems(token!!, 27)).map(e => {
        return {
          value: e.problem_id, text: e.problem_name
        }
      })
      //@ts-ignore
      this.hospitals = (await hospitalApi.getHospitals(token!!)).map(e => {
        return {
          value: e.hospital_id, text: e.hospital_name
        }
      })
      //@ts-ignore
      this.hospitals.unshift({value: null, text: 'Select hospital', disabled: true})
      
    } catch (error) {
      alert("An error occurs during data fetching ! Check your connection")
    }
  }
}
</script>