import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator"

@Module({
  name: 'patient-data/id-store',
  namespaced: true,
  stateFactory: true
})
export default class IdStore extends VuexModule{

  patientId: number = -1

  @VuexMutation
  SET_PATIENT_ID(data: number){
    this.patientId = data
  }

  @VuexAction
  setPatientId(data: number){
    this.context.commit('SET_PATIENT_ID', data)
  }

}