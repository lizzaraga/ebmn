import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import hospitalApi from "~/api/hospital.api";
import { IHospital } from "~/api/models/hospital.model";

@Module({
  name: "hospital-store",
  namespaced: true,
  stateFactory: true
})
export default class HospitalStore extends VuexModule{
  hospitals: IHospital[] = []
  
  @VuexMutation
  setHospitals(data: IHospital[]){
    this.hospitals = data
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
  async createHospital(data: FormData){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await hospitalApi.createHospital(token, data)
      this.context.dispatch('getHospitals')
    } catch (error) {
      alert("Create hospital failed")
    }
  }
  @VuexAction
  async editHospital({hospitalId, data}: {hospitalId: number, data: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await hospitalApi.editHospital(token, hospitalId, data)
      this.context.dispatch('getHospitals')
    } catch (error) {
      alert("Edit hospital failed")
    }
  }
  @VuexAction
  async deleteHospital(hospitalId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await hospitalApi.deleteHospital(token, hospitalId)
      this.context.dispatch('getHospitals')
    } catch (error) {
      alert("Delete hospital failed")
    }
  }
}