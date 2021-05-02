import { VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Module } from "vuex-module-decorators";
import { IRadiology } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name: 'patient-data/radiology-store',
  namespaced: true,
  stateFactory: true
})
export default class RadiologyStore extends VuexModule{
  radiologies: IRadiology[] = []

  @VuexMutation
  SET_RADIOLOGIES(data: IRadiology[]){
    this.radiologies = data
  }
  @VuexMutation
  RESET_STORE(){
    this.radiologies = []
    
  }

  // ACTIONS

  @VuexAction
  async getRadiologies(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.getRadiologies(token, patientId)
      this.context.commit('SET_RADIOLOGIES', data)
    } catch (error) {
      alert('Get radiologies failed')
    }
  }

  @VuexAction
  async createRadiology({patientId, formData}: {patientId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const docs = await patientDataApi.createRadiology(token, patientId, formData)
      this.context.dispatch('getRadiologies', patientId)
    } catch (error) {
      alert("Create radiology failed")
    }
  }
  @VuexAction
  async editRadiology({patientId, rdId, formData}: {patientId: number, rdId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateRadiology(token, rdId, formData)
      this.context.dispatch('getRadiologies', patientId)
    } catch (error) {
      alert("Edit radiology failed")
    }
  }
  @VuexAction
  async deleteRadiology({patientId, rdId}: {patientId: number, rdId: number}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.deleteRadiology(token, rdId)
      this.context.dispatch('getRadiologies', patientId)
    } catch (error) {
      alert("Delete radiology failed")
    }
  }
}