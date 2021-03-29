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
}