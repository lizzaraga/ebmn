import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import adminApi from "~/api/admin.api";
import hospitalApi from "~/api/hospital.api";
import { IAdminUser, IGuideline } from "~/api/models/admin.model";
import { IAdminClerk } from "~/api/models/clerk.model";
import { IHospital } from "~/api/models/hospital.model";
import { IAdminManager } from "~/api/models/manager.model";


@Module({
  name: 'admin-store',
  namespaced: true,
  stateFactory: true
})
export default class AdminStore extends VuexModule{

  
  managers: IAdminManager[] = []
  clerks: IAdminClerk[] = []
  guidelines: IGuideline[] = []
  users: IAdminUser[] = []

  
  @VuexMutation
  setManagers(data: IAdminManager[]){
    this.managers = data
  }
  @VuexMutation
  setClerks(data: IAdminClerk[]){
    this.clerks = data
  }
  @VuexMutation
  setGuidelines(data: IGuideline[]){
    this.guidelines = data
  }
  @VuexMutation
  SET_USERS(data: IAdminUser[]){
    this.users = data
  }

  @VuexMutation
  RESET_STORE(){
    this.managers = []
    this.clerks = []
    this.guidelines = []
    this.users = []
  }

  
  @VuexAction
  async getManagers(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const managers = await adminApi.getManagers(token)
      this.context.commit('setManagers', managers)
    } catch (error) {
      alert("Fetch managers failed")
    }
  }
  @VuexAction
  async createManager(formData: FormData){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await adminApi.createManager(token, formData)
      this.context.dispatch('getManagers')
    } catch (error) {
      alert("Create manager failed")
    }
  }
  @VuexAction
  async deleteManager(managerId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await adminApi.deleteManager(token, managerId)
      this.context.dispatch('getManagers')
    } catch (error) {
      alert("Delete manager failed")
    }
  }
  @VuexAction
  async getUsers(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const users = await adminApi.getUsers(token)
      this.context.commit('SET_USERS', users)
    } catch (error) {
      alert("Fetch users failed")
    }
  }

  @VuexAction
  async getClerks(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const clerks = await adminApi.getClerks(token)
      this.context.commit('setClerks', clerks)
    } catch (error) {
      alert("Fetch clerks failed")
    }
  }
  @VuexAction
  async createClerk(formData: FormData){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await adminApi.createClerk(token, formData)
      this.context.dispatch('getClerks')
    } catch (error) {
      alert("Create clerk failed")
    }
  }
  @VuexAction
  async deleteClerk(clerkId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await adminApi.deleteClerk(token, clerkId)
      this.context.dispatch('getClerks')
    } catch (error) {
      alert("Delete clerk failed")
    }
  }
  @VuexAction
  async getGuidelines(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const guidelines = await adminApi.getGuidelines(token)
      this.context.commit('setGuidelines', guidelines)
    } catch (error) {
      alert("Fetch guidelines failed")
    }
  }
  @VuexAction
  async editGuideline({guidelineId, formData}:{guidelineId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await adminApi.updateGuideline(token, guidelineId, formData)
      this.context.dispatch('getGuidelines')
    } catch (error) {
      alert("Edit guideline failed")
    }
  }

}