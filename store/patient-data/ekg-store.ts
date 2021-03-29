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
}