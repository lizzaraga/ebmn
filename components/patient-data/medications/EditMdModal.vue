<template>
  <b-modal size="md" hide-header hide-footer  body-class="x-modal" id="edit-md-modal">
    <header class="x-modal__header">
      <span class="title">Edit Medication</span>
    </header>
    <main>
      <form @submit.prevent="doStartEdit" id="edit-md-form">
        
        <div class="row">
          <b-form-group class="col-6"  label="Reception Status"> 
            <b-form-select v-model="md.problem_current_status" 
            :options="status" name="reception_status" id="reception_status" ></b-form-select>
          </b-form-group>
          <b-form-group class="col-6" label="Instructions On Delivery"> 
            <b-input v-model="md.medication_instructions_on_delivery"  name="instructions_on_delivery" 
            id="instructions_on_delivery"/>
          </b-form-group>
        </div>
        
       
      </form>
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('edit-md-modal')">Cancel</button>
      <button @click="doStartEdit" class="btn btn-action">Edit</button>
    </footer>

  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { IMedication,  } from '~/api/models/patient-data.model'
@Component
export default class EditMdModal extends Vue{
  @Prop({required: true}) md!: IMedication
  
  
  public get status()  {
    return [
      { value: null, text: 'Please select an option' },
      { value: 'Received', text: 'Received' },
      { value: 'Not Received', text: 'Not Received' },
      
      
    ]
  }
 
  

  doStartEdit(){
    const form = document.querySelector("#edit-md-form")
    // @ts-ignore
    const formData = new FormData(form)
    this.$emit('edit', this.md, formData)
  }
}
</script>