<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-lab-modal">
    <header class="x-modal__header">
      <span class="title">Delete Lab</span>
    </header>
    <main>
      Are you sure you want to delete: LAB {{lab.lab_id}} ?
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('delete-lab-modal')">Cancel</button>
      <button @click="doDeleteLab" class="btn btn-action">Delete</button>
    </footer>
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { ILab } from '~/api/models/patient-data.model'
@Component
export default class DeleteLabModal extends Vue{
  @Prop({required: true}) lab!: ILab

  doDeleteLab(){
    this.$emit('delete', this.lab)
  }
}
</script>