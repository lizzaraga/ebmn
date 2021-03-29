import { VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Module } from "vuex-module-decorators";
import { IMedication } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name: 'patient-data/medication-store',
  namespaced: true,
  stateFactory: true
})
export default class MedicationStore extends VuexModule{

  medications: IMedication[] = []

  @VuexMutation
  SET_MEDICATIONS(data: IMedication[]){
    this.medications = data
  }

  @VuexAction
  async getMedications(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.getMedications(token, patientId)
      this.context.commit('SET_MEDICATIONS', data)
    } catch (error) {
      alert('Get medications failed')
    }
  }
}