import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import { IGeneralInfo, IUpdateGI, IUpdateGIFile } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";
import patientApi from "~/api/patient.api";

@Module({
  namespaced: true,
  name:"patient-data/gi-store",
  stateFactory: true
})
export default class GIStore extends VuexModule{
  gi: IGeneralInfo = {emergency_contacts: []}

  @VuexMutation
  setGI(data: IGeneralInfo){
    this.gi = data
  }
  @VuexMutation
  UPDATE_FIELD({name, value}: {name: string, value: string}){
    const temp = {}
    // @ts-ignore
    temp[name] = value
    this.gi = {...this.gi, ...temp}
  }

  @VuexAction
  async getGeneralInfo(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const gi = await patientDataApi.getGeneralInfo(patientId, token)
      this.context.commit('setGI', gi)
    } catch (error) {
      console.log('Get general info failed')
    }
  }

  @VuexAction
  async updateGIField({patientId, request}: {patientId: number, request: IUpdateGI}){
    const token = this.context.rootGetters['auth-store/token']
    const data = {}
    //@ts-ignore
    data[request.name] = request.value
    console.log('Data: ', data)
    try {
      await patientDataApi.updateGIField(patientId, token, data)
      this.context.commit('UPDATE_FIELD', request)
    } catch (error) {
      console.log('Update general info field failed')
    }
  }

  @VuexAction
  async updateGIBinaryField({patientId, request}:{patientId: number, request: IUpdateGIFile}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      console.log('Request: ', request.data)
      await patientDataApi.updateGIBinaryField(patientId, token, request.data)
      this.context.commit('UPDATE_FIELD', request)
    } catch (error) {
      console.log('Update general info binary field failed')
    }
  }
}