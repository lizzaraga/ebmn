<template>
  <div id="radiologies" class="data-grid">
    
    <div class="data-grid-main">
      <div class="patient-data-grid">
        <div class="data-item" :key="rd.problem_id" v-for="rd in radiologies">
          <header>
            <div class="title-field">
              <span class="title-key" >Loinc Code:</span>
              <span class="title-value">{{rd.radiology_loinc_code}}</span>
            </div>
            <div class="actions">
              <i class="bi bi-pencil-square action action-edit" @click="openEditRd(rd)"></i>
              <i class="bi bi-trash action action-delete" @click="openDeleteRd(rd)"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Ordered at: </span>
              <span class="data-value">{{rd.radiology_ordered_at}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Done at: </span>
              <span class="data-value">{{rd.radiology_done_at}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Units: </span>
              <span class="data-value">{{rd.radiology_units}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Abnormal flag: </span>
              <span class="data-value">{{rd.radiology_abnormal_flag}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Instructions</span>
              <span class="data-value">{{rd.radiology_order_instructions}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Results</span>
              <span class="data-value">{{rd.radiology_results}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Description: </span>
              <span class="data-value">{{rd.radiology_description}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Problems: </span>
              <span class="data-value">{{rd.radiology_results_problems_list.join(', ')}}</span>
            </div>
          </main>
          <footer >
            <div class="date-field">
              <span class="date-key" >Date Issued</span>
              <span class="date-value" v-html="convertDate(rd.radiology_date_issued)"></span>
            </div>
            <div class="date-field">
              <span class="date-key" >Date last modified</span>
              <span class="date-value" v-html="convertDate(rd.radiology_date_last_modified)"></span>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreateRd">Create Radiology</button>
    </footer>
    <delete-rd-modal @delete="onDeleteRd" :rd="currentRd"/>
    <edit-rd-modal @edit="onEditRd" :rd="currentRd"/>
    <create-rd-modal :patientId="patientId" @create="onCreateRd"/>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IRadiology } from '~/api/models/patient-data.model';
import RadiologyStore from '~/store/patient-data/radiology-store';
import CreateRdModal from './CreateRdModal.vue';
import DeleteRdModal from './DeleteRdModal.vue';
import EditRdModal from './EditRdModal.vue';

@Component({
  components:{
    deleteRdModal: DeleteRdModal,
    editRdModal: EditRdModal,
    createRdModal: CreateRdModal
  }
})
export default class Radiologies extends Vue{
  @Prop({required: true}) patientId!:number
  private radiologyStore = getModule(RadiologyStore, this.$store)
  private currentRd: IRadiology = {radiology_id: -1,radiology_results_problems_list: [] }
  
  

  public get radiologies() {
    return this.radiologyStore.radiologies
  }

  openCreateRd(){
    // @ts-ignore
    this.$bvModal.show('create-rd-modal')
  }
  openDeleteRd(rd: IRadiology){
    this.currentRd = rd
    // @ts-ignore
    this.$bvModal.show('delete-rd-modal')
  }
  openEditRd(rd: IRadiology){
    this.currentRd = Object.assign({}, rd)
    // @ts-ignore
    this.$bvModal.show('edit-rd-modal')
  }

  // Main actions
  async onCreateRd(formData: FormData){
    await this.radiologyStore.createRadiology({patientId: this.patientId, formData})
  }
  async onEditRd(rd: IRadiology, formData: FormData){
    let rdId = Number(rd.radiology_id)

    await this.radiologyStore.editRadiology({ patientId: this.patientId, rdId, formData})
  }

  async onDeleteRd(rd: IRadiology){
    let rdId = Number(rd.radiology_id)
    await this.radiologyStore.deleteRadiology({patientId: this.patientId, rdId})
  }
  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.radiologyStore.getRadiologies(this.patientId)
  }
}
</script>