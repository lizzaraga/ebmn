import Axios, {CancelTokenSource}  from 'axios'
import {IGeneralInfo, ILab, ILabInstitute, ILegalDocument, IUpdateGI, IUpdateGIFile} from '@/api/models/patient-data.model'

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

  /**
   * Legal document
   */
  async getLegalDocs(patientId: number, token: string){
    try {
      const response = await Axios.get(`/legal_docs/get/${patientId}/${token}/`)
      return Promise.resolve<ILegalDocument[]>(response.data.legal_docs_list)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async updateLegalDoc(documentId: number, 
    token: string, formData: FormData){
    
    try {
        const response = Axios.put(`/legal_docs/update/${token}/${documentId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return Promise.resolve((await response).data)
    } catch (error) {
        return Promise.reject(error)
    } 
  }
  async createLegalDoc(patientId: number, 
      token: string, formData: FormData){
      
      try {
          const response = await Axios.post(`/legal_docs/create/${patientId}/${token}/`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          return Promise.resolve(response.data)
      } catch (error) {
          return Promise.reject(error)
      }
  }
  async deleteLegalDoc(documentId: number, 
      token: string){
      try {
          const response = await Axios.delete(`/legal_docs/delete/${token}/${documentId}/`)
          return Promise.resolve(response.data)
      } catch (error) {
          return Promise.resolve(error)
      }
  }

  /**
   * Lab
   */
  async getLabs(patientId: number, token: string)
   {
       try {
           const response = await Axios.get(`/lab/get/${patientId}/${token}/`)
           return Promise.resolve<ILab[]>(response.data.lab_results_list)
       } catch (error) {
           return Promise.reject(error)
       }
  }
  async createLab(token: string, patientId: string, data: FormData){
    try {
        const response = await Axios.post(`/lab/create/${patientId}/${token}/`, data)
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
  }  
  async updateLab(labId: number, token: string, data: FormData){
      try {
          const response = await Axios.put(`/lab/update/${token}/${labId}/`, data, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          return Promise.resolve(response.data)
      } catch (error) {
          return Promise.reject(error)
      }
  }
  async deleteLab(labId: number, token: string){
    try {
        const response = await Axios.delete(`/lab/delete/${token}/${labId}/`)
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error)
    }
  } 
  private searchTokenSource?: CancelTokenSource;

  async searchLoincCodes(token: string, searchTerm: string){
      if(this.searchTokenSource != null){
          this.searchTokenSource.cancel("Request was cancelled due to the new request")
      }
      this.searchTokenSource = Axios.CancelToken.source()

      try {
          const response = Axios.get(`/loinc_codes/get/${token}/${searchTerm}/`, {
              cancelToken: this.searchTokenSource.token
          })
          return Promise.resolve<ILabInstitute[]>((await response).data.labs)
      } catch (error) {
          if(Axios.isCancel(error))
              return Promise.reject(false)
          return Promise.reject(error)
      }
  }

}

export default new PatientDataApi()