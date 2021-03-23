import Axios from 'axios'
import { IHealthInstitute } from "./models/hospital.model"

class HIApi{
  /**
   * Get health institutes from loinc Code
   * @param loincCode 
   * @param token 
   * @returns 
   */
   async getHIFromLoincCode(loincCode: string, token: string){
    try {
      const response = Axios.get(`/hospitals/get/lab/${loincCode}/${token}/`)
      return Promise.resolve<IHealthInstitute>((await response).data.health_institutes)
    } catch (error) {
        return Promise.reject(error)
    }
  }
}

export default new HIApi()