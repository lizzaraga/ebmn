<template>
  <div class="position-relative">
    <header class="data-main-header">
      <span class="title">Emergencies</span>
      <button v-b-modal="'create-emergency-modal'" class="btn header-action-btn">
        <span class="bi bi-plus-square mr-1"></span>
        <span>New</span>
      </button>
    </header>
    <div class="emergencies">
      <div class="card-data" :key="eg.emergency_id" v-for="eg in emergencies">
        <header>
          <span class="title">{{formatDate}}</span>
        </header>
        <main>
          <div class="d-flex flex-column card-data-item">
            <span class="key">Specific problem</span>
            <span class="value">{{eg.specific_problem}}</span>
          </div>
          <div class="d-flex flex-column card-data-item mt-3">
            <span class="key">Statut</span>
            <span class="value">{{eg.emergency_status}}</span>
          </div>
        </main>
      </div>
    </div>
    <b-modal hide-header hide-footer  body-class="x-modal" id="create-emergency-modal">
      <header class="x-modal__header">
        <span class="title">New emergency</span>
      </header>
      <main>
        <form @submit.prevent="doCreateEmergency">
          <b-form-group label="Problem" description="Specify properly your problem"> 
            <b-input v-model="createEgModel.specific_problem" placeholder="Your problem"/>
          </b-form-group>
          
        </form>
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('create-emergency-modal')">Cancel</button>
        <button @click="doCreateEmergency" class="btn btn-action">Create</button>
      </footer>

    </b-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import PatientStore from '@/store/patient-store'
import { ICreateEmergency, IEmergency } from '~/api/models/patient.model';
import moment from 'moment'


@Component({
  layout: 'dashboard'
})
export default class Emergencies extends Vue{
  
  private patientStore = getModule(PatientStore, this.$store)

  createEgModel: ICreateEmergency = {specific_problem: ''}
  
  public get emergencies(): IEmergency[] {
     return this.patientStore.emergencies!!
  }

  
  public get formatDate() : string {
    return moment().format('LL')
  }
  
  async doCreateEmergency(){
    await this.patientStore.createEmergency(JSON.parse(JSON.stringify(this.createEgModel)))
    // @ts-ignore
    this.$bvModal.hide('create-emergency-modal')
    this.createEgModel.specific_problem = ""

  }
  
  mounted(){
    this.patientStore.getEmergencies()
  }
}
</script>
<style lang="scss">
.data-main-header{
  position: absolute;
  height: 50px;
  width: 100%;
  background-color: #f8f9fa;
  border-bottom: 1px solid rgb(243, 244, 255);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  &>.title{
    font-weight: 700;
  }
  .header-action-btn{
    font-size: 0.8rem;
    border: 1px solid #555;
    color: #555;
    &:hover{
      color: cornflowerblue;
      border-color: cornflowerblue;
    }
  }
}
.emergencies{
  padding: 60px 1rem;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  column-gap: 0.8rem;
  row-gap: 0.8rem;
}
.card-data{
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  

  &>header{
    padding: 0.6rem;
    border-bottom: 1px solid #eee;

    &>.title{
      font-weight: 300;
    }
  }
  &>main{
    padding: 0.6rem;

    .card-data-item{
      display: flex;
      flex-direction: column;
      &>.key{
        font-size: 0.9rem;
        color: #555;
      }
      &>.value{
        font-size: 0.8rem;
        font-weight: 600;
      }
    }
  }
}



</style>