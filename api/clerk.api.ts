import Axios from 'axios'
import { IClerkDiagnosis, IClerkDrug, IClerkScreening, IClerkSurgery, IClerkVaccine } from "./models/clerk.model"

class ClerkApi{
  // Health Technology Physical Nature 

  async getDrugs(token: string, hospitalId: number){
    try {
      const response = await Axios.get(`/health_tech/assessment/drugs/get/${token}/${hospitalId}/`)
      return Promise.resolve<IClerkDrug[]>(response.data.medication)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async getVaccines(token: string, hospitalId: number){
    try {
      const response = await Axios.get(`/health_tech/assessment/vaccines/get/${token}/${hospitalId}/`)
      return Promise.resolve<IClerkVaccine[]>(response.data.vaccines)
    } catch (error) {
        return Promise.reject(error)
    }
  }

  async updateVaccine(token: string, vaccine: IClerkVaccine){
    try {
      const response = await Axios.put(`/health_tech/vaccines/update/${token}/${vaccine.vaccine_id}/`, 
          vaccine)
      return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }

  async updateDrug(token: string, drug: IClerkDrug){
    try {
      const response = await Axios.put(`/health_tech/drugs/update/${token}/${drug.drug_id}/`, 
          drug)
      return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }

  // Health Technology Purpose Management

  async getScreenings(token: string, hospitalId: number){
    try {
      const response = await Axios.get(`/health_tech/assessment/screening/get/${token}/${hospitalId}/`)
      return Promise.resolve<IClerkScreening[]>(response.data.labs)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async getDiagnosis(token: string, hospitalId: number){
    try {
      const response = await Axios.get(`/health_tech/assessment/diagnosis/get/${token}/${hospitalId}/`)
      return Promise.resolve<IClerkDiagnosis[]>(response.data.problems)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async getSurgeries(token: string, hospitalId: number){
    try {
      const response = await Axios.get(`/health_tech/assessment/surgery/get/${token}/${hospitalId}/`)
      return Promise.resolve<IClerkSurgery[]>(response.data.surgery)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async updateScreening(token: string, screening: IClerkScreening){
    try {
      const response = await Axios.put(`/health_tech/screening/update/${token}/${screening.screening_id}/`, 
          screening)
      return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async updateDiagnosis(token: string, diagnosis: IClerkDiagnosis){
    try {
      const response = await Axios.put(`/health_tech/diagnosis/update/${token}/${diagnosis.diagnosis_id}/`, 
          diagnosis)
      return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async updateSurgery(token: string, surgery: IClerkSurgery){
    try {
      const response = await Axios.put(`/health_tech/surgery/update/${token}/${surgery.surgery_id}/`, 
          surgery)
      return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }
}

export default new ClerkApi()