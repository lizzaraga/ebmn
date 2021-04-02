<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-rd-modal">
    <header class="x-modal__header">
      <span class="title">Delete Radiology</span>
    </header>
    <main>
      Are you sure you want to delete: Radiology {{rd.radiology_id}} ?
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('delete-rd-modal')">Cancel</button>
      <button @click="doDeleteRd" class="btn btn-action">Delete</button>
    </footer>
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import {  IRadiology } from '~/api/models/patient-data.model'
@Component
export default class DeleteRdModal extends Vue{
  @Prop({required: true}) rd!: IRadiology

  doDeleteRd(){
    this.$emit('delete', this.rd)
  }
}
</script>