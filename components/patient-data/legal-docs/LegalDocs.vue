<template>
  <div id="legal-docs" class="data-grid">
    <div class="data-grid-main">
      <div class="patient-data-grid ">
        <div class="data-item" :key="ld.document_id" v-for="ld in lds">
          <header>
            <div class="title-field">
              <span class="title-key" >Category:</span>
              <span class="title-value">{{ld.document_category}}</span>
            </div>
            <div class="actions">
              
              <i class="bi bi-pencil-square action action-edit" @click="openEditLd(ld)"></i>
              <i class="bi bi-trash action action-delete" @click="openDeleteLd(ld)"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Reason for capacity:</span>
              <span class="data-value">{{ld.document_reason_for_capacity}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Reason for determination:</span>
              <span class="data-value">{{ld.document_reason_for_determination}}</span>
            </div>
             <div class="data-row">
              <span class="data-key">Document:</span>
              <a :href="ld.document_legal_document" target="_blank" style="color: #088AE9" class="data-value d-flex align-items-center">
                <i class="bi bi-link-45deg"></i>
                <span class="ml-2">{{getFileName(ld.document_legal_document)}}</span>
              </a>
            </div>
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
    
    <edit-or-create-ld-modal @create="onCreateLd" @edit="onEditLd" :isEditing="isEditing" :editData="currentLd"/>
    <delete-ld-modal @delete="onDeleteLd" :ld="currentLd"/>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreateLd">Create Document</button>
    </footer>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import { ILegalDocument } from '~/api/models/patient-data.model';
import LDStore from '~/store/patient-data/ld-store';
import DeleteLdModal from './DeleteLdModal.vue';
import EditOrCreateLdModal from './EditOrCreateLdModal.vue';
@Component({
  components:{
    editOrCreateLdModal: EditOrCreateLdModal,
    deleteLdModal: DeleteLdModal
  }
})
export default class LegalDocs extends Vue{
  @Prop({required: true}) patientId!:number
  private ldStore = getModule(LDStore, this.$store)
  private currentLd: ILegalDocument = {document_id: -1, }
  isEditing = false
  

  public get lds() {
    return this.ldStore.docs
  }

  openCreateLd(){
    this.isEditing = false
    // @ts-ignore
    this.$bvModal.show('create-ld-modal')
  }
  openDeleteLd(ld: ILegalDocument){
    //console.log(ld)
    this.currentLd = ld
    // @ts-ignore
    this.$bvModal.show('delete-ld-modal')
  }
  openEditLd(ld: ILegalDocument){
    this.isEditing = true
    this.currentLd = Object.assign({}, ld)
    // @ts-ignore
    this.$bvModal.show('create-ld-modal')
  }

  async onCreateLd(formData: FormData){
    await this.ldStore.createDoc({patientId: this.patientId, formData})
  }
  async onEditLd(ld: ILegalDocument, formData: FormData){
    await this.ldStore.editDoc({
      patientId: this.patientId,
      docId: ld.document_id!!,
      formData
    })
  }
  async onDeleteLd(ld: ILegalDocument){
    await this.ldStore.deleteDoc({
      patientId: this.patientId,
      docId: ld.document_id!!
    })
  }
  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  getFileName(path: string){
    if(path == undefined) return ""
    const parts = path.split('/')
    return parts.pop()
  }
  async mounted(){
    await this.ldStore.getDocs(27)
  }
}
</script>