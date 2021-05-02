import { VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Module } from "vuex-module-decorators";
import { IEkg } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name: 'patient-data/ekg-store',
  namespaced: true,
  stateFactory: true
})
export default class EkgStore extends VuexModule{
  ekgs: IEkg[] = []

  @VuexMutation
  SET_EKGS(data: IEkg[]){
    this.ekgs = data
  }
  @VuexMutation
  RESET_STORE(){
    this.ekgs = []
    
  }

  // ACTIONS

  @VuexAction
  async getEkgs(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.getEkgs(token, patientId)
      this.context.commit('SET_EKGS', data)
    } catch (error) {
      alert('Get ekgs failed')
    }
  }
  @VuexAction
  async createEkg({patientId, formData}: {patientId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const docs = await patientDataApi.createEkg(token, patientId, formData)
      this.context.dispatch('getEkgs', patientId)
    } catch (error) {
      alert("Create Ekg failed")
    }
  }
  @VuexAction
  async editEkg({patientId, ekgId, formData}: {patientId: number, ekgId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateEkg(token, ekgId, formData)
      this.context.dispatch('getEkgs', patientId)
    } catch (error) {
      alert("Edit Ekg failed")
    }
  }
  @VuexAction
  async deleteEkg({patientId, ekgId}: {patientId: number, ekgId: number}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.deleteEkg(token, ekgId)
      this.context.dispatch('getEkgs', patientId)
    } catch (error) {
      alert("Delete Ekg failed")
    }
  }
}