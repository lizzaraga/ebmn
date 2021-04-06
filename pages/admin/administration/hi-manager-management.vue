<template>
  <div>
    <button @click="openCreateModal" class="mx-4 my-2 btn btn-primary">Create manager</button>
    <div class="data managers">
      <div class="card-data manager" :key="mg.user_is_manager_id" v-for="mg in managers">
        <header>
          <span class="title">{{mg.hospital_name}}</span>
          <div class="actions">
            <span @click="openDeleteModal(mg)" class="action">
              <i class="bi bi-x-square"></i>
            </span>
          </div>
        </header>
        <main>
          <div class="d-flex flex-column card-data-item">
            <span class="key">Manager name</span>
            <span class="value">{{mg.user}}</span>
          </div>
        </main>
      </div>
    </div>
    <b-modal hide-header hide-footer  body-class="x-modal" id="create-manager-modal">
      <header class="x-modal__header">
        <span class="title">Create manager</span>
      </header>
      <main>
        <ValidationObserver>
          <form @submit.prevent id="create-manager-form">
            <b-row>
              <b-col>
                <ValidationProvider>
                  <b-form-group label="Name" label-for="name">
                    <b-form-select :options="users" :value="null" name="name" />
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col>
                <ValidationProvider>
                  <b-form-group label="Hospital" label-for="health_institute">
                    <b-form-select :options="hospitals" :value="null" name="health_institute" />
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <footer class="x-modal__footer">
              <button @click="doCreateManager" class="btn btn-action main-action">Create</button>
              <button class="btn btn-action" @click="$bvModal.hide('create-manager-modal')">Cancel</button>
              
            </footer>

          </form>
        </ValidationObserver>
      </main>
      
    </b-modal>
    <b-modal hide-header hide-footer  body-class="x-modal" id="delete-manager-modal">
      <header class="x-modal__header">
        <span class="title">Delete manager</span>
      </header>
      <main>
        Are you sure you want to delete: Manager {{currManager.user_is_manager_id}} ?
        <footer class="x-modal__footer">
          <button @click="doDeleteManager(currManager.user_is_manager_id)" 
          class="btn btn-action main-action">Delete</button>
          <button class="btn btn-action" @click="$bvModal.hide('delete-manager-modal')">Cancel</button>
          
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
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import { IAdminManager } from '~/api/models/manager.model';
import HospitalStore from '~/store/hospital-store';

@Component({
  layout: 'dashboard',
  components:{
    ValidationProvider,
    ValidationObserver
  }
})
export default class HIManagerManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)
  private hospitalStore = getModule(HospitalStore, this.$store)
  currManager: IAdminManager = {

  }
  
  public get managers(){
    return this.adminStore.managers
  }
  public get users(){
    const data = this.adminStore.users.map(e => {
      return {text: e.user_name, value: e.user_name}
    })
    //@ts-ignore
    data.unshift({text: 'Please select item', value: null})
    return data
  }
  public get hospitals(){
    const data = this.hospitalStore.hospitals.map(e => {
      return {text: e.hospital_name, value: e.hospital_name}
    })
    //@ts-ignore
    data.unshift({text: 'Please select item', value: null})
    return data
  }

  openDeleteModal(data: IAdminManager){
    this.currManager = data
    //@ts-ignore
    this.$bvModal.show('delete-manager-modal')
  }
  openCreateModal(){
    //@ts-ignore
    this.$bvModal.show('create-manager-modal')
  }

  async doCreateManager(){
    const form = document.querySelector('#create-manager-form')
    //@ts-ignore
    const formData = new FormData(form)
    //@ts-ignore
    this.$bvModal.hide('create-manager-modal')
    await this.adminStore.createManager(formData)
    
  }
  async doDeleteManager(managerId: number){
    //@ts-ignore
    this.$bvModal.hide('delete-manager-modal')
    await this.adminStore.deleteManager(managerId)
    
  }
  
  
  mounted(){
    this.adminStore.getManagers()
    this.adminStore.getUsers()
    this.hospitalStore.getHospitals()
  }
}
</script>