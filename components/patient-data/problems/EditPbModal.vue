<template>
  <b-modal size="md" hide-header hide-footer  body-class="x-modal" id="edit-pb-modal">
    <header class="x-modal__header">
      <span class="title">Edit Problem</span>
    </header>
    <main>
      <form @submit.prevent id="edit-pb-form">
        
        <div class="row">
          <b-form-group class="col-6"  label="Status"> 
            <b-form-select v-model="pb.problem_current_status" :options="status" name="current_status" id="current_status" ></b-form-select>
          </b-form-group>
          <b-form-group class="col-6" label="Priority"> 
            <b-form-select v-model="pb.problem_priority" 
            name="priority" id="priority" :options="priorities"></b-form-select>
          </b-form-group>
        </div>
        
       <footer class="x-modal__footer">
         <button @click="doStartEdit" class="btn btn-action main-action">Edit</button>
        <button class="btn btn-action" @click="$bvModal.hide('edit-pb-modal')">Cancel</button>
        
      </footer>

      </form>
    </main>
    
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { IProblem } from '~/api/models/patient-data.model'
@Component
export default class EditPbModal extends Vue{
  @Prop({required: true}) pb!: IProblem
  
  
  public get status()  {
    return [
      { value: null, text: 'Please select an option' },
      { value: 'On going treatment', text: 'On going treatment' },
      { value: 'Pending Treatment', text: 'Pending Treatment' },
      { value: 'Treated', text: 'Treated' },
      
    ]
  }
  public get priorities()  {
    return [
      { value: null, text: 'Please select an option' },
      { value: 'Normal', text: 'Normal' },
      { value: 'Severe', text: 'Severe' },
      { value: 'Very Severe', text: 'Very Severe' },
      
    ]
  }
  

  doStartEdit(){
    const form = document.querySelector("#edit-pb-form")
    // @ts-ignore
    const formData = new FormData(form)
    this.$emit('edit', this.pb, formData)
    //@ts-ignore
    this.$bvModal.hide('edit-pb-modal')
  }
}
</script>