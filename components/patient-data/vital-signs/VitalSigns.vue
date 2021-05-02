<template>
  <div id="vital-signs" class="data-grid">
    
     <div class="data-grid-main">
      
      <div class="px-4 py-3">
        <div class="vs-container" >
          <div class="titles" :class="{'with-shadow': addShadow}">
            <span>Date of update</span>
            <span>Height [in cm]</span>
            <span>Weight [in kg]</span>
            <span>Body mass index</span>
            <span>Waist circumference [in cm]</span>
            <span>Head circumference [in cm]</span>
            <span>Temperature [in deg Celcius]</span>
            <span>Pulse [in bpm]</span>
            <span>Respiratory rate</span>
            <span>Pain scale</span>
            <span>Pregnancy month</span>
            <span>Muac</span>
            <span>Oxygen flow rate [in L/min]</span>
            <span>Systolic bp [in mmHg]</span>
            <span>Dyastolic bp [in mmHg]</span>
          </div>
          <div class="vs-table-container" :class="{'with-shadow': addShadow}" ref="scrollBox">
            <table>
            <tbody>
              <tr><td  :key="'date_of_update_'+index+item" v-for="(item, index) in vitalSigns['date_of_update'].split(',').reverse()"><div v-html="convertDate(item)"></div></td></tr>
              <tr><td :key="'height_'+index+item" v-for="(item, index) in vitalSigns['height'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'weight_'+index+item" v-for="(item, index) in vitalSigns['weight'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'body_mass_index_'+index+item" v-for="(item, index) in vitalSigns['body_mass_index'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'waist_circumference_'+index+item" v-for="(item, index) in vitalSigns['waist_circumference'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'head_circumference_'+index+item" v-for="(item, index) in vitalSigns['head_circumference'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'temperature_'+index+item" v-for="(item, index) in vitalSigns['temperature'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'pulse_'+index+item" v-for="(item, index) in vitalSigns['pulse'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'respiratory_rate_'+index+item" v-for="(item, index) in vitalSigns['respiratory_rate'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'pain_scale_'+index+item" v-for="(item, index) in vitalSigns['pain_scale'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'pregnancy_month_'+index+item" v-for="(item, index) in vitalSigns['pregnancy_month'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'muac_'+index+item" v-for="(item, index) in vitalSigns['muac'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'oxygen_flow_rate_'+index+item" v-for="(item, index) in vitalSigns['oxygen_flow_rate'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'systolic_bp_'+index+item" v-for="(item, index) in vitalSigns['systolic_bp'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
              <tr><td :key="'diastolic_bp_'+index+item" v-for="(item, index) in vitalSigns['diastolic_bp'].split(',').reverse()"><div class="value"><span>{{item}}</span></div></td></tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
    <footer class="fixed-footer">
      <button class="btn btn-footer-action" @click="openEditVs">Update Vital Signs</button>
    </footer>
    <edit-vs-modal @edit="onEditVs"/>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, getModule, Prop } from 'nuxt-property-decorator';
import Vue from 'vue'
import VSStore from '~/store/patient-data/vs-store';
import EditVsModal from './EditVsModal.vue';

@Component({
  components:{
    editVsModal: EditVsModal
  }
})
export default class VitalSigns extends Vue{
  @Prop({required: true}) patientId!:number
  private vsStore = getModule(VSStore, this.$store)
  
  
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
    document.querySelector('.vs-table-container').removeEventListener('scroll', this.onBoxScroll)
  }
  async mounted(){
    await this.vsStore.getVitalSigns(this.patientId)
    //@ts-ignore
    document.querySelector('.vs-table-container').addEventListener('scroll', this.onBoxScroll)
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
      box-shadow: 2px 0 20px rgba($color: #000000, $alpha: 0.05);
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
    background-color: #fff;
    transition: all 0.4s ease;
    &.with-shadow{
      box-shadow: inset 4px 0 4px rgba($color: #000000, $alpha: 0.1),
    inset -1px 0 1px rgba($color: #000000, $alpha: 0.05),
    inset -4px 0 12px rgba($color: #000000, $alpha: 0.05);
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
            
          }
          .value{
            height: 100%;
            width: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            &>span{
              background-color: rgba($color: #088AE9, $alpha: 0.29);
              color: #696868;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.7rem;
              font-weight: 600;
              padding: 0 0.8rem;
              min-width: 80px;
              height: 30px;
              border-radius: 30px;
            }
          }
          
        }
      }
    }
  }
  }
  
}
</style>