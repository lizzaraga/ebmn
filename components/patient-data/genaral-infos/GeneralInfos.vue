<template>
  <div id="general-infos" >
    <div >
      <div   class="gi-data-group">
        <header>Text fields</header>
        <main>
          <div @click="selectedField = {name, value: gi[name]}" v-b-modal="'gi-text-modal'" :key="name" v-for="name in textFields" class="gi-data-item">
            <span class="name">{{name | formatName}}</span>
            <span class="value">{{ gi[name] == null || gi[name].trim() == ""  ? 'N/A': gi[name].trim()}}</span>
          </div>
        </main>
      </div>
      <div class="gi-data-group">
        <header>Mail fields</header>
        <main>
          <div @click="selectedField = {name, value: gi[name]}" v-b-modal="'gi-email-modal'" :key="name" v-for="name in mailFields" class="gi-data-item">
            <span class="name">{{name | formatName}}</span>
            <span class="value">{{ gi[name] == null || gi[name].trim() == ""  ? 'N/A': gi[name].trim()}}</span>
          </div>
        </main>
      </div>
      <div class="gi-data-group">
        <header>Tel fields</header>
        <main>
          <div @click="selectedField = {name, value: gi[name]}" v-b-modal="'gi-tel-modal'" :key="name" v-for="name in telFields" class="gi-data-item">
            <span class="name">{{name | formatName}}</span>
            <span class="value">{{ gi[name] == null || gi[name].trim() == ""  ? 'N/A': gi[name].trim()}}</span>
          </div>
        </main>
      </div>
      <div class="gi-data-group">
        <header>Nums fields</header>
        <main>
          <div @click="selectedField = {name, value: gi[name]}" v-b-modal="'gi-number-modal'" :key="name" v-for="name in numFields" class="gi-data-item">
            <span class="name">{{name | formatName}}</span>
            <span class="value">{{ gi[name] == null || gi[name].trim() == ""  ? 'N/A': gi[name].trim()}}</span>
          </div>
        </main>
      </div>
      <div class="gi-data-group">
        <header>Date fields</header>
        <main>
          <div @click="selectedField = {name, value: gi[name]}" v-b-modal="'gi-date-modal'" :key="name" v-for="name in dateFields" class="gi-data-item">
            <span class="name">{{name | formatName}}</span>
            <span class="value">{{ gi[name] == null || gi[name].trim() == ""  ? 'N/A': gi[name].trim()}}</span>
          </div>
        </main>
      </div>
      <div class="gi-data-group">
        <header>Selection fields</header>
        <main>
          <div @click="prepareSelectModal({name: item.name, value: gi[item.name]})" 
            :key="item.name" v-for="item in selectFields"  v-b-modal="'gi-select-modal'" class="gi-data-item">
            <span class="name">{{item.name | formatName}}</span>
            <span class="value">{{ gi[item.name] == null || gi[item.name].trim() == ""  ? 'N/A': gi[item.name].trim()}}</span>
          </div>
        </main>
      </div>
      <div class="gi-data-group">
        <header>File fields</header>
        <main>
          <div @click="selectedField = {name, value: gi[name]}" v-b-modal="'gi-file-modal'" :key="name" v-for="name in fileFields" class="gi-data-item">
            <span class="name">{{name | formatName}}</span>
            <span  v-if='gi[name] == null || gi[name].trim() == ""' class="value">
              N/A
            </span>
            <a v-else @click.self.stop target="_blank" :href="gi[name].trim()" class="value">
              {{getFileName(gi[name].trim())}}
            </a>
          </div>
        </main>
      </div>
    </div>
    <gi-text-modal @update='onUpdateField' :field="selectedField"/>
    <gi-email-modal @update='onUpdateField' :field="selectedField"/>
    <gi-tel-modal @update='onUpdateField' :field="selectedField"/>
    <gi-num-modal @update='onUpdateField' :field="selectedField"/>
    <gi-date-modal @update='onUpdateField' :field="selectedField"/>
    <gi-file-modal @update="onUpdateFile" :field="selectedField"/>
    <gi-select-modal @update='onUpdateField' :field="selectedField"/>
    
  </div>
</template>
<script lang="ts">
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import { IGeneralInfo } from '~/api/models/patient-data.model';
import GIStore from '~/store/patient-data/gi-store';
import GIDateModal from './DateModal.vue';
import GIEmailModal from './EmailModal.vue';
import GIFileModal from './FileModal.vue';
import GINumModal from './NumField.vue';
import GISelectModal from './SelectModal.vue';
import GITelModal from './TelModal.vue';
import GITextModal from './TextModal.vue';
@Component({
  components:{
    giTextModal: GITextModal,
    giEmailModal: GIEmailModal,
    giTelModal: GITelModal,
    giDateModal: GIDateModal,
    giFileModal: GIFileModal,
    giSelectModal: GISelectModal,
    giNumModal: GINumModal,
  },
  filters: {
    formatName(value: string){
      const res = value.split('_').join(" ")
      return res[0].toUpperCase() + res.substring(1, res.length)
    }
  }
})
export default class GeneralInfos extends Vue{
  private giStore = getModule(GIStore, this.$store)
  textFields = ['username', 'title', 'first_name', 'middle_name',
  'last_name', 'sufix', 'place_of_birth', 'ethnicity', 'language', 'occupation', 'religion',
  'region_of_residence',  'employer_name', 'employer_address',
  ]
  mailFields = ['email', 'alternate_email']
  telFields = ['phone_number', 'office_phone', 'employer_phone']
  numFields = ['number_of_children','gps_longitude', 'gps_latitude']
  dateFields = ['date_of_birth']
  fileFields = ['signature_file', 'house_map', 'photo']
  selectFields = [
    {
      name: 'sex',
      values: ['Female', 'Male']
    },
    {
      name: 'race',
      values: ['Black', 'White']
    },
    {
      name: 'marital_status',
      values: ['Married', 'Single']
    },
    {
      name: 'interpreter_needed',
      values: ['Yes', 'No']
    },
    {
      name: 'blood_type',
      values: ['A-', 'A+', 'AB+', 'AB-', 'B-', 'B+', 'O-', 'O+']
    },
    {
      name: 'residence_site',
      values: ['Family', 'Group Home', 'Homelass', 'Long Term Hospitaization',
      'Own', 'Prison', 'Refugee Camp']
    },
    {
      name: 'preferred_communication_channel',
      values: ['Email', 'Phone', 'Sms']
    }
  ]

  selectedField = {}
  patientId = 27

  get gi(): IGeneralInfo{
    return this.giStore.gi
  }

  getFileName(path: string){
    const parts = path.split('/')
    return parts.pop()
  }
  
  prepareSelectModal(field:  {name: string, value: string}){
    const values = this.selectFields.find(f => f.name == field.name)?.values
    const newField = {...field, values}
    console.log('new field: ', newField)
    this.selectedField = newField
  }

  async onUpdateField(field: any){
    await this.giStore.updateGIField({ patientId: this.patientId, request: field})
  }
  async onUpdateFile(field: any){
    console.log(field)
    await this.giStore.updateGIBinaryField({ patientId: this.patientId, request: field})
  }
  async mounted(){
    await this.giStore.getGeneralInfo(27)
  }
}
</script>
<style lang="scss" scoped>
#general-infos{
  
}
.gi-data-group{
  header{
    padding: 0.8rem;
    color: #666;
    font-size: 0.9rem;
    font-weight: 600;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: #eee;
    }
  }
  main{
    padding: 0.8rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 0.8rem;

    .gi-data-item{
      cursor: pointer;
      display: grid;
      grid-template-rows: auto 1fr;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba($color: #000000, $alpha: 0.06);
      transition: all 0.4s ease;
      &>.name, &>.value{
        padding: 0.8rem;
      }
      &>.name{
        padding-bottom: 0;
        font-size: 0.85rem;
        font-weight: 300;
      }
      &:hover{
        box-shadow: 0 4px 38px rgba($color: #000000, $alpha: 0.08);
      }
    }
  }
}
</style>