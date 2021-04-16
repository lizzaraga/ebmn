<template>
  <div id="ekgs" class="data-grid">
    
    <div class="data-grid-main">
      <div class="patient-data-grid">
        <div class="data-item" :key="ekg.ekg_id" v-for="ekg in ekgs">
          <header>
            <div class="title-field">
              <span class="title-key" >Loinc Code:</span>
              <span class="title-value">{{ekg.ekg_loinc_code}}</span>
            </div>
            <div class="actions">
              
              <i class="bi bi-pencil-square action action-edit" @click="openEditEkg(ekg)"></i>
              <i class="bi bi-trash action action-delete" @click="openDeleteEkg(ekg)"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Ordered at: </span>
              <span class="data-value">{{ekg.ekg_ordered_at}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Done at: </span>
              <span class="data-value">{{ekg.ekg_done_at}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Units: </span>
              <span class="data-value">{{ekg.ekg_units}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Abnormal flag: </span>
              <span class="data-value">{{ekg.ekg_abnormal_flag}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Instructions</span>
              <span class="data-value">{{ekg.ekg_order_instructions}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Results</span>
              <span class="data-value">{{ekg.ekg_results}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Description: </span>
              <span class="data-value">{{ekg.ekg_description}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Problems: </span>
              <span class="data-value">{{ekg.ekg_results_problems_list.join(', ')}}</span>
            </div>
          </main>
          <footer >
            <div class="date-field">
              <span class="date-key" >Date Issued</span>
              <span class="date-value" v-html="convertDate(ekg.ekg_date_issued)"></span>
            </div>
            <div class="date-field">
              <span class="date-key" >Date last modified</span>
              <span class="date-value" v-html="convertDate(ekg.ekg_date_last_modified)"></span>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreateEkg">Create Ekg</button>
    </footer>
    <delete-ekg-modal @delete="onDeleteEkg" :ekg="currentEkg"/>
    <edit-ekg-modal  @edit="onEditEkg" :ekg="currentEkg"/>
    <create-ekg-modal :patientId="patientId" @create="onCreateEkg"/>
  </div>
</template>
<script lang="ts">
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import EkgStore from '@/store/patient-data/ekg-store'
import { IEkg } from '~/api/models/patient-data.model';
import moment from 'moment';
import DeleteEkgModal from './DeleteEkgModal.vue';
import EditEkgModal from './EditEkgModal.vue';
import CreateEkgModal from './CreateEkgModal.vue';

@Component({
  components: {
    deleteEkgModal: DeleteEkgModal,
    editEkgModal: EditEkgModal,
    createEkgModal: CreateEkgModal
  }
})
export default class Ekgs extends Vue{
  @Prop({required: true}) patientId!:number
  private ekgStore = getModule(EkgStore, this.$store)
  private currentEkg: IEkg = {ekg_id: -1,ekg_results_problems_list: [] }
  

  public get ekgs() {
    return this.ekgStore.ekgs
  }

  openCreateEkg(){
    // @ts-ignore
    this.$bvModal.show('create-ekg-modal')
  }
  openDeleteEkg(ekg: IEkg){
    this.currentEkg = ekg
    // @ts-ignore
    this.$bvModal.show('delete-ekg-modal')
  }
  openEditEkg(ekg: IEkg){
    this.currentEkg = Object.assign({}, ekg)
    // @ts-ignore
    this.$bvModal.show('edit-ekg-modal')
  }

  // Main actions
  async onCreateEkg(formData: FormData){
    await this.ekgStore.createEkg({patientId: this.patientId, formData})
  }
  async onEditEkg(ekg: IEkg, formData: FormData){
    let ekgId = Number(ekg.ekg_id)

    await this.ekgStore.editEkg({ patientId: this.patientId, ekgId, formData})
  }

  async onDeleteEkg(ekg: IEkg){
    let ekgId = Number(ekg.ekg_id)
    await this.ekgStore.deleteEkg({patientId: this.patientId, ekgId})
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.ekgStore.getEkgs(this.patientId)
  }
}
</script>