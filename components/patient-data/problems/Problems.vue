<template>
  <div id="radiologies">
    <div>
      <!-- {{problems}} -->
    </div>
    <div class="patient-data-grid">
      <div class="data-item" :key="pb.problem_id" v-for="pb in problems">
        <header>
          <div class="title-field">
            <span class="title-key" >Cpt Code:</span>
            <span class="title-value">{{pb.problem_icd}}</span>
          </div>
          <div class="actions">
            <!-- <i class="bi bi-plus-square action" @click="openCreatePb"></i> -->
            <i class="bi bi-pencil-square action action-edit" @click="openEditPb(pb)"></i>
            <i class="bi bi-trash action action-delete" @click="openDeletePb(pb)"></i>
          </div>
        </header>
        <main>
          
        </main>
        <footer >
          <div class="date-field">
            <span class="date-key" >Date onset</span>
            <span class="date-value" v-html="convertDate(pb.problem_date_onset)"></span>
          </div>
          
        </footer>
      </div>
    </div>
    <delete-pb-modal @delete="onDeletePb" :pb="currentPb"/>
    <edit-pb-modal @edit="onEditPb" :pb="currentPb"/>
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

@Component({
  components:{
    deletePbModal: DeletePbModal,
    editPbModal: EditPbModal
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