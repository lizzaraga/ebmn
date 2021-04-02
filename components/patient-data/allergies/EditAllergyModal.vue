<template>
  <b-modal  hide-header hide-footer  body-class="x-modal" id="edit-allergy-modal">
    <header class="x-modal__header">
      <span class="title">Edit Allergy</span>
    </header>
    <main>
      <form @submit.prevent="doStartEdit" id="edit-allergy-form">
        
        <div class="row">
          <b-form-group class="col-12"  label="Status"> 
            <b-form-select v-model="allergy.status" 
            :options="status" name="status" id="status" ></b-form-select>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-12" label="Comments"> 
              <b-form-textarea
                placeholder="Allergy comments"
                v-model="allergy.comments"
                name="comments" id="comments"
                rows="3"
                no-resize
              ></b-form-textarea>
          </b-form-group>
        </div>
       
      </form>
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('edit-allergy-modal')">Cancel</button>
      <button @click="doStartEdit" class="btn btn-action">Edit</button>
    </footer>

  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { IAllergy } from '~/api/models/patient-data.model'
@Component
export default class EditAllergyModal extends Vue{
  @Prop({required: true}) allergy!: IAllergy
  
  
  public get status()  {
    return [
      { value: null, text: 'Please select an option' },
      { value: 'Active', text: 'Active' },
      { value: 'Inactive', text: 'Inactive' },
      
      
    ]
  }
  
  

  doStartEdit(){
    const form = document.querySelector("#edit-allergy-form")
    // @ts-ignore
    const formData = new FormData(form)
    this.$emit('edit', this.allergy, formData)
  }
}
</script>