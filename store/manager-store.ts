import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import managerApi from "~/api/manager.api";
import { IClerkDiagnosis, IClerkDrug, IClerkScreening, IClerkSurgery, IClerkVaccine } from "~/api/models/clerk.model";
import { IHealthWorker } from "~/api/models/manager.model";

@Module({
  name: 'manager-store',
  namespaced: true,
  stateFactory: true
})
export default class ManagerStore extends VuexModule{
  healthWorkers: IHealthWorker[] = []
  vaccines: IClerkVaccine[] = []
  drugs: IClerkDrug[] = []

  screenings: IClerkScreening[] = []
  diagnosis: IClerkDiagnosis[] = []
  surgeries: IClerkSurgery[] = []


  @VuexMutation
  setHealthWorkers(data: IHealthWorker[]){
    this.healthWorkers = data
  }
  @VuexMutation
  setVaccines(data: IClerkVaccine[]){
    this.vaccines = data
  }
  @VuexMutation
  setDrugs(data: IClerkDrug[]){
    this.drugs = data
  }

  @VuexMutation
  setScreenings(data: IClerkScreening[]){
    this.screenings = data
  }
  @VuexMutation
  setDiagnosis(data: IClerkDiagnosis[]){
    this.diagnosis = data
  }
  @VuexMutation
  setSurgeries(data: IClerkSurgery[]){
    this.surgeries = data
  }

  @VuexAction
  async getHealthWorkers(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const healthWorkers = await managerApi.getHealthWorkers(token)
      this.context.commit('setHealthWorkers', healthWorkers)
    } catch (error) {
      alert('Fetch health workers failed')
    }
  }
  @VuexAction
  async createHealthWorker(data: FormData){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await managerApi.createHealthWorker(token, data)
      this.context.dispatch('getHealthWorkers')
    } catch (error) {
      alert('Create health workers failed')
    }
  }
  @VuexAction
  async deleteHealthWorker(workerId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await managerApi.deleteHealthWorker(token, workerId)
      this.context.dispatch('getHealthWorkers')
    } catch (error) {
      alert('Delete health workers failed')
    }
  }

  // Health Technology Purpose Management

  @VuexAction
  async getScreenings(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const screenings = await managerApi.getScreenings(token)
      this.context.commit('setScreenings', screenings)
    } catch (error) {
      alert('Get screenings failed')
    }
  }
  @VuexAction
  async getDiagnosis(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const diagnosis = await managerApi.getDiagnosis(token)
      this.context.commit('setDiagnosis', diagnosis)
    } catch (error) {
      alert('Get diagnosis failed')
    }
  }
  @VuexAction
  async getSurgeries(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const surgeries = await managerApi.getSurgeries(token)
      this.context.commit('setSurgeries', surgeries)
    } catch (error) {
      alert('Get surgeries failed')
    }
  }

  // Health Technology Physical Nature

  @VuexAction
  async getDrugs(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const drugs = await managerApi.getDrugs(token)
      this.context.commit('setDrugs', drugs)
    } catch (error) {
      alert('Get drugs failed')
    }
  }
  @VuexAction
  async getVaccines(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const vaccines = await managerApi.getVaccines(token)
      this.context.commit('setVaccines', vaccines)
    } catch (error) {
      alert('Get vaccines failed')
    }
  }

}