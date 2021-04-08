<template>
  <div id="allergies" class="data-grid">
    
    <div class="data-grid-main">
     
      <div class="patient-data-grid">
        <div class="data-item" :key="subs.substance_id" v-for="subs in abusiveSubstances">
          <header>
            <div class="title-field">
              <span class="title-key" >Substance:</span>
              <span class="title-value">{{subs.substance}}</span>
            </div>
            <div class="actions">
              <i class="bi bi-pencil-square action action-edit" @click="openEditSubstance(subs)"></i>
              <i class="bi bi-trash action action-delete" @click="openDeleteSubstance(subs)"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Status</span>
              <span class="data-value">{{subs.status}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Substance details</span>
              <span class="data-value">{{subs.substance_details}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Comments</span>
              <span class="data-value">{{subs.comments}}</span>
            </div>
          </main>
        </div>
      </div>
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreateSubstance">Create Substance</button>
    </footer>
    <delete-as-modal @delete="onDeleteAs" :as="currentAs"/>
    <edit-as-modal @edit='onEditAs' :as="currentAs"/>
    <create-as-modal @create="onCreateAs"/>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IAbusiveSubstance } from '~/api/models/patient-data.model';
import ASStore from '~/store/patient-data/as-store';
import CreateAsModal from './CreateAsModal.vue';
import DeleteAsModal from './DeleteAsModal.vue';
import EditAsModal from './EditAsModal.vue';

@Component({
  components:{
    deleteAsModal: DeleteAsModal,
    editAsModal: EditAsModal,
    createAsModal: CreateAsModal
  }
})
export default class AbusiveSubstances extends Vue{
  @Prop({required: true}) patientId!:number
  private asStore = getModule(ASStore, this.$store)
  private currentAs: IAbusiveSubstance = {substance_id: -1, }
  
  
  public get abusiveSubstances() {
    return this.asStore.abusiveSubstances
  }
  openCreateSubstance(){
    // @ts-ignore
    this.$bvModal.show('create-as-modal')
  }
  openDeleteSubstance(subs: IAbusiveSubstance){
    this.currentAs = subs
    // @ts-ignore
    this.$bvModal.show('delete-as-modal')
  }
  openEditSubstance(subs: IAbusiveSubstance){
    this.currentAs = Object.assign({}, subs)
    // @ts-ignore
    this.$bvModal.show('edit-as-modal')
  }

  // Main actions
  async onCreateAs(formData: FormData){
    await this.asStore.createAs({patientId: this.patientId, formData})
  }
  async onEditAs(as: IAbusiveSubstance, formData: FormData){
    let asId = Number(as.substance_id)
    console.log('asId before', asId, as)
    await this.asStore.editAs({ patientId: this.patientId, asId, formData})
  }

  async onDeleteAs(as: IAbusiveSubstance){
    let asId = Number(as.substance_id)
    await this.asStore.deleteAs({patientId: this.patientId, asId})
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.asStore.getAS(this.patientId)
  }
}
</script>