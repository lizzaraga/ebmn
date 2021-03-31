import { VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Module } from "vuex-module-decorators";
import { IAbusiveSubstance } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name: 'patient-data/as-store',
  namespaced: true,
  stateFactory: true
})
export default class ASStore extends VuexModule{
  abusiveSubstances: IAbusiveSubstance[] = []

  @VuexMutation
  SET_AS(data: IAbusiveSubstance[]){
    this.abusiveSubstances = data
  }

  // ACTIONS

  @VuexAction
  async getAS(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.getAS(token, patientId)
      this.context.commit('SET_AS', data)
    } catch (error) {
      alert('Get abusive substances failed')
    }
  }
  @VuexAction
  async createAs({patientId, formData}: {patientId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.createAS(token, patientId, formData)
      await this.context.dispatch('getAS', patientId)
    } catch (error) {
      alert('Create abusive substances failed')
    }
  }
  @VuexAction
  async editAs({patientId, asId, formData}: {patientId: number, asId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateAS(token, asId, formData)
      await this.context.dispatch('getAS', patientId)
    } catch (error) {
      alert('Edit abusive substances failed')
    }
  }
  @VuexAction
  async deleteAs({patientId, asId}: {patientId: number, asId: number}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.deleteAS(token, asId)
      await this.context.dispatch('getAS', patientId)
    } catch (error) {
      alert('Edit abusive substances failed')
    }
  }
}