import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import adminApi from "~/api/admin.api";
import hospitalApi from "~/api/hospital.api";
import { IGuideline } from "~/api/models/admin.model";
import { IAdminClerk } from "~/api/models/clerk.model";
import { IHospital } from "~/api/models/hospital.model";
import { IAdminManager } from "~/api/models/manager.model";


@Module({
  name: 'admin-store',
  namespaced: true,
  stateFactory: true
})
export default class AdminStore extends VuexModule{

  hospitals: IHospital[] = []
  managers: IAdminManager[] = []
  clerks: IAdminClerk[] = []
  guidelines: IGuideline[] = []

  @VuexMutation
  setHospitals(data: IHospital[]){
    this.hospitals = data
  }
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


  @VuexAction
  async getHospitals(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const hospitals = await hospitalApi.getHospitals(token)
      this.context.commit('setHospitals', hospitals)
    } catch (error) {
      alert("Fetch hospitals failed")
    }
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
  async getGuidelines(){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const guidelines = await adminApi.getGuidelines(token)
      this.context.commit('setGuidelines', guidelines)
    } catch (error) {
      alert("Fetch guidelines failed")
    }
  }

}