import Axios from 'axios'
import { IClerkDiagnosis, IClerkDrug, IClerkScreening, IClerkSurgery, IClerkVaccine } from './models/clerk.model'
import { IHealthWorker, IReferral } from './models/manager.model'


class ManagerApi {

  async getManagerHospital(token: string, managerId: number){
    try {
      const response = await Axios.get(`/manager/hospital/get/${managerId}/`)
      return Promise.resolve<number>(response.data.manager_health_institute)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getHealthWorkers(token: string){
    try {
      const response = await Axios.get(`/health_personnels/get/${token}/`)
      return Promise.resolve<IHealthWorker[]>(response.data.user_is_health_personnel)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async createHealthWorker(token: string, data: FormData){
    try {
      const response = await Axios.post(`/health_personnel/create/${token}/`, data)
      return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async deleteHealthWorker(token: string, workerId: number){
    try {
      const response = await Axios.delete(`/health_personnel/delete/${token}/${workerId}/`)
      return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }

  async getScreenings(token: string){
    try {
      const response = await Axios.get(`/health_tech/screening/get/${token}/`)
      return Promise.resolve<IClerkScreening[]>(response.data.labs)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async getDiagnosis(token: string){
    try {
      const response = await Axios.get(`/health_tech/diagnosis/get/${token}/`)
      return Promise.resolve<IClerkDiagnosis[]>(response.data.problems)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async getSurgeries(token: string){
    try {
      const response = await Axios.get(`/health_tech/surgery/get/${token}/`)
      return Promise.resolve<IClerkSurgery[]>(response.data.surgery)
    } catch (error) {
        return Promise.reject(error)
    }
  }


  async getDrugs(token: string){
    try {
      const response = await Axios.get(`/health_tech/drugs/get/${token}/`)
      return Promise.resolve<IClerkDrug[]>(response.data.medication)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async getVaccines(token: string){
    try {
      const response = await Axios.get(`/health_tech/vaccines/get/${token}/`)
      return Promise.resolve<IClerkVaccine[]>(response.data.vaccines)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  
  async getReferralsIn(token: string, hospitalId: number){
    try {
      const res = Axios.get(`/referrals/get/in/${token}/${hospitalId}/`)
      return Promise.resolve<IReferral[]>((await res).data.referrals)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getReferralsOut(token: string, hospitalId: number){
    try {
      const res = Axios.get(`/referrals/get/out/${token}/${hospitalId}/`)
      return Promise.resolve<IReferral[]>((await res).data.referrals)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateReferral(token: string, referralId: number, formData: FormData){
    try {
      const res = Axios.put(`referrals/update/${token}/${referralId}/`, formData)
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new ManagerApi()