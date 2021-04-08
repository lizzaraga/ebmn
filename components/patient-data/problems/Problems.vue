<template>
  <div id="problems" class="data-grid">
    <div class="data-grid-main">
      
      <div class="patient-data-grid">
        <div class="data-item" :key="pb.problem_id" v-for="pb in problems">
          <header>
            <div class="title-field">
              <span class="title-key" >Cpt Code:</span>
              <span class="title-value">{{pb.problem_icd}}</span>
            </div>
            <div class="actions">
              
              <i class="bi bi-pencil-square action action-edit" @click="openEditPb(pb)"></i>
              <i class="bi bi-trash action action-delete" @click="openDeletePb(pb)"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Author: </span>
              <span class="data-value">{{pb.author}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Name: </span>
              <span class="data-value">{{pb.problem_name}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Title: </span>
              <span class="data-value">{{pb.title}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Organ system: </span>
              <span class="data-value">{{pb.problem_organ_system}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Current status: </span>
              <span class="data-value">{{pb.problem_current_status}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Priority: </span>
              <span class="data-value">{{pb.problem_priority}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Diagnosed at: </span>
              <span class="data-value">{{pb.problem_diagnosed_at}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Treatment at: </span>
              <span class="data-value">{{pb.problem_treatment_at}}</span>
            </div>
          </main>
          <footer >
            <div class="date-field">
              <span class="date-key" >Date onset</span>
              <span class="date-value" v-html="convertDate(pb.problem_date_onset)"></span>
            </div>
            
          </footer>
        </div>
      </div>
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreatePb">Create Problem</button>
    </footer>
    <delete-pb-modal @delete="onDeletePb" :pb="currentPb"/>
    <edit-pb-modal @edit="onEditPb" :pb="currentPb"/>
    <create-pb-modal @create="onCreatePb"/>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IProblem } from '~/api/models/patient-data.model';
import ProblemStore from '~/store/patient-data/problem-store';
import DeletePbModal from './DeletePbModal.vue';
import EditPbModal from './EditPbModal.vue';
import CreatePbModal from './CreatePbModal.vue'

@Component({
  components:{
    deletePbModal: DeletePbModal,
    editPbModal: EditPbModal,
    CreatePbModal
  }
})
export default class Problems extends Vue{
  @Prop({required: true}) patientId!:number
  private pbStore = getModule(ProblemStore, this.$store)
  private currentPb: IProblem = {problem_id: -1, }
  
  
  public get problems() {
    return this.pbStore.problems
  }


  openCreatePb(){
    // @ts-ignore
    this.$bvModal.show('create-pb-modal')
  }
  openDeletePb(pb: IProblem){
    this.currentPb = pb
    // @ts-ignore
    this.$bvModal.show('delete-pb-modal')
  }
  openEditPb(pb: IProblem){
    this.currentPb = Object.assign({}, pb)
    // @ts-ignore
    this.$bvModal.show('edit-pb-modal')
  }

  // Main actions
  async onCreatePb(formData: FormData){
    await this.pbStore.createProblem({patientId: this.patientId, formData})
  }
  async onEditPb(pb: IProblem, formData: FormData){
    let pbId = Number(pb.problem_id)

    await this.pbStore.editProblem({ patientId: this.patientId, pbId, formData})
  }
  async onDeletePb(pb: IProblem){
    let pbId = Number(pb.problem_id)
    await this.pbStore.deleteProblem({patientId: this.patientId, pbId})
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.pbStore.getProblems(this.patientId)
  }
}
</script>