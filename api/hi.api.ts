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
        return Promise.resolve<IHealthInstitute[]>((await response).data.health_institutes)
      } catch (error) {
          return Promise.reject(error)
      }
    }
    async getHIPromIcdCode(token: string, icdCode: string){
      try {
          const response = await Axios.get(`/hospitals/get/diagnosis/${icdCode}/${token}/`)
          return Promise.resolve<IHealthInstitute[]>(response.data.health_institutes)
      } catch (error) {
          if(Axios.isCancel(error))
              return Promise.reject(false)
          return Promise.reject(error)
      }
    }
    async getHIFromRxNormLabel(token: string, rxnormLabel: string){
      try {
          const response = await Axios.get(`/hospitals/get/medication/${rxnormLabel}/${token}/`)
          return Promise.resolve<IHealthInstitute[]>(response.data.health_institutes)
      } catch (error) {
          return Promise.reject(error)
      }
    }
    async getHIFromCptCode(token: string, cpCode: string){
      try {
          const response = await Axios.get(`hospitals/get/surgery/${cpCode}/${token}/`)
          return Promise.resolve<IHealthInstitute[]>(response.data.health_institutes)
      } catch (error) {
          return Promise.reject(error)
      }
    }
}

export default new HIApi()