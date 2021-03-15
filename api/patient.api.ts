import Axios from 'axios'
import { ICreateEmergency, IEmergency } from './models/patient.model'

class PatientApi{

  async getPatientEmergencies(token: string){
    try {
      const response = await Axios.get(`/emergency/patient/get/${token}/`)
      return Promise.resolve<IEmergency[]>(response.data.emergencies)
    } catch (error) {
        return Promise.reject(error)
    }
  }

  async createEmergency(token: string, createEg: ICreateEmergency){
    try {
      const response = await Axios.post(`/emergency/create/${token}/`, createEg,  {
        headers: {"Content-Type": 'application/json'}
      })
      return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }
}
export default new PatientApi()