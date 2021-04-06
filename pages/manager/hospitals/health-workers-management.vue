<template>
  <div>
    <button @click="openCreateModal" class="mx-4 my-2 btn btn-primary">Create worker</button>
    <div class="data workers">
      <div class="card-data worker" :key="hw.user_is_health_personnel_id" v-for="hw in healthWorkers">
        <header>
          <span class="title">Worker</span>
          <div class="actions">
            <span @click="openDeleteModal(hw)" class="action">
              <i class="bi bi-x-square"></i>
            </span>
          </div>
        </header>
        <main>
          <div class="d-flex flex-column card-data-item">
            <span class="key">Worker name</span>
            <span class="value">{{hw.user}}</span>
          </div>
        </main>
      </div>
    </div>
    <b-modal hide-header hide-footer  body-class="x-modal" id="create-worker-modal">
      <header class="x-modal__header">
        <span class="title">Create worker</span>
      </header>
      <main>
        <ValidationObserver>
          <form id="create-worker-form" @submit.prevent="doCreateWorker">
            <b-row>
              <b-col>
                  <ValidationProvider>
                    <b-form-group label="Name" label-for="name">
                      <b-form-select :options="users" :value="null" name="name" />
                    </b-form-group>
                  </ValidationProvider>
                </b-col>
            </b-row>
          </form>
        </ValidationObserver>
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('create-worker-modal')">Cancel</button>
        <button @click="doCreateWorker" class="btn btn-action">Create</button>
      </footer>
    </b-modal>
    <b-modal hide-header hide-footer  body-class="x-modal" id="delete-worker-modal">
      <header class="x-modal__header">
        <span class="title">Delete worker</span>
      </header>
      <main>
        Are you sure you want to delete: Manager {{currWorker.user_is_health_personnel_id}} ?
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('delete-worker-modal')">Cancel</button>
        <button @click="doDeleteWorker(currWorker.user_is_health_personnel_id)" class="btn btn-action">Delete</button>
      </footer>
    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import MainContentWithMenu from '~/components/MainContentWithMenu.vue';
import ManagerStore from '@/store/manager-store'
import AdminStore from '~/store/admin-store';
import { IHealthWorker } from '~/api/models/manager.model';
import {ValidationProvider, ValidationObserver} from 'vee-validate'

@Component({
  layout: 'dashboard',
  components: {
    mainContentWithMenu: MainContentWithMenu,
    ValidationProvider,
    ValidationObserver
  }
})
export default class HealthWorkersManagement extends Vue{

  private managerStore = getModule(ManagerStore, this.$store)
  private adminStore = getModule(AdminStore, this.$store)
  private currWorker: IHealthWorker = {}
  
  public get healthWorkers(){
    return this.managerStore.healthWorkers
  }
  public get users(){
    const data = this.adminStore.users.map(e => {
      return {text: e.user_name, value: e.user_name}
    })
    //@ts-ignore
    data.unshift({text: 'Please select item', value: null})
    return data
  }
  
  openCreateModal(){
    //@ts-ignore
    this.$bvModal.show('create-worker-modal')
  }
  openDeleteModal(data: IHealthWorker){
    this.currWorker = data
    //@ts-ignore
    this.$bvModal.show('delete-worker-modal')
  }
  async doCreateWorker(){
    const form = document.querySelector('#create-worker-form')
    //@ts-ignore
    const formData = new FormData(form)
    await this.managerStore.createHealthWorker(formData)
  }
  async doDeleteWorker(workerId: number){
    await this.managerStore.deleteHealthWorker(workerId)
  }
  async mounted(){
    await this.managerStore.getHealthWorkers()
    await this.adminStore.getUsers()
  }

}
</script>