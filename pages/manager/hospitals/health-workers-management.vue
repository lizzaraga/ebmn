<template>
  <div>
    <!-- {{healthWorkers}} -->
    <div class="data workers">
      <div class="card-data worker" :key="hw.user_is_health_personnel_id" v-for="hw in healthWorkers">
        <header>
          <span class="title">Worker</span>
          <div class="actions">
            <span v-b-modal="'delete-worker-modal'" class="action">
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
        <form @submit.prevent="doCreateWorker">
          <b-form-group class="col-4" label="Worker name"> 
            <b-form-select></b-form-select>
          </b-form-group>
        </form>

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
        Do you really want to delete this worker ?
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('delete-worker-modal')">Cancel</button>
        <button @click="doDeleteWorker" class="btn btn-action">Delete</button>
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

@Component({
  layout: 'dashboard',
  components: {
    mainContentWithMenu: MainContentWithMenu
  }
})
export default class HealthWorkersManagement extends Vue{

  private managerStore = getModule(ManagerStore, this.$store)

  
  public get healthWorkers(){
    return this.managerStore.healthWorkers
  }
  
  async doCreateWorker(){

  }
  async doDeleteWorker(){

  }
  async mounted(){
    await this.managerStore.getHealthWorkers()
  }

}
</script>