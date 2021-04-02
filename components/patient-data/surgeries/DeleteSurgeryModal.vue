<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-sg-modal">
    <header class="x-modal__header">
      <span class="title">Delete Surgery</span>
    </header>
    <main>
      Are you sure you want to delete: Surgery {{sg.surgery_id}} ?
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('delete-sg-modal')">Cancel</button>
      <button @click="doDeleteSg" class="btn btn-action">Delete</button>
    </footer>
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { ISurgery } from '~/api/models/patient-data.model'
@Component
export default class DeleteRdModal extends Vue{
  @Prop({required: true}) sg!: ISurgery

  doDeleteSg(){
    this.$emit('delete', this.sg)
  }
}
</script>