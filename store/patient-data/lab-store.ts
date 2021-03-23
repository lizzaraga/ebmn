import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import { ILab } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name:'patient-data/lab-store',
  namespaced: true,
  stateFactory: true
})
export default class LabStore extends VuexModule{
  labs: ILab[] = []

  @VuexMutation
  SET_LABS(data: ILab[]){
    this.labs = data
  }

  @VuexAction
  async getLabs(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const labs = await patientDataApi.getLabs(patientId, token)
      this.context.commit('SET_LABS', labs)
    } catch (error) {
      alert('Get labs failed')
    }
  }
}