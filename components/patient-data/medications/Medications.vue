<template>
  <div id="medications" class="data-grid">
    
    <div class="data-grid-main">
   
      <div class="patient-data-grid">
        
        <div class="data-item" :key="md.medication_id" v-for="md in medications">
          <header>
            <div class="title-field">
              <span class="title-key" >Rxnorm Label:</span>
              <span class="title-value">{{md.medication_rxnorm_label}}</span>
            </div>
            <div class="actions">
            
              <i class="bi bi-pencil-square action action-edit" @click="openEditMd(md)"></i>
              <i class="bi bi-trash action action-delete" @click="openDeleteMd(md)"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Ordered by</span>
              <span class="data-value">{{md.medication_ordered_by}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Health Institute</span>
              <span class="data-value">{{md.medication_dispenser_health_institute}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Route</span>
              <span class="data-value">{{md.medication_route}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Reception status</span>
              <span class="data-value">{{md.medication_reception_status}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Frequency</span>
              <span class="data-value">{{md.medication_frequency}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Type of therapy</span>
              <span class="data-value">{{md.medication_type_of_therapy}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Duration</span>
              <span class="data-value">{{md.medication_duration}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Dosage</span>
              <span class="data-value">{{md.medication_dosage}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Dosage unit</span>
              <span class="data-value">{{md.medication_dosage_unit}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Dosage volume</span>
              <span class="data-value">{{md.medication_volume_dosage}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Instr. on prescription</span>
              <span class="data-value">{{md.medication_instruction_on_prescription}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Instr. on delivery</span>
              <span class="data-value">{{md.medication_instructions_on_delivery}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Problems: </span>
              <span class="data-value">{{md.medication_related_problems.join(', ')}}</span>
            </div>
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
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreateMd">Create Medication</button>
    </footer>
    <delete-md-modal @delete="onDeleteMd" :md="currentMd"/>
    <edit-md-modal @edit="onEditMd" :md="currentMd"/>
    <create-md-modal @create="onCreateMd"/>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IMedication } from '~/api/models/patient-data.model';
import MedicationStore from '~/store/patient-data/medication-store';
import CreateMdModal from './CreateMdModal.vue';
import DeleteMdModal from './DeleteMdModal.vue';
import EditMdModal from './EditMdModal.vue';

@Component({
  components:{
    deleteMdModal: DeleteMdModal,
    editMdModal: EditMdModal,
    createMdModal: CreateMdModal
  }
})
export default class Medications extends Vue{
  @Prop({required: true}) patientId!:number
  private medicationStore = getModule(MedicationStore, this.$store)
  private currentMd: IMedication = {medication_id: -1,medication_related_problems: [] }
  
  
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
    await this.medicationStore.getMedications(this.patientId)
  }
}
</script>