import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import clerkApi from "~/api/clerk.api";
import { IClerkDiagnosis, IClerkDrug, IClerkScreening, IClerkSurgery, IClerkVaccine } from "~/api/models/clerk.model";

@Module({
  name: 'clerk-store',
  namespaced: true,
  stateFactory: true
})
export default class ClerkStore extends VuexModule{
  vaccines: IClerkVaccine[] = []
  drugs: IClerkDrug[] = []

  screenings: IClerkScreening[] = []
  diagnosis: IClerkDiagnosis[] = []
  surgeries: IClerkSurgery[] = []


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
  async getVaccines(hospitalId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const vaccines = await clerkApi.getVaccines(token, hospitalId)
      this.context.commit('setVaccines', vaccines)
    } catch (error) {
      alert('Get clerk vaccines failed')
    }
  }
  @VuexAction
  async getDrugs(hospitalId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const drugs = await clerkApi.getDrugs(token, hospitalId)
      this.context.commit('setDrugs', drugs)
    } catch (error) {
      alert('Get clerk drugs failed')
    }
  }
  @VuexAction
  async updateVaccine(vaccine: IClerkVaccine){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await clerkApi.updateVaccine(token, vaccine)
      this.context.dispatch('getVaccines')
    } catch (error) {
      alert('Failed to update vaccine')
    }
  }
  @VuexAction
  async updateDrug(drug: IClerkDrug){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await clerkApi.updateDrug(token, drug)
      this.context.dispatch('getDrugs')
    } catch (error) {
      alert('Failed to update drug')
    }
  }

  @VuexAction
  async getScreenings(hospitalId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const screenings = await clerkApi.getScreenings(token, hospitalId)
      this.context.commit('setScreenings', screenings)
    } catch (error) {
      alert('Get clerk screenings failed')
    }
  }
  @VuexAction
  async getDiagnosis(hospitalId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const diagnosis = await clerkApi.getDiagnosis(token, hospitalId)
      this.context.commit('setDiagnosis', diagnosis)
    } catch (error) {
      alert('Get clerk diagnosis failed')
    }
  }
  @VuexAction
  async getSurgeries(hospitalId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const surgeries = await clerkApi.getSurgeries(token, hospitalId)
      this.context.commit('setSurgeries', surgeries)
    } catch (error) {
      alert('Get clerk surgeries failed')
    }
  }
  @VuexAction
  async updateScreening(screening: IClerkScreening){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await clerkApi.updateScreening(token, screening)
      this.context.dispatch('getScreenings')
    } catch (error) {
      alert('Failed to update screening')
    }
  }
  @VuexAction
  async updateDiagnosis(diagnosis: IClerkDiagnosis){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await clerkApi.updateDiagnosis(token, diagnosis)
      this.context.dispatch('getDiagnosis')
    } catch (error) {
      alert('Failed to update diagnosis')
    }
  }
  @VuexAction
  async updateSurgery(surgery: IClerkSurgery){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await clerkApi.updateSurgery(token, surgery)
      this.context.dispatch('getSurgeries')
    } catch (error) {
      alert('Failed to update surgery')
    }
  }

}