import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import { ILegalDocument } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  namespaced: true,
  name: 'patient-data/ld-store',
  stateFactory: true
})
export default class LDStore extends VuexModule{
  docs: ILegalDocument[] = []

  @VuexMutation
  SET_DOCS(data: ILegalDocument[]){
    this.docs = data
  }

  @VuexAction
  async getDocs(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const docs = await patientDataApi.getLegalDocs(patientId, token)
      this.context.commit('SET_DOCS', docs)
    } catch (error) {
      alert("Get legal docs failed")
    }
  }
}