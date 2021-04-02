<template>
  <div id="medications">
    <div>
      {{medications}}
    </div>
    <div class="patient-data-grid">
      <div class="data-item" :key="md.medication_id" v-for="md in medications">
        <header>
          <div class="title-field">
            <span class="title-key" >Rxnorm Label:</span>
            <span class="title-value">{{md.medication_rxnorm_label}}</span>
          </div>
          <div class="actions">
            <i class="bi bi-plus-square action" @click="openCreateMd"></i>
            <i class="bi bi-pencil-square action action-edit" @click="openEditMd(md)"></i>
            <i class="bi bi-trash action action-delete" @click="openDeleteMd(md)"></i>
          </div>
        </header>
        <main>
          
        </main>
        <footer >
          <div class="date-field">
            <span class="date-key" >Date Ordered</span>
            <span class="date-value" v-html="convertDate(md.medication_date_ordered)"></span>
          </div>
          <div class="date-field">
            <span class="date-key" >Date last modified</span>
            <span class="date-value" v-html="convertDate(md.medication_last_modified)"></span>
          </div>
        </footer>
      </div>
    </div>
    <delete-md-modal @delete="onDeleteMd" :md="currentMd"/>
    <edit-md-modal @edit="onEditMd" :md="currentMd"/>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IMedication } from '~/api/models/patient-data.model';
import MedicationStore from '~/store/patient-data/medication-store';
import DeleteMdModal from './DeleteMdModal.vue';
import EditMdModal from './EditMdModal.vue';

@Component({
  components:{
    deleteMdModal: DeleteMdModal,
    editMdModal: EditMdModal
  }
})
export default class Medications extends Vue{
  private medicationStore = getModule(MedicationStore, this.$store)
  private currentMd: IMedication = {medication_id: -1,medication_related_problems: [] }
  patientId = 27
  
  public get medications() {
    return this.medicationStore.medications
  }

  openCreateMd(){
    // @ts-ignore
    this.$bvModal.show('create-md-modal')
  }
  openDeleteMd(md: IMedication){
    this.currentMd = md
    // @ts-ignore
    this.$bvModal.show('delete-md-modal')
  }
  openEditMd(md: IMedication){
    this.currentMd = Object.assign({}, md)
    // @ts-ignore
    this.$bvModal.show('edit-md-modal')
  }

  // Main actions
  async onCreateMd(formData: FormData){
    await this.medicationStore.createMedication({patientId: this.patientId, formData})
  }
  async onEditMd(md: IMedication, formData: FormData){
    let mdId = Number(md.medication_id)

    await this.medicationStore.editMedication({ patientId: this.patientId, mdId, formData})
  }
  async onDeleteMd(md: IMedication){
    let mdId = Number(md.medication_id)
    await this.medicationStore.deleteMedication({patientId: this.patientId, mdId})
  }


  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.medicationStore.getMedications(27)
  }
}
</script>