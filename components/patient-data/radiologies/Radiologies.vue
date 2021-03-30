<template>
  <div id="radiologies">
    <div>
      {{radiologies}}
    </div>
    <div class="patient-data-grid">
      <div class="data-item" :key="rd.problem_id" v-for="rd in radiologies">
        <header>
          <div class="title-field">
            <span class="title-key" >Loinc Code:</span>
            <span class="title-value">{{rd.radiology_loinc_code}}</span>
          </div>
          <div class="actions">
            <i class="bi bi-plus-square action" @click="openCreateRd"></i>
            <i class="bi bi-pencil-square action action-edit" @click="openEditRd(rd)"></i>
            <i class="bi bi-trash action action-delete" @click="openDeleteRd(rd)"></i>
          </div>
        </header>
        <main>
          
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
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IRadiology } from '~/api/models/patient-data.model';
import RadiologyStore from '~/store/patient-data/radiology-store';

@Component
export default class Radiologies extends Vue{
  private radiologyStore = getModule(RadiologyStore, this.$store)
  private currentRd: IRadiology = {radiology_id: -1,radiology_results_problems_list: [] }
  
  public get radiologies() {
    return this.radiologyStore.radiologies
  }

  openCreateRd(){
    // @ts-ignore
    this.$bvModal.show('create-rd-modal')
  }
  openDeleteLab(rd: IRadiology){
    this.currentRd = rd
    // @ts-ignore
    this.$bvModal.show('delete-rd-modal')
  }
  openEditLab(rd: IRadiology){
    this.currentRd = Object.assign({}, rd)
    // @ts-ignore
    this.$bvModal.show('edit-rd-modal')
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.radiologyStore.getRadiologies(27)
  }
}
</script>