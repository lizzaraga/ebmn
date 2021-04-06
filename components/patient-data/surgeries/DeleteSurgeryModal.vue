<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-sg-modal">
    <header class="x-modal__header">
      <span class="title">Delete Surgery</span>
    </header>
    <main>
      Are you sure you want to delete: Surgery {{sg.surgery_id}} ?
      <footer class="x-modal__footer">
        <button @click="doDeleteSg" class="btn btn-action main-action">Delete</button>
        <button class="btn btn-action" @click="$bvModal.hide('delete-sg-modal')">Cancel</button>
        
      </footer>
    </main>
    
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { ISurgery } from '~/api/models/patient-data.model'
@Component
export default class DeleteSurgeryModal extends Vue{
  @Prop({required: true}) sg!: ISurgery

  doDeleteSg(){
    this.$emit('delete', this.sg)
    //@ts-ignore
    this.$bvModal.hide('delete-sg-modal')
  }
}
</script>