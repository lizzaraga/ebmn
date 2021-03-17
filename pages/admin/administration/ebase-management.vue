<template>
  <div>
    <div class="data clerks">
      <div class="card-data clerk" :key="clerk.user_is_clerk_id" v-for="clerk in clerks">
        <header>
          <span class="title">Clerk</span>
          <div class="actions">
            <span v-b-modal="'delete-clerk-modal'" class="action">
              <i class="bi bi-x-square"></i>
            </span>
          </div>
        </header>
        <main>
          <div class="d-flex flex-column card-data-item">
            <span class="key">Clerk name</span>
            <span class="value">{{clerk.user}}</span>
          </div>
        </main>
      </div>
    </div>
    <b-modal hide-header hide-footer  body-class="x-modal" id="delete-clerk-modal">
      <header class="x-modal__header">
        <span class="title">Delete manager</span>
      </header>
      <main>
        Do you really want to delete this clerk ?
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('delete-clerk-modal')">Cancel</button>
        <button @click="doDeleteClerk" class="btn btn-action">Delete</button>
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
export default class EBaseManagement extends Vue{

  private adminStore = getModule(AdminStore, this.$store)

  
  public get clerks(){
    return this.adminStore.clerks
  }

  async doDeleteClerk(){

  }
  
  mounted(){
    this.adminStore.getClerks()
  }
}
</script>