<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-ld-modal">
    <header class="x-modal__header">
      <span class="title">Delete Document</span>
    </header>
    <main>
      Are you sure you want to delete: Document {{ld.document_id}} ?
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('delete-ld-modal')">Cancel</button>
      <button @click="doDeleteLd" class="btn btn-action">Delete</button>
    </footer>
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import {  ILegalDocument } from '~/api/models/patient-data.model'
@Component
export default class DeleteLdModal extends Vue{
  @Prop({required: true}) ld!: ILegalDocument

  doDeleteLd(){
    alert("Delete")
  }
}
</script>