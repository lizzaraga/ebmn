<template>
  <div id="vital-signs">
    <!-- <div>
      {{vitalSigns}}
      <button class="btn" @click="openEditVs">Edit vs</button> 
    </div> -->
    <div class="px-4 py-3 d-flex align-items-center justify-content-between">
      <h3 style="font-weight: 200">Vital Signs</h3>
      <button @click="openEditVs" class="btn btn-primary" style="font-size: 0.8rem; padding: 0.6rem 1.2rem; font-weight: 500">Update</button>
    </div>
    <div class="px-4 py-3">
      <div class="vs-container" >
        <div class="titles" :class="{'with-shadow': addShadow}">
          <span>Date of update</span>
          <span>Height</span>
          <span>Weight</span>
          <span>Body mass index</span>
          <span>Waist circumference</span>
          <span>Head circumference</span>
          <span>Temperature</span>
          <span>Pulse</span>
          <span>Respiratory rate</span>
          <span>Pain scale</span>
          <span>Pregnancy month</span>
          <span>Muac</span>
          <span>Oxygen flow rate</span>
          <span>Systolic bp</span>
          <span>Dyastolic bp</span>
        </div>
        <div class="vs-table-container" :class="{'with-shadow': addShadow}" ref="scrollBox">
          <table>
          <tbody>
            <tr><td  :key="'date_of_update_'+index+item" v-for="(item, index) in vitalSigns['date_of_update'].split(',').reverse()"><div v-html="convertDate(item)"></div></td></tr>
            <tr><td :key="'height_'+index+item" v-for="(item, index) in vitalSigns['height'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'weight_'+index+item" v-for="(item, index) in vitalSigns['weight'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'body_mass_index_'+index+item" v-for="(item, index) in vitalSigns['body_mass_index'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'waist_circumference_'+index+item" v-for="(item, index) in vitalSigns['waist_circumference'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'head_circumference_'+index+item" v-for="(item, index) in vitalSigns['head_circumference'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'temperature_'+index+item" v-for="(item, index) in vitalSigns['temperature'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'pulse_'+index+item" v-for="(item, index) in vitalSigns['pulse'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'respiratory_rate_'+index+item" v-for="(item, index) in vitalSigns['respiratory_rate'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'pain_scale_'+index+item" v-for="(item, index) in vitalSigns['pain_scale'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'pregnancy_month_'+index+item" v-for="(item, index) in vitalSigns['pregnancy_month'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'muac_'+index+item" v-for="(item, index) in vitalSigns['muac'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'oxygen_flow_rate_'+index+item" v-for="(item, index) in vitalSigns['oxygen_flow_rate'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'systolic_bp_'+index+item" v-for="(item, index) in vitalSigns['systolic_bp'].split(',').reverse()">{{item}}</td></tr>
            <tr><td :key="'diastolic_bp_'+index+item" v-for="(item, index) in vitalSigns['diastolic_bp'].split(',').reverse()">{{item}}</td></tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <edit-vs-modal @edit="onEditVs"/>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule } from 'nuxt-property-decorator';
import Vue from 'vue'
import VSStore from '~/store/patient-data/vs-store';
import EditVsModal from './EditVsModal.vue';

@Component({
  components:{
    editVsModal: EditVsModal
  }
})
export default class VitalSigns extends Vue{
  private vsStore = getModule(VSStore, this.$store)
  patientId = 27
  
  addShadow = false
  public get vitalSigns() {
    return this.vsStore.vitalSigns
  }

  openEditVs(){
    // @ts-ignore
    this.$bvModal.show('edit-vs-modal')
  }
  async onEditVs(formData: FormData){
    console.log('editvs')
    const vs = Object.assign({}, this.vitalSigns)
    Object.keys(vs).forEach(key => {
      //@ts-ignore
      vs[key] = vs[key] == null || vs[key].trim() == '' ? formData.get(key) : vs[key]+','+formData.get(key)
    })
    await this.vsStore.updateVs({patientId: this.patientId, data: vs})
  }
  convertDate(date: string){
    return moment(date).format('MM Do YYYY, [<br/>] h:mm:ss a')
  }
  onBoxScroll(event: any){
    let node = event.target
    if(node.scrollLeft > 0)
      this.addShadow = true
    else this.addShadow = false
  }

  destroy(){
    //@ts-ignore
    this.$refs.scrollBox.removeEventListener('scroll', this.onBoxScroll)
  }
  async mounted(){
    await this.vsStore.getVitalSigns(27)
    //@ts-ignore
    this.$refs.scrollBox.addEventListener('scroll', this.onBoxScroll)
  }

  
}
</script>
<style lang="scss" scoped>

$cell-height: 45px;
$border-color: #F0F0F0;
.vs-container{
  display: grid;
  grid-template-columns: 250px 1fr;
  align-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  
  border: 1px solid $border-color;
  &>.titles{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    z-index: 2;
    border-right: 1px solid $border-color;
    transition: all 0.4s ease;
    &.with-shadow{
      box-shadow: 4px 0 18px rgba($color: #000000, $alpha: 0.05);
      border-right: 1px solid transparent;
    }
    &>span{
      height: $cell-height;
      display: flex;
      align-items: center;
      font-size: 0.85rem;
      font-weight: 500;
      padding: 0 0.8rem;
      border-bottom: 1px solid $border-color;
      
      &:last-child{
        border-bottom-color: transparent
      }
    }
  }
  .vs-table-container{
    font-weight: 300;
    overflow-x: auto;
    overflow-y: auto;
    transition: all 0.4s ease;
    &.with-shadow{
      box-shadow: inset 4px 0 18px rgba($color: #000000, $alpha: 0.05),
    inset -4px 0 18px rgba($color: #000000, $alpha: 0.05);
    }
    table{
    width: 100%;
    &>tbody{
      overflow-x: auto;
      tr{
        height: $cell-height;
        border-bottom: 1px solid $border-color;
        font-size: 0.9rem;
        &:first-child{
          font-size: 0.75rem;
          font-weight: 500;
          color: #888;
        }
        &:last-child{
          border-bottom-color: transparent
        }
        &>td{
          padding: 0 0.8rem;
          text-align: center;
          &>div{
            width: 160px ;
          }
          
        }
      }
    }
  }
  }
  
}
</style>