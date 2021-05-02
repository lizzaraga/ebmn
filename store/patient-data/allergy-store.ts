import { VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Module } from "vuex-module-decorators";
import { IAllergy } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name: 'patient-data/allergy-store',
  namespaced: true,
  stateFactory: true
})
export default class AllergyStore extends VuexModule{
  allergies: IAllergy[] = []

  @VuexMutation
  SET_ALLERGIES(data: IAllergy[]){
    this.allergies = data
  }
  @VuexMutation
  RESET_STORE(){
    this.allergies = []
    
  }


  // ACTIONS

  @VuexAction
  async getAllergies(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.getAllergies(token, patientId)
      this.context.commit('SET_ALLERGIES', data)
    } catch (error) {
      alert('Get allergies failed')
    }
  }
  @VuexAction
  async createAllergy({patientId, formData}: {patientId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const docs = await patientDataApi.createAllergy(token, patientId, formData)
      this.context.dispatch('getAllergies', patientId)
    } catch (error) {
      alert("Create Allergy failed")
    }
  }
  @VuexAction
  async editAllergy({patientId, allergyId, formData}: {patientId: number, allergyId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateAllergy(token, allergyId, formData)
      this.context.dispatch('getAllergies', patientId)
    } catch (error) {
      alert("Edit Allergy failed")
    }
  }
  @VuexAction
  async deleteAllergy({patientId, allergyId}: {patientId: number, allergyId: number}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.deleteAllergy(token, allergyId)
      this.context.dispatch('getAllergies', patientId)
    } catch (error) {
      alert("Delete Allergy failed")
    }
  }
}