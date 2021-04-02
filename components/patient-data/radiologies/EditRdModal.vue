<template>
  <b-modal size="md" hide-header hide-footer  body-class="x-modal" id="edit-rd-modal">
    <header class="x-modal__header">
      <span class="title">Edit Radiology</span>
    </header>
    <main>
      <form @submit.prevent="doStartEdit" id="edit-rd-form">
        
        <div class="row">
          <b-form-group class="col-6"  label="Units"> 
            <b-form-select v-model="rd.radiology_units" :options="unitOptions" name="units" id="units"></b-form-select>
          </b-form-group>
          <b-form-group class="col-6" label="Abnormal Flag"> 
            <b-form-select v-model="rd.radiology_abnormal_flag" name="abnormal_flag" id="abnormal_flag" :options="flagOptions"></b-form-select>
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
              placeholder="Radiology results"
              v-model="rd.radiology_results"
              rows="3"
              class="form-control"
              name="results" id="results"
              no-resize
            ></b-form-textarea>
          </b-form-group>
          <b-form-group class="col-6" label="Results Instructions"> 
            <b-form-textarea
              placeholder="Radiology results instructions"
              v-model="rd.radiology_results_instructions"
              rows="3"
              name="result_instructions" id="result_instructions"
              no-resize
            ></b-form-textarea>
          </b-form-group>
          
        </div>
        
      </form>
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('edit-rd-modal')">Cancel</button>
      <button @click="doStartEdit" class="btn btn-action">Edit</button>
    </footer>

  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import {IRadiology } from '~/api/models/patient-data.model'
@Component
export default class EditRdModal extends Vue{
  @Prop({required: true}) rd!: IRadiology
  
  
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
    const form = document.querySelector("#edit-rd-form")
    // @ts-ignore
    const formData = new FormData(form)
    this.$emit('edit', this.rd, formData)
  }
}
</script>