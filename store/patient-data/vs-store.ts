import { VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Module } from "vuex-module-decorators";
import { IVitalSigns } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name: 'patient-data/vs-store',
  namespaced: true,
  stateFactory: true
})
export default class VSStore extends VuexModule{
  vitalSigns: IVitalSigns = {
    body_mass_index: '',
    date_of_update: '',
    diastolic_bp: '',
    head_circumference: '',
    height: '',
    muac: '',
    oxygen_flow_rate: '', pain_scale: '', pregnancy_month: '',
    pulse: '', respiratory_rate: '', systolic_bp: '', temperature: '',
    waist_circumference: '', weight: ''
  }
  @VuexMutation
  RESET_STORE(){
    this.vitalSigns = {
      body_mass_index: '',
      date_of_update: '',
      diastolic_bp: '',
      head_circumference: '',
      height: '',
      muac: '',
      oxygen_flow_rate: '', pain_scale: '', pregnancy_month: '',
      pulse: '', respiratory_rate: '', systolic_bp: '', temperature: '',
      waist_circumference: '', weight: ''
    }
    
  }

  @VuexMutation
  SET_VITAL_SIGNS(data: IVitalSigns){
    this.vitalSigns = data
  }

  @VuexAction
  async getVitalSigns(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.getVitalSigns(token, patientId)
      this.context.commit('SET_VITAL_SIGNS', data)
    } catch (error) {
      alert("Get vital signs failed")
    }
  }
  @VuexAction
  async updateVs({patientId, data}: {patientId: number, data: IVitalSigns}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateVitalSigns(token, patientId, data)
      
      this.context.commit('SET_VITAL_SIGNS', data)
    } catch (error) {
      alert("update vital signs failed")
    }
  }
}