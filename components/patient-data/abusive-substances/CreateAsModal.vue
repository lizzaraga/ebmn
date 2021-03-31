<template>
  <b-modal  hide-header hide-footer  body-class="x-modal" id="create-as-modal">
    <header class="x-modal__header">
      <span class="title">Create Substance</span>
    </header>
    <main>
      <form @submit.prevent="doStartCreate" id="create-as-form">
        
        <div class="row">
          <b-form-group class="col-6"  label="Substance"> 
            <b-input  name="substance" id="substance" ></b-input>
          </b-form-group>
          <b-form-group class="col-6"  label="Substance details"> 
            <b-input  name="substance_details" id="substance_details" ></b-input>
          </b-form-group>
          
        </div>
        <div class="row">
          <b-form-group class="col-12"  label="Status"> 
            <b-form-select :selected='null' :options="status" name="status" id="status" ></b-form-select>
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group class="col-12" label="Comments"> 
              <b-form-textarea
                placeholder="Comments"
                name="comments" id="comments"
                rows="3"
                no-resize
              ></b-form-textarea>
          </b-form-group>
        </div>
       
      </form>
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('create-as-modal')">Cancel</button>
      <button @click="doStartCreate" class="btn btn-action">Create</button>
    </footer>

  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'

@Component
export default class CreateAsModal extends Vue{

  public get status()  {
    return [
      { value: null, text: 'Please select an option', disabled: true },
      { value: 'Active', text: 'Active' },
      { value: 'Inactive', text: 'Inactive' },
      
      
    ]
  }
  
  

  doStartCreate(){
    const form = document.querySelector("#create-as-form")
    // @ts-ignore
    const formData = new FormData(form)
    this.$emit('create', formData)
  }
}
</script>