<template>
  <div id="surgeries" class="data-grid">
    
    <div class="data-grid-main">
      
      <div class="patient-data-grid">
        <div class="data-item" :key="sg.surgery_id" v-for="sg in surgeries">
          <header>
            <div class="title-field">
              <span class="title-key" >Cpt code:</span>
              <span class="title-value">{{sg.surgery_cpt_code}}</span>
            </div>
            <div class="actions">
              <i class="bi bi-pencil-square action action-edit" @click="openEditSg(sg)"></i>
              <i class="bi bi-trash action action-delete" @click="openDeleteSg(sg)"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Description</span>
              <span class="data-value">{{sg.surgery_description}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Anaestasia</span>
              <span class="data-value">{{sg.surgery_anaestasia}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Frozen section pathology</span>
              <span class="data-value">{{sg.surgery_frozen_section_pathology}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Ordered at</span>
              <span class="data-value">{{sg.surgery_ordered_at}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Health institute</span>
              <span class="data-value">{{sg.surgery_health_institute_dispenser}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Comment before</span>
              <span class="data-value">{{sg.surgery_before}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Comment after</span>
              <span class="data-value">{{sg.surgery_comments_after}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Response</span>
              <span class="data-value">{{sg.surgery_response}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Problems: </span>
              <span class="data-value">{{sg.surgery_result_problem_list.join(', ')}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Document:</span>
              <a :href="sg.surgery_legal_document_approval" target="_blank" style="color: #088AE9" class="data-value d-flex align-items-center">
                <i class="bi bi-link-45deg"></i>
                <span class="ml-2">{{getFileName(sg.surgery_legal_document_approval)}}</span>
              </a>
            </div>
          </main>
          <footer >
            <div class="date-field">
              <span class="date-key" >Date ordered on</span>
              <span class="date-value" v-html="convertDate(sg.surgery_ordered_on)"></span>
            </div>
            <div class="date-field">
              <span class="date-key" >Surgery date</span>
              <span class="date-value" v-html="convertDate(sg.surgery_date)"></span>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreateSg">Create Surgery</button>
    </footer>
    <edit-surgery-modal @edit="onEditSg" :sg="currentSg"/>
    <delete-surgery-modal @delete="onDeleteSg" :sg="currentSg"/>
    <create-surgery-modal :patientId="patientId" @create="onCreateSg"/>
  </div>
</template>
<script lang="ts">
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import SurgeryStore from '@/store/patient-data/surgery-store'
import { ISurgery } from '~/api/models/patient-data.model';
import moment from 'moment';
import DeleteSurgeryModal from './DeleteSurgeryModal.vue';
import EditSurgeryModal from './EditSurgeryModal.vue';
import CreateSgModal from './CreateSurgeryModal.vue';
@Component({
  components:{
    deleteSurgeryModal: DeleteSurgeryModal,
    editSurgeryModal: EditSurgeryModal,
    createSurgeryModal: CreateSgModal
  }
})
export default class Surgeries extends Vue{
  @Prop({required: true}) patientId!:number
  private surgeryStore = getModule(SurgeryStore, this.$store)
  private currentSg: ISurgery = {surgery_id: -1,surgery_result_problem_list: [] }
  
  
  public get surgeries() {
    return this.surgeryStore.surgeries
  }

  openCreateSg(){
    // @ts-ignore
    this.$bvModal.show('create-sg-modal')
  }
  openDeleteSg(sg: ISurgery){
    this.currentSg = sg
    // @ts-ignore
    this.$bvModal.show('delete-sg-modal')
  }
  openEditSg(sg: ISurgery){
    this.currentSg = Object.assign({}, sg)
    // @ts-ignore
    this.$bvModal.show('edit-sg-modal')
  }

  // Main actions
  async onCreateSg(formData: FormData){
    await this.surgeryStore.createSurgery({patientId: this.patientId, formData})
  }
  async onEditSg(sg: ISurgery, formData: FormData){
    let sgId = Number(sg.surgery_id)

    await this.surgeryStore.editSurgery({ patientId: this.patientId, sgId, formData})
  }

  async onDeleteSg(sg: ISurgery){
    let sgId = Number(sg.surgery_id)
    await this.surgeryStore.deleteSurgery({patientId: this.patientId, sgId})
  }

  getFileName(path: string){
    if(path == undefined) return ""
    const parts = path.split('/')
    return parts.pop()
  }
  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.surgeryStore.getSurgeries(this.patientId)
  }
}
</script>