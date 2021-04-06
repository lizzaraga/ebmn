<template>
  <b-modal size="md" hide-header hide-footer  body-class="x-modal" id="edit-lab-modal">
    <header class="x-modal__header">
      <span class="title">Edit Lab</span>
    </header>
    <main>
      <form @submit.prevent id="edit-lab-form">
        
        <div class="row">
          <b-form-group class="col-6"  label="Units"> 
            <b-form-select v-model="lab.lab_units" :options="unitOptions" name="units" id="units"></b-form-select>
          </b-form-group>
          <b-form-group class="col-6" label="Abnormal Flag"> 
            <b-form-select v-model="lab.lab_abnormal_flag" name="abnormal_flag" id="abnormal_flag" :options="flagOptions"></b-form-select>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-12" label="Document Upload"> 
            <input type="file" name="document_upload" id="document_upload" class="form-control">
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-6" label="Results"> 
            <b-form-textarea
              placeholder="Lab results"
              v-model="lab.lab_results"
              rows="3"
              class="form-control"
              name="results" id="results"
              no-resize
            ></b-form-textarea>
          </b-form-group>
          <b-form-group class="col-6" label="Results Instructions"> 
            <b-form-textarea
              placeholder="Lab results instructions"
              v-model="lab.lab_results_instructions"
              rows="3"
              name="result_instructions" id="result_instructions"
              no-resize
            ></b-form-textarea>
          </b-form-group>
          
        </div>
        <footer class="x-modal__footer">
          <button @click="doStartEdit" class="btn btn-action main-action">Edit</button>
          <button class="btn btn-action" @click="$bvModal.hide('edit-lab-modal')">Cancel</button>
          
        </footer>

      </form>
    </main>
    
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { ILab } from '~/api/models/patient-data.model'
@Component
export default class EditLabModal extends Vue{
  @Prop({required: true}) lab!: ILab
  
  
  public get unitOptions()  {
    return [
      { value: null, text: 'Please select an option' },
      { value: 'mmHg', text: 'mmHg' },
      { value: 'meters cubed', text: 'meters cubed' },
      { value: 'ml', text: 'ml' },
      { value: 'centimeters cubed', text: 'centimeters cubed' },
    ]
  }
  public get flagOptions()  {
    return [
      { value: null, text: 'Please select an option' },
      { value: 'Abnormal', text: 'Abnormal' },
      { value: 'Normal', text: 'Normal' },
      
    ]
  }
  

  doStartEdit(){
    const form = document.querySelector("#edit-lab-form")
    
    // @ts-ignore
    const formData = new FormData(form)
    if(formData.get('document_upload') == ''){
      formData.delete('document_upload')
    }
    this.$emit('edit', this.lab, formData)
    //@ts-ignore
    this.$bvModal.hide('edit-lab-modal')
  }
}
</script>