<template>
  <div id="surgeries">
    <div>
      {{surgeries}}
    </div>
    <div class="patient-data-grid">
      <div class="data-item" :key="sg.surgery_id" v-for="sg in surgeries">
        <header>
          <div class="title-field">
            <span class="title-key" >Cpt code:</span>
            <span class="title-value">{{sg.surgery_cpt_code}}</span>
          </div>
          <div class="actions">
            <i class="bi bi-plus-square action" @click="openCreateSg"></i>
            <i class="bi bi-pencil-square action action-edit" @click="openEditSg(sg)"></i>
            <i class="bi bi-trash action action-delete" @click="openDeleteSg(sg)"></i>
          </div>
        </header>
        <main>
          
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
    <edit-surgery-modal @edit="onEditSg" :sg="currentSg"/>
    <delete-surgery-modal @delete="onDeleteSg" :sg="currentSg"/>
    <create-surgery-modal @create="onCreateSg"/>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
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
  private surgeryStore = getModule(SurgeryStore, this.$store)
  private currentSg: ISurgery = {surgery_id: -1,surgery_result_problem_list: [] }
  patientId = 27;
  
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
  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.surgeryStore.getSurgeries(27)
  }
}
</script>