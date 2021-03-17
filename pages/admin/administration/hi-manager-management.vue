<template>
  <div>
    <div class="data managers">
      <div class="card-data manager" :key="mg.user_is_manager_id" v-for="mg in managers">
        <header>
          <span class="title">{{mg.hospital_name}}</span>
          <div class="actions">
            <span v-b-modal="'delete-manager-modal'" class="action">
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
    <b-modal hide-header hide-footer  body-class="x-modal" id="delete-manager-modal">
      <header class="x-modal__header">
        <span class="title">Delete manager</span>
      </header>
      <main>
        Do you really want to delete this manager ?
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('delete-manager-modal')">Cancel</button>
        <button @click="doDeleteManager" class="btn btn-action">Delete</button>
      </footer>

    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import AdminStore from '@/store/admin-store'

@Component({
  layout: 'dashboard'
})
export default class HIManagerManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)

  
  public get managers(){
    return this.adminStore.managers
  }

  async doCreateManager(){

  }
  async doDeleteManager(){

  }
  
  
  mounted(){
    this.adminStore.getManagers()
  }
}
</script>