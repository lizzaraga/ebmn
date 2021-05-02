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
  @VuexMutation
  RESET_STORE(){
    this.docs = []
    
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
  @VuexAction
  async createDoc({patientId, formData}: {patientId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const docs = await patientDataApi.createLegalDoc(patientId, token, formData)
      this.context.dispatch('getDocs', patientId)
    } catch (error) {
      alert("Create legal doc failed")
    }
  }
  @VuexAction
  async editDoc({patientId, docId, formData}: {patientId: number, docId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateLegalDoc(docId, token, formData)
      this.context.dispatch('getDocs', patientId)
    } catch (error) {
      alert("Edit legal doc failed")
    }
  }
  @VuexAction
  async deleteDoc({patientId, docId}: {patientId: number, docId: number}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.deleteLegalDoc(docId, token)
      this.context.dispatch('getDocs', patientId)
    } catch (error) {
      alert("Delete legal doc failed")
    }
  }
}