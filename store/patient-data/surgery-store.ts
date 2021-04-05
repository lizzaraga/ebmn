import { VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Module } from "vuex-module-decorators";
import { ISurgery } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name: 'patient-data/surgery-store',
  namespaced: true,
  stateFactory: true
})
export default class SurgeryStore extends VuexModule{
  surgeries: ISurgery[] = []

  @VuexMutation
  SET_SURGERIES(data: ISurgery[]){
    this.surgeries = data
  }

  // ACTIONS

  @VuexAction
  async getSurgeries(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.getSurgeries(token, patientId)
      this.context.commit('SET_SURGERIES', data)
    } catch (error) {
      alert('Get surgeries failed')
    }
  }
  @VuexAction
  async createSurgery({patientId, formData}: {patientId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const docs = await patientDataApi.createSurgery(token, patientId, formData)
      this.context.dispatch('getSurgeries', patientId)
    } catch (error) {
      alert("Create surgery failed")
    }
  }
  @VuexAction
  async editSurgery({patientId, sgId, formData}: {patientId: number, sgId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateSurgery(token, sgId, formData)
      this.context.dispatch('getSurgeries', patientId)
    } catch (error) {
      alert("Edit surgery failed")
    }
  }
  @VuexAction
  async deleteSurgery({patientId, sgId}: {patientId: number, sgId: number}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.deleteSurgery(token, sgId)
      this.context.dispatch('getSurgeries', patientId)
    } catch (error) {
      alert("Delete surgery failed")
    }
  }
}