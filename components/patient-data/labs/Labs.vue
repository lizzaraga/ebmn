<template>
  <div id="labs">
    {{labs}}
    <div class="patient-data-grid">
      <div class="data-item" :key="lab.lab_id" v-for="lab in labs">
        <header>
          <div>
            <span style="font-size: 0.75rem; font-weight: 500; color: #888">Loinc Code:</span>
            <span style="font-weight: 400; font-size: 0.85rem">{{lab.lab_loinc_code}}</span>
          </div>
          <div class="d-flex align-items-center">
            <i class="bi bi-pencil-square mr-3"></i>
            <i class="bi bi-trash"></i>
          </div>
        </header>
        <main>
          
        </main>
        <footer >
          <div class="d-flex flex-column">
            <span style="font-size: 0.7rem; font-weight: 500; color: #333">Date issued</span>
            <span style="font-size: 0.7rem; font-weight: 400; color: #888" v-html="convertDate(lab.lab_date_issued)"></span>
          </div>
          <div class="d-flex flex-column">
            <span style="font-size: 0.7rem; font-weight: 500; color: #333">Date last modified</span>
            <span style="font-size: 0.7rem; font-weight: 400; color: #888" v-html="convertDate(lab.lab_date_last_modified)"></span>
          </div>
        </footer>
      </div>
    </div>
    <div class="fab">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, neque!</div>
  </div>
</template>
<script lang="ts">
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import LabStore from '~/store/patient-data/lab-store';
import moment from 'moment'
@Component
export default class Labs extends Vue{
  private labStore = getModule(LabStore, this.$store)

  
  public get labs() {
    return this.labStore.labs
  }

  convertDate(date: string){
    return moment(date).format('MMM Do YYYY, [<br/>] h:mm:ss a')
  }

  async mounted(){
    await this.labStore.getLabs(27)
  }
}
</script>
<style lang="scss">
.fab{
  position: absolute;
  right: 20px;
  bottom: 20px;
  
  background-color: #fff;
}
.patient-data-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  &>.data-item{
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    width: 430px;

    &>header, &>footer{
      padding: 0.8rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &>header{
      border-bottom: 1px solid #eee;
    }
    &>footer{
      border-top: 1px solid #eee;
    }
    &>main{
      padding: 0.8rem 1rem;
    }
  }
}
  
</style>