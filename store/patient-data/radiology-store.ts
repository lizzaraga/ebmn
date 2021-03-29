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
}