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
  @VuexAction
  async createLab({patientId, formData}: {patientId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const docs = await patientDataApi.createLab(token, patientId, formData)
      this.context.dispatch('getLabs', patientId)
    } catch (error) {
      alert("Create lab failed")
    }
  }
  @VuexAction
  async editLab({patientId, labId, formData}: {patientId: number, labId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateLab(labId, token, formData)
      this.context.dispatch('getLabs', patientId)
    } catch (error) {
      alert("Edit lab failed")
    }
  }
  @VuexAction
  async deleteLab({patientId, labId}: {patientId: number, labId: number}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.deleteLab(labId, token)
      this.context.dispatch('getLabs', patientId)
    } catch (error) {
      alert("Delete lab failed")
    }
  }
}