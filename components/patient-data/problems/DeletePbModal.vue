<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-pb-modal">
    <header class="x-modal__header">
      <span class="title">Delete Problem</span>
    </header>
    <main>
      Are you sure you want to delete: Problem {{pb.problem_id}} ?
    </main>
    <footer class="x-modal__footer">
      <button class="btn btn-action" @click="$bvModal.hide('delete-pb-modal')">Cancel</button>
      <button @click="doDeletePb" class="btn btn-action">Delete</button>
    </footer>
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import {  IProblem } from '~/api/models/patient-data.model'
@Component
export default class DeletePbModal extends Vue{
  @Prop({required: true}) pb!: IProblem

  doDeletePb(){
    alert("Delete")
  }
}
</script>