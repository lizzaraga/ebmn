<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-allergy-modal">
    <header class="x-modal__header">
      <span class="title">Delete Allergy</span>
    </header>
    <main>
      Are you sure you want to delete: Allergy {{allergy.allergy_id}} ?
      <footer class="x-modal__footer">
        <button @click="doDeleteAllergy" class="btn btn-action main-action">Delete</button>
        <button class="btn btn-action" @click="$bvModal.hide('delete-allergy-modal')">Cancel</button>
        
      </footer>
    </main>
    
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import {  IAllergy } from '~/api/models/patient-data.model'
@Component
export default class DeleteAllergyModal extends Vue{
  @Prop({required: true}) allergy!: IAllergy

  doDeleteAllergy(){
    this.$emit('delete', this.allergy)
    //@ts-ignore
    this.$bvModal.hide('delete-allergy-modal')
  }
}
</script>