<template>
  <b-modal size="lg" hide-header hide-footer  body-class="x-modal" id="create-allergy-modal">
    <header class="x-modal__header">
      <span class="title">Create allergy</span>
    </header>
    <main>
      <ValidationObserver>
        <form @submit.prevent id="create-allergy-form">
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="category" label="Category">
                  <b-form-select v-model="model.category" name="category" id="category" :options="categories"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="substance" label="Substance">
                  <b-input  debounce="100" @focus="showSearchResults" v-model="model.substance" name="substance" id="substance" placeholder="Substance"/>
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
                <b-form-group label-for="reaction_type" label="Reaction type">
                  <b-form-select v-model="model.reaction_type" name="reaction_type" id="reaction_type" :options="reactions"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="severity" label="Severity">
                  <b-form-select v-model="model.severity" name="severity" id="severity" :options="severities"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="status" label="Status">
                  <b-form-select v-model="model.status" name="status" id="status" :options="status"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="date_first_recorded" label="Date first recorded">
                  <b-input type="date" v-model="model.date_first_recorded" name="date_first_recorded" 
                  id="date_first_recorded" placeholder="Date first recorded"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label-for="comments" label="Comments">
                  <b-textarea v-model="model.comments" rows="2" placeholder="Comments" name="comments" id="comments"/>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <footer class="x-modal__footer">
            <button @click="doCreateAllergy" class="btn btn-action main-action">Create</button>
            <button class="btn btn-action" @click="$bvModal.hide('create-allergy-modal')">Cancel</button>

          </footer>
        </form>
      </ValidationObserver>
    </main>
    
  </b-modal>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import { getModule } from 'vuex-module-decorators';
import AuthStore from '~/store/auth-store';
import { IRxNormLabel } from '~/api/models/patient-data.model';
import patientDataApi from '~/api/patient-data.api';
import { Watch } from 'nuxt-property-decorator';
@Component({
  components:{
    ValidationObserver,
    ValidationProvider,
  }
})
export default class CreateAllergyModal extends Vue{

  private authStore = getModule(AuthStore, this.$store)
  rxnormLabels: IRxNormLabel[] = [] 
  resultsVisible = false

  model = {
    category: null,
    substance: '',
    reaction_type: null,
    severity: null,
    status: null,
    comments: "",
  }
  
  public get categories(){
    return [
      {text: 'Drug', value: 'Drug'},
      {text: 'Environment', value: 'Environment'},
      {text: 'Food', value: 'Food'},
    ]
  }
  public get reactions(){
    return [
      {text: 'Allergy', value: 'Allergy'},
      {text: 'Side effect', value: 'Side effect'},
    ]
  }
  public get status(){
    return [
      {text: 'Active', value: 'Active'},
      {text: 'Inactive', value: 'Inactive'},
    ]
  }
  public get severities(){
    return [
      {text: 'Low', value: 'Low'},
      {text: 'High', value: 'High'},
      {text: 'Very hight', value: 'Very hight'},
    ]
  }
  
  @Watch('model.substance')
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
    this.model = {...this.model, ...{substance: rx.medication_rxnorm_label}}
    this.hideSearchResults()
    
  }

  doCreateAllergy(){
    const form = document.querySelector('#create-allergy-form')
    //@ts-ignore
    const formData = new FormData(form)
    this.$emit('create', formData)
    //@ts-ignore
    this.$bvModal.hide('create-allergy-modal')
  }

}
</script>