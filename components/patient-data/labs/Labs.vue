<template>
  <div id="labs">
    {{labs}}
    <div class="patient-data-grid">
      <div class="data-item" :key="lab.lab_id" v-for="lab in labs">
        <header>
          <div class="title-field">
            <span class="title-key" >Loinc Code:</span>
            <span class="title-value">{{lab.lab_loinc_code}}</span>
          </div>
          <div class="actions">
            <i class="bi bi-plus-square action" @click="openCreateLab"></i>
            <i class="bi bi-pencil-square action action-edit" @click="openEditLab(lab)"></i>
            <i class="bi bi-trash action action-delete" @click="openDeleteLab(lab)"></i>
          </div>
        </header>
        <main>
          
        </main>
        <footer >
          <div class="date-field">
            <span class="date-key" >Date issued</span>
            <span class="date-value" v-html="convertDate(lab.lab_date_issued)"></span>
          </div>
          <div class="date-field">
            <span class="date-key">Date last modified</span>
            <span class="date-value" v-html="convertDate(lab.lab_date_last_modified)"></span>
          </div>
        </footer>
      </div>
    </div>
    <delete-lab-modal @delete="onDeleteLab" :lab="currentLab"/>
    <edit-lab-modal @edit="onEditLab" :lab="currentLab"/>
    <create-lab-modal @create="onCreateLab"/>
    <div class="fab">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, neque!</div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import LabStore from '~/store/patient-data/lab-store';
import moment from 'moment'
import { ILab } from '~/api/models/patient-data.model';
import DeleteLabModal from './DeleteLabModal.vue';
import EditLabModal from './UpdateLabModal.vue';
import CreateLabModal from './CreateLabModal.vue';
@Component({
  components:{
    deleteLabModal: DeleteLabModal,
    editLabModal: EditLabModal,
    createLabModal: CreateLabModal
  }
})
export default class Labs extends Vue{
  private labStore = getModule(LabStore, this.$store)
  private currentLab: ILab = {lab_id: -1, lab_results_problems_list: []}
  patientId = 27
  
  public get labs() {
    return this.labStore.labs
  }

  openCreateLab(){
    // @ts-ignore
    this.$bvModal.show('create-lab-modal')
  }
  openDeleteLab(lab: ILab){
    this.currentLab = lab
    // @ts-ignore
    this.$bvModal.show('delete-lab-modal')
  }
  openEditLab(lab: ILab){
    this.currentLab = Object.assign({}, lab)
    // @ts-ignore
    this.$bvModal.show('edit-lab-modal')
  }

  // Main actions
  async onCreateLab(formData: FormData){
    await this.labStore.createLab({patientId: this.patientId, formData})
  }
  async onEditLab(lab: ILab, formData: FormData){
    let labId = Number(lab.lab_id)

    await this.labStore.editLab({ patientId: this.patientId, labId, formData})
  }

  async onDeleteLab(lab: ILab){
    let labId = Number(lab.lab_id)
    await this.labStore.deleteLab({patientId: this.patientId, labId})
  }
  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }

  async mounted(){
    await this.labStore.getLabs(27)
  }
}
</script>
<style lang="scss">
.fab{
  position: absolute;
  right: 20px;
  bottom: 20px;
  
  background-color: #fff;
}

  
</style>