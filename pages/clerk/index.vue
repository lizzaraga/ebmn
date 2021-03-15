<template>
  <div>
    <b-modal centered no-close-on-backdrop hide-header hide-footer  body-class="x-modal" id="select-clerk-hospital">
      <header class="x-modal__header">
        <span class="title">Select hospital</span>
      </header>
      <main>
        <form @submit.prevent="doSelectHospital">
          <b-form-group label="Hospital"> 
            <b-form-select  v-model="selected" :options="options"></b-form-select>
          </b-form-group>
          
        </form>
      </main>
      <footer class="x-modal__footer">
        <button @click="doSelectHospital" class="btn btn-action">Select</button>
      </footer>

    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import hospitalApi from '~/api/hospital.api';
import { IHospital } from '~/api/models/hospital.model';
import AuthStore from '~/store/auth-store';
import ClerkStore from '~/store/clerk-store';

@Component({
  layout: 'dashboard'
})
export default class Clerk extends Vue{

  hospitals: IHospital[] = []
  selected: string = ""
  private authStore = getModule(AuthStore, this.$store)
  private clerkStore = getModule(ClerkStore, this.$store)
  
  
  public get options() {
    return this.hospitals.map(h => {
      return {
        value: h.hospital_name,
        text: h.hospital_name
      }
    })
    
  }
  
  doSelectHospital(){
    let hospital = this.hospitals.find(h => h.hospital_name == this.selected)
    this.clerkStore.updateClerkHospital(hospital!!)
    this.$router.push({name: 'clerk-hospitals-ht-physical-nature'})
  }
  async mounted(){
    // Get hospital for permit Clerk to select one
    this.hospitals = await hospitalApi.getHospitals(this.authStore.user.token!!)
    // @ts-ignore
    this.$bvModal.show('select-clerk-hospital')
    if(this.hospitals.length > 0)
      this.selected = this.hospitals[0].hospital_name!!
    
  }
}
</script>