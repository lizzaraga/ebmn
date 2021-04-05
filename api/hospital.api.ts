import Axios from 'axios'
import { IHospital } from './models/hospital.model'

class HospitalApi{

  async getHospitals(token: string){
    try {
      const response = Axios.get(`/hospitals/get/${token}/`)
      return Promise.resolve<IHospital[]>((await response).data.hospitals)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async createHospital(token: string, data: FormData){
    try {
      const response = Axios.post(`/hospital/create/${token}/`, data)
      return Promise.resolve((await response).data)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async editHospital(token: string, hospitalId: number, data: FormData){
    try {
      const response = Axios.put(`/hospital/update/${token}/${hospitalId}/`, data)
      return Promise.resolve((await response).data)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async deleteHospital(token: string, hospitalId: number){
    try {
      const response = Axios.delete(`/hospital/delete/${token}/${hospitalId}`)
      return Promise.resolve((await response).data)
    } catch (error) {
        return Promise.reject(error)
    }
  }


}

export default new HospitalApi()