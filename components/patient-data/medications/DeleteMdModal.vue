<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-md-modal">
    <header class="x-modal__header">
      <span class="title">Delete Medication</span>
    </header>
    <main>
      Are you sure you want to delete: Medication {{md.medication_id}} ?
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('delete-md-modal')">Cancel</button>
      <button @click="doDeleteMd" class="btn btn-action">Delete</button>
    </footer>
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import {  IMedication } from '~/api/models/patient-data.model'
@Component
export default class DeleteMdModal extends Vue{
  @Prop({required: true}) md!: IMedication

  doDeleteMd(){
    alert("Delete")
  }
}
</script>