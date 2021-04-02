import { VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { Module } from "vuex-module-decorators";
import { IProblem } from "~/api/models/patient-data.model";
import patientDataApi from "~/api/patient-data.api";

@Module({
  name: 'patient-data/problem-store',
  namespaced: true,
  stateFactory: true
})
export default class ProblemStore extends VuexModule{
  problems: IProblem[] = []

  @VuexMutation
  SET_PROBLEMS(data: IProblem[]){
    this.problems = data
  }

  // ACTIONS

  @VuexAction
  async getProblems(patientId: number){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const data = await patientDataApi.getProblems(token, patientId)
      this.context.commit('SET_PROBLEMS', data)
    } catch (error) {
      alert('Get problems failed')
    }
  }
  @VuexAction
  async createProblem({patientId, formData}: {patientId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      const docs = await patientDataApi.createProblem(token, patientId, formData)
      this.context.dispatch('getProblems', patientId)
    } catch (error) {
      alert("Create problem failed")
    }
  }
  @VuexAction
  async editProblem({patientId, pbId, formData}: {patientId: number, pbId: number, formData: FormData}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.updateProblem(token, pbId, formData)
      this.context.dispatch('getProblems', patientId)
    } catch (error) {
      alert("Edit Problem failed")
    }
  }
  @VuexAction
  async deleteProblem({patientId, pbId}: {patientId: number, pbId: number}){
    const token = this.context.rootGetters['auth-store/token']
    try {
      await patientDataApi.deleteProblem(pbId, token)
      this.context.dispatch('getProblems', patientId)
    } catch (error) {
      alert("Delete Problem failed")
    }
  }
}