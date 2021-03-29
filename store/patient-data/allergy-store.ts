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
}