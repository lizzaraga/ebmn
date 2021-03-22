import Axios from 'axios'
import {IGeneralInfo, IUpdateGI, IUpdateGIFile} from '@/api/models/patient-data.model'

class PatientDataApi {

  /**
   * General Information
   */
  async getGeneralInfo(patientId: number, token: string){
    try {
      const response = await Axios.get(`/general_info/get/${patientId}/${token}/`)
      return Promise.resolve<IGeneralInfo>(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateGIField(patientId: number, token: string, request: IUpdateGI){
    try {
      const response = await Axios.put(`/general_info/update/${patientId}/${token}/`, request)
        return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateGIBinaryField(patientId: number, token: string, request: IUpdateGIFile){
    try {
      await Axios.put(`/general_info/update/${patientId}/${token}/`, request.data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    } catch (error) {
      return Promise.reject(error)
    }
  }


}

export default new PatientDataApi()