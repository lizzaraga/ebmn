<template>
  <div>
    <button @click="onOpenCreateModal" class="mx-4 my-2 btn btn-primary">Create health institute</button>
    <div class="data hospitals">
      <div class="card-data hospital" :key="hi.hospital_id" v-for="hi in hospitals">
        <header>
          <span class="title">{{hi.hospital_name}}</span>
          <div class="actions">
            <span @click="onOpenEditModal(hi)" class="action">
              <i class="bi bi-pen"></i>
            </span>
            <span @click="onOpenDeleteModal(hi)" class="action">
              <i class="bi bi-x-square"></i>
            </span>
          </div>
        </header>
        <main>
          <div class="d-flex flex-column card-data-item">
            <span class="key">Location</span>
            <span class="value">{{hi.hospital_location}}</span>
          </div>
          <div class="d-flex flex-column card-data-item mt-3">
            <span class="key">Description</span>
            <span class="value">{{hi.hospital_description}}</span>
          </div>
        </main>
      </div>
    </div>
    <b-modal hide-header hide-footer  body-class="x-modal" id="edit-hospital-modal">
      <header class="x-modal__header">
        <span class="title">{{isEditing ? 'Edit' : 'Create'}} hospital</span>
      </header>
      <main>
        <form @submit.prevent id="edit-hi-form">
          <b-form-group label="Name"> 
            <b-input name="name" v-model="editHospital.hospital_name" placeholder="Hospital name"/>
          </b-form-group>
          <b-form-group label="Location"> 
            <b-input name="location" v-model="editHospital.hospital_location" placeholder="Hospital location"/>
          </b-form-group>
          <b-form-group label="Description"> 
            <b-form-textarea
              placeholder="Hospital description"
              rows="3"
              name="description"
              no-resize
              v-model="editHospital.hospital_description"
            ></b-form-textarea>
          </b-form-group>
          <footer class="x-modal__footer">
            <button @click="doEditHospital"
             class="btn btn-action main-action">{{isEditing ? 'Edit' : 'Create'}}</button>
            <button class="btn btn-action" @click="$bvModal.hide('edit-hospital-modal')">Cancel</button>
            
          </footer>
        </form>
      </main>
      

    </b-modal>
    <b-modal hide-header hide-footer  body-class="x-modal" id="delete-hospital-modal">
      <header class="x-modal__header">
        <span class="title">Delete hospital</span>
      </header>
      <main>
        Are you sure you want to delete: Health institute {{editHospital.hospital_id}} ?
        <footer class="x-modal__footer">
          <button @click="doDeleteHospital(editHospital.hospital_id)" class="btn btn-action main-action">Delete</button>
          <button class="btn btn-action" @click="$bvModal.hide('delete-hospital-modal')">Cancel</button>
          
        </footer>

      </main>
      
    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import AdminStore from '@/store/admin-store'
import { IHospital } from '~/api/models/hospital.model';
import HospitalStore from '~/store/hospital-store';

@Component({
  layout: 'dashboard'
})
export default class HIManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)
  private hospitalStore = getModule(HospitalStore, this.$store)
  isEditing = false
  editHospital: IHospital = {
    hospital_name: '', hospital_location: '', hospital_description: ''
  }

  
  public get hospitals(){
    return this.hospitalStore.hospitals
  }

  onOpenCreateModal(){
    this.isEditing = false
    this.editHospital = {
      hospital_name: '', hospital_location: '', hospital_description: ''
    }
    //@ts-ignore
    this.$bvModal.show('edit-hospital-modal')
  }
  onOpenEditModal(hospital: IHospital){
    this.isEditing = true
    this.editHospital = hospital
    //@ts-ignore
    this.$bvModal.show('edit-hospital-modal')
  }
  onOpenDeleteModal(hospital: IHospital){
    this.isEditing = false
    this.editHospital = hospital
    //@ts-ignore
    this.$bvModal.show('delete-hospital-modal')
  }

  async doEditHospital(){
    const form = document.querySelector('#edit-hi-form')
    //@ts-ignore
    const formData = new FormData(form)
    //@ts-ignore
    this.$bvModal.hide('edit-hospital-modal')
    this.isEditing 
    ? await this.hospitalStore.editHospital({hospitalId: this.editHospital.hospital_id!!, data: formData })
    : await this.hospitalStore.createHospital(formData)
    
  }
  
  async doDeleteHospital(hospitalId: number){
    //@ts-ignore
    this.$bvModal.hide('delete-hospital-modal')
    await this.hospitalStore.deleteHospital(hospitalId)
    
  }
  
  mounted(){
    this.hospitalStore.getHospitals()
  }
}
</script>
<style scoped>
.hospital{

}
</style>