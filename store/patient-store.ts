import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { ICreateEmergency, IEmergency } from "~/api/models/patient.model";
import patientApi from "~/api/patient.api";
@Module({
  name: 'patient-store',
  namespaced:true,
  stateFactory: true,
})
export default class PatientStore extends VuexModule{
  emergencies: IEmergency[] = []

  @VuexMutation
  setEmergencies(data: IEmergency[]){
    this.emergencies = data
  }
  @VuexMutation
  RESET_STORE(){
    this.emergencies = []
    
  }


  @VuexAction
  async getEmergencies(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const emergencies = await patientApi.getPatientEmergencies(token)
      this.context.commit('setEmergencies', emergencies)
    } catch (error) {
      alert("Get emmergencies failed")
    }
  }
  @VuexAction
  async createEmergency(createEg: ICreateEmergency){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientApi.createEmergency(token, createEg)
      this.context.dispatch('getEmergencies')
    } catch (error) {
      alert('Create emergency failed.')
    }
  }
}