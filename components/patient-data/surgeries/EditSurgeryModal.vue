<template>
  <b-modal size="md" hide-header hide-footer  body-class="x-modal" id="edit-sg-modal">
    <header class="x-modal__header">
      <span class="title">Edit Surgery</span>
    </header>
    <main>
      <form @submit.prevent="doStartEdit" id="edit-sg-form">
        
        <div class="row">
          <b-form-group class="col-12"  label="Surgery response"> 
            <b-input
                placeholder="Surgery response"
                name="surgery_response"
              ></b-input>
          </b-form-group>
          <b-form-group class="col-12"  label="Comments after"> 
            <b-form-textarea
                placeholder="Comments after"
                rows="3"
                class="form-control"
                name='comments_after'
                no-resize
              ></b-form-textarea>
          </b-form-group>
          
        </div>
        
       
      </form>
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('edit-sg-modal')">Cancel</button>
      <button @click="doStartEdit" class="btn btn-action">Edit</button>
    </footer>

  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { ISurgery } from '~/api/models/patient-data.model'
@Component
export default class EditPbModal extends Vue{
  @Prop({required: true}) sg!: ISurgery
  
  doStartEdit(){
    const form = document.querySelector("#edit-sg-form")
    // @ts-ignore
    const formData = new FormData(form)
    this.$emit('edit', this.sg, formData)
  }
}
</script>