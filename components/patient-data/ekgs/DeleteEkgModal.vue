<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-ekg-modal">
    <header class="x-modal__header">
      <span class="title">Delete Ekg</span>
    </header>
    <main>
      Are you sure you want to delete: Ekg {{ekg.ekg_id}} ?
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('delete-ekg-modal')">Cancel</button>
      <button @click="doDeleteEkg" class="btn btn-action">Delete</button>
    </footer>
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import {  IEkg } from '~/api/models/patient-data.model'
@Component
export default class DeleteEkgModal extends Vue{
  @Prop({required: true}) ekg!: IEkg
  doDeleteEkg(){
    this.$emit('delete', this.ekg)
  }
}
</script>