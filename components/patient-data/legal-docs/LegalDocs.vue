<template>
  <div id="legal-docs">
    <div>
      {{lds}}
    </div>
    <div class="patient-data-grid">
      <div class="data-item" :key="ld.document_id" v-for="ld in lds">
        <header>
          <div class="title-field">
            <span class="title-key" >Category:</span>
            <span class="title-value">{{ld.document_category}}</span>
          </div>
          <div class="actions">
            <i class="bi bi-plus-square action" @click="openCreateLd"></i>
            <i class="bi bi-pencil-square action action-edit" @click="openEditLd(ld)"></i>
            <i class="bi bi-trash action action-delete" @click="openDeleteLd(ld)"></i>
          </div>
        </header>
        <main>
          
        </main>
        <footer >
          <div class="date-field">
            <span class="date-key" >Date of establishment</span>
            <span class="date-value" v-html="convertDate(ld.document_date_of_establishment)"></span>
          </div>
          <div class="date-field">
            <span class="date-key" >Decision date</span>
            <span class="date-value" v-html="convertDate(ld.document_decision_date)"></span>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import { ILegalDocument } from '~/api/models/patient-data.model';
import LDStore from '~/store/patient-data/ld-store';
@Component
export default class LegalDocs extends Vue{
  private ldStore = getModule(LDStore, this.$store)
  private currentld: ILegalDocument = {document_id: -1, }
  
  public get lds() {
    return this.ldStore.docs
  }

  openCreateLd(){
    // @ts-ignore
    this.$bvModal.show('create-ld-modal')
  }
  openDeleteLd(ld: ILegalDocument){
    this.currentld = ld
    // @ts-ignore
    this.$bvModal.show('delete-ld-modal')
  }
  openEditLd(ld: ILegalDocument){
    this.currentld = Object.assign({}, ld)
    // @ts-ignore
    this.$bvModal.show('edit-ld-modal')
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  
  async mounted(){
    await this.ldStore.getDocs(27)
  }
}
</script>