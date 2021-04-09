import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import clerkApi from "~/api/clerk.api";
import managerApi from "~/api/manager.api";
import { IClerkDiagnosis, IClerkDrug, IClerkScreening, IClerkSurgery, IClerkVaccine } from "~/api/models/clerk.model";
import { IHealthWorker, IReferral } from "~/api/models/manager.model";

@Module({
  name: 'manager-store',
  namespaced: true,
  stateFactory: true
})
export default class ManagerStore extends VuexModule{

  managerHpId: number = -1
  inReferrals: IReferral[] = []
  outReferrals: IReferral[] = []

  healthWorkers: IHealthWorker[] = []
  vaccines: IClerkVaccine[] = []
  drugs: IClerkDrug[] = []

  screenings: IClerkScreening[] = []
  diagnosis: IClerkDiagnosis[] = []
  surgeries: IClerkSurgery[] = []


  @VuexMutation
  SET_MANAGER_HOSPITAL_ID(data: number){
    this.managerHpId = data
  }
  @VuexMutation
  SET_IN_REFERRALS(data: IReferral[]){
    this.inReferrals = data
  }
  @VuexMutation
  SET_OUT_REFERRALS(data: IReferral[]){
    this.outReferrals = data
  }

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
  async getManagerHospital(managerId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const id = await managerApi.getManagerHospital(token, managerId)
      this.context.commit('SET_MANAGER_HOSPITAL_ID', id)
    } catch (error) {
      alert('Get manager hospital failed')
    }
  }
  @VuexAction
  async getInRefferals(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const id = await managerApi.getReferralsIn(token, this.managerHpId)
      this.context.commit('SET_IN_REFERRALS')
    } catch (error) {
      alert('Get in referrals failed')
    }
  }
  @VuexAction
  async getOutRefferals(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const id = await managerApi.getReferralsOut(token, this.managerHpId)
      this.context.commit('SET_OUT_REFERRALS')
    } catch (error) {
      alert('Get out referrals failed')
    }
  }
  @VuexAction
  async updateInReferral({referralId, formData}: { 
    referralId: number, formData: FormData}){
      const token = this.context.rootGetters['auth-store/token']
      try {
        await managerApi.updateReferral(token, referralId, formData)
        this.context.dispatch('getInRefferals')
      } catch (error) {
        alert('Edit in referrals failed')
      }
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

}