<template>
  <b-modal size="lg" hide-header hide-footer  body-class="x-modal" id="create-ld-modal">
    <header class="x-modal__header">
      <span class="title">{{ isEditing ? 'Edit': 'Create'}} Document</span>
    </header>
    <main>
      <form 
       @submit.prevent="doStartEdit" id="create-ld-form">
        <div class="row">
          <b-form-group label-for="document_category" class="col-6 position-relative"  label="Document Category"> 
            <b-form-select  v-model="model.document_category" 
            name="document_category" id="document_category" :options="categories"/>
            
          </b-form-group>
          <b-form-group class="col-6"  label="Date of establishment"> 
            <b-form-input v-model='model.document_date_of_establishment' type="date" 
             name="date_of_establishment" id="date_of_establishment"></b-form-input>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-6"  label="Expiry date"> 
            <b-form-input type="date" 
             name="expiry_date" id="expiry_date"></b-form-input>
          </b-form-group>
          <b-form-group class="col-6"  label="Decision date"> 
            <b-form-input type="date" v-model="model.document_decision_date"
             name="decision_date" id="decision_date"></b-form-input>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-6"  label="Reason for capacity"> 
            <b-form-input type="text" v-model="model.document_reason_for_capacity"
             name="reason_for_capacity" id="reason_for_capacity"></b-form-input>
          </b-form-group>
          <b-form-group class="col-6"  label="Reason for determination"> 
            <b-form-input type="text" v-model="model.document_reason_for_determination"
             name="reason_for_determination" id="reason_for_determination"></b-form-input>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-12" label="Legal document"> 
            <input type="file" name="legal_document" id="legal_document" class="form-control">
          </b-form-group>
        </div>
        
      </form>
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('create-ld-modal')">Cancel</button>
      <button @click="doStartEdit" class="btn btn-action">{{ isEditing ? 'Edit': 'Create'}}</button>
    </footer>

  </b-modal>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { ILegalDocument } from '~/api/models/patient-data.model';

@Component
export default class EditOrCreateLdModal extends Vue{
  @Prop({default: false}) isEditing!: boolean
  @Prop({}) editData!: ILegalDocument

  categories = [
    {value: null, text: 'Please select', disabled: true},
    {value: 'ADVANCED DIRECTIVES', text: 'ADVANCED DIRECTIVES'},
    {value: 'CAPACITY', text: 'CAPACITY'},
    {value: 'GUARDIANSHIP', text: 'GUARDIANSHIP'},
    {value: 'MINOR WITH DECISION', text: 'MINOR WITH DECISION'},
    {value: 'WILL', text: 'WILL'},
  ]

  model = {
    document_category: '',
    document_date_of_establishment: '',
    document_decision_date: '',
    document_reason_for_capacity: '',
    document_reason_for_determination: '',
    document_legal_document: ''
  }

  @Watch('editData', {immediate: true})
  onDataChanged(value: ILegalDocument){
    //@ts-ignore
    if(this.isEditing) this.model = value
  }

  doStartEdit(){
    const form = document.querySelector("#create-ld-form")
    // @ts-ignore
    const formData = new FormData(form)
    // Remove legal_document key from form data
    console.log(formData.get('legal_document'))
    if(formData.get('legal_document') == ''){
      formData.delete('legal_document')
    }
    if(this.isEditing) this.$emit('edit', this.editData, formData)
    else this.$emit('create', formData)
    this.model = {
    document_category: '',
    document_date_of_establishment: '',
    document_decision_date: '',
    document_reason_for_capacity: '',
    document_reason_for_determination: '',
    document_legal_document: ''
  }
  }

}
</script>