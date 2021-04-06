<template>
  <b-modal hide-header hide-footer  body-class="x-modal" id="delete-as-modal">
    <header class="x-modal__header">
      <span class="title">Delete Document</span>
    </header>
    <main>
      Are you sure you want to delete: Substance {{as.substance_id}} ?
      <footer class="x-modal__footer">
        <button @click="doDeleteAs" class="btn btn-action main-action">Delete</button>
        <button class="btn btn-action" @click="$bvModal.hide('delete-as-modal')">Cancel</button>
        
      </footer>
    </main>
    
  </b-modal>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { IAbusiveSubstance } from '~/api/models/patient-data.model'
@Component
export default class DeleteAsModal extends Vue{
  @Prop({required: true}) as!: IAbusiveSubstance

  doDeleteAs(){
    this.$emit('delete', this.as)
    //@ts-ignore
    this.$bvModal.hide('delete-as-modal')
  }
}
</script>