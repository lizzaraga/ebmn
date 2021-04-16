<template>
  <div id="allergies" class="data-grid">
    
    <div class="data-grid-main">
      <div class="patient-data-grid">
        <div class="data-item" :key="allergy.allergy_id" v-for="allergy in allergies">
          <header>
            <div class="title-field">
              <span class="title-key" >Substance:</span>
              <span class="title-value">{{allergy.substance}}</span>
            </div>
            <div class="actions">
              <i class="bi bi-pencil-square action action-edit" @click="openEditAllergy(allergy)"></i>
              <i class="bi bi-trash action action-delete" @click="openDeleteAllergy(allergy)"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Category</span>
              <span class="data-value">{{allergy.category}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Reaction type</span>
              <span class="data-value">{{allergy.reaction_type}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Severity</span>
              <span class="data-value">{{allergy.severity}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Status</span>
              <span class="data-value">{{allergy.status}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Comments</span>
              <span class="data-value">{{allergy.comments}}</span>
            </div>
          </main>
          <footer >
            <div class="date-field">
              <span class="date-key" >Date first recorded</span>
              <span class="date-value" v-html="convertDate(allergy.date_first_recorded)"></span>
            </div>
            
          </footer>
        </div>
      </div>
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreateAllergy">Create Allergy</button>
    </footer>
    <delete-allergy-modal @delete="onDeleteAllergy" :allergy="currentAllergy"/>
    <edit-allergy-modal @edit="onEditAllergy" :allergy="currentAllergy"/>
    <create-allergy-modal @create="onCreateAllergy" />
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IAllergy } from '~/api/models/patient-data.model';
import AllergyStore from '~/store/patient-data/allergy-store';
import CreateAllergyModal from './CreateAllergyModal.vue';
import DeleteAllergyModal from './DeleteAllergyModal.vue';
import EditAllergyModal from './EditAllergyModal.vue';

@Component({
  components:{
    deleteAllergyModal: DeleteAllergyModal,
    editAllergyModal: EditAllergyModal,
    createAllergyModal: CreateAllergyModal 
  }
})
export default class Allergies extends Vue{
  @Prop({required: true}) patientId!:number
  private allergyStore = getModule(AllergyStore, this.$store)
  private currentAllergy: IAllergy = {allergy_id: -1, }
  
  public get allergies() {
    return this.allergyStore.allergies
  }

  openCreateAllergy(){
    // @ts-ignore
    this.$bvModal.show('create-allergy-modal')
  }
  openDeleteAllergy(al: IAllergy){
    this.currentAllergy = al
    // @ts-ignore
    this.$bvModal.show('delete-allergy-modal')
  }
  openEditAllergy(al: IAllergy){
    this.currentAllergy = Object.assign({}, al)
    // @ts-ignore
    this.$bvModal.show('edit-allergy-modal')
  }
  // Main actions
  async onCreateAllergy(formData: FormData){
    await this.allergyStore.createAllergy({patientId: this.patientId, formData})
  }
  async onEditAllergy(allergy: IAllergy, formData: FormData){
    let allergyId = Number(allergy.allergy_id)

    await this.allergyStore.editAllergy({ patientId: this.patientId, allergyId, formData})
  }

  async onDeleteAllergy(allergy: IAllergy){
    let allergyId = Number(allergy.allergy_id)
    await this.allergyStore.deleteAllergy({patientId: this.patientId, allergyId})
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }
  async mounted(){
    await this.allergyStore.getAllergies(this.patientId)
  }
}
</script>