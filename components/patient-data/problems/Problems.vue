<template>
  <div id="radiologies">
    <div>
      {{problems}}
    </div>
    <div class="patient-data-grid">
      <div class="data-item" :key="pb.problem_id" v-for="pb in problems">
        <header>
          <div class="title-field">
            <span class="title-key" >Cpt Code:</span>
            <span class="title-value">{{pb.problem_icd}}</span>
          </div>
          <div class="actions">
            <i class="bi bi-plus-square action" @click="openCreatePb"></i>
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
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IProblem } from '~/api/models/patient-data.model';
import ProblemStore from '~/store/patient-data/problem-store';

@Component
export default class Problems extends Vue{
  private pbStore = getModule(ProblemStore, this.$store)
  private currentPb: IProblem = {problem_id: -1, }
  
  
  public get problems() {
    return this.pbStore.problems
  }


  openCreatePb(){
    // @ts-ignore
    this.$bvModal.show('create-pb-modal')
  }
  openDeleteLab(pb: IProblem){
    this.currentPb = pb
    // @ts-ignore
    this.$bvModal.show('delete-pb-modal')
  }
  openEditLab(pb: IProblem){
    this.currentPb = Object.assign({}, pb)
    // @ts-ignore
    this.$bvModal.show('edit-pb-modal')
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.pbStore.getProblems(27)
  }
}
</script>