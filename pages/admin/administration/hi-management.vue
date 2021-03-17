<template>
  <div>
    <div class="data hospitals">
      <div class="card-data hospital" :key="hi.hospital_id" v-for="hi in hospitals">
        <header>
          <span class="title">{{hi.hospital_name}}</span>
          <div class="actions">
            <span v-b-modal="'edit-hospital-modal'" class="action">
              <i class="bi bi-pen"></i>
            </span>
            <span v-b-modal="'delete-hospital-modal'" class="action">
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
        <span class="title">Edit hospital</span>
      </header>
      <main>
        <form @submit.prevent="doEditHospital">
          <b-form-group label="Name"> 
            <b-input v-model="editHospital.name" placeholder="Hospital name"/>
          </b-form-group>
          <b-form-group label="Location"> 
            <b-input v-model="editHospital.location" placeholder="Hospital location"/>
          </b-form-group>
          <b-form-group label="Description"> 
            <b-form-textarea
              placeholder="Hospital description"
              rows="3"
              no-resize
            ></b-form-textarea>
          </b-form-group>
        </form>
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('edit-hospital-modal')">Cancel</button>
        <button @click="doEditHospital" class="btn btn-action">Edit</button>
      </footer>

    </b-modal>
    <b-modal hide-header hide-footer  body-class="x-modal" id="delete-hospital-modal">
      <header class="x-modal__header">
        <span class="title">Delete hospital</span>
      </header>
      <main>
        Do you really want to delete this hospital ?
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('delete-hospital-modal')">Cancel</button>
        <button @click="doDeleteHospital" class="btn btn-action">Delete</button>
      </footer>

    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import AdminStore from '@/store/admin-store'
import { IHospital } from '~/api/models/hospital.model';

@Component({
  layout: 'dashboard'
})
export default class HIManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)
  isEditing = false
  editHospital = {
    name: '', location: '', description: ''
  }

  
  public get hospitals(){
    return this.adminStore.hospitals
  }

  doEditHospital(){

  }
  doDeleteHospital(){
    
  }
  
  mounted(){
    this.adminStore.getHospitals()
  }
}
</script>
<style scoped>
.hospital{

}
</style>