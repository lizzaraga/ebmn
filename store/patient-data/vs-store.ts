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
  vitalSigns: IVitalSigns = {}

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
}