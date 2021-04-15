<template>
  <div class="data-grid">
    <div class="data-grid-main">
      
      <div class="patient-data-grid">
        <div class="data-item" :key="clerk.user_is_clerk_id" v-for="clerk in clerks">
          <header>
            <div class="title-field">
              <span class="title-key">Clerk Id:</span>
              <span class="title-value">{{clerk.user_is_clerk_id}}</span>
            </div>
            <div class="actions">
              <i @click="openDeleteModal(clerk)" class="bi bi-x-square action"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Clerk name</span>
              <span class="data-value">{{clerk.user}}</span>
            </div>
          </main>
        </div>
      </div>
      <b-modal hide-header hide-footer  body-class="x-modal" id="create-clerk-modal">
        <header class="x-modal__header">
          <span class="title">Create clerk</span>
        </header>
        <main>
          <ValidationObserver>
            <form @submit.prevent id="create-clerk-form">
              <b-row>
                <b-col>
                  <ValidationProvider>
                    <b-form-group label="Name" label-for="name">
                      <b-form-select :options="users" :value="null" name="name" />
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <footer class="x-modal__footer">
                <button @click="doCreateClerk" class="btn btn-action main-action">Create</button>
                <button class="btn btn-action" @click="$bvModal.hide('create-clerk-modal')">Cancel</button>
                
              </footer>

            </form>
          </ValidationObserver>
        </main>
        
      </b-modal>
      <b-modal hide-header hide-footer  body-class="x-modal" id="delete-clerk-modal">
        <header class="x-modal__header">
          <span class="title">Delete clerk</span>
        </header>
        <main>
          Are you sure you want to delete: Clerk {{currClerk.user_is_clerk_id}} ?
          <footer class="x-modal__footer">
            <button @click="doDeleteClerk(currClerk.user_is_clerk_id)" 
            class="btn btn-action main-action">Delete</button>
            <button class="btn btn-action" @click="$bvModal.hide('delete-clerk-modal')">Cancel</button>
            
          </footer>
        </main>
        

      </b-modal>
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openCreateModal">Create Clerk</button>
    </footer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import AdminStore from '@/store/admin-store'
import { IAdminClerk } from '~/api/models/clerk.model';
import {ValidationObserver, ValidationProvider} from 'vee-validate'

@Component({
  layout: 'dashboard',
  components:{
    ValidationProvider,
    ValidationObserver
  }
})
export default class EBaseManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)
  currClerk: IAdminClerk = {}
  
  public get clerks(){
    return this.adminStore.clerks
  }
  public get users(){
    const data = this.adminStore.users.map(e => {
      return {text: e.user_name, value: e.user_name}
    })
    //@ts-ignore
    data.unshift({text: 'Please select item', value: null})
    return data
  }

  openDeleteModal(data: IAdminClerk){
    this.currClerk = data
    //@ts-ignore
    this.$bvModal.show('delete-clerk-modal')
  }
  openCreateModal(){
    //@ts-ignore
    this.$bvModal.show('create-clerk-modal')
  }

  async doCreateClerk(){
    const form = document.querySelector('#create-clerk-form')
    //@ts-ignore
    const formData = new FormData(form)
    //@ts-ignore
    this.$bvModal.hide('create-clerk-modal')
    await this.adminStore.createClerk(formData)
    
  }
  async doDeleteClerk(clerkId: number){
    //@ts-ignore
    this.$bvModal.hide('delete-clerk-modal')
    await this.adminStore.deleteClerk(clerkId)
    
  }
  
  mounted(){
    this.adminStore.getClerks()
    this.adminStore.getUsers()
  }
}
</script>