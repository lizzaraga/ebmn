import Axios, {CancelTokenSource}  from 'axios'
import {IAbusiveSubstance, IAllergy, ICptCodeSurgery, IEkg, IGeneralInfo, ILab, ILabInstitute, ILegalDocument, IMedication, IPatient, IProblem, IRadiology, IRxNormLabel, ISurgery, IUpdateGI, IUpdateGIFile, IVitalSigns} from '@/api/models/patient-data.model'
import { IClerkDiagnosis } from './models/clerk.model'

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
    async updateGIField(patientId: number, token: string, request: any){
        try {
        const response = await Axios.put(`/general_info/update/${patientId}/${token}/`, request)
            return Promise.resolve(response.data)
        } catch (error) {
        return Promise.reject(error)
        }
    }
    async updateGIBinaryField(patientId: number, token: string, data: any){
        try {
        await Axios.put(`/general_info/update/${patientId}/${token}/`, data, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        } catch (error) {
        return Promise.reject(error)
        }
    }

    async getPatients(searchTerm: string, token: string){
        try {
            const res = await Axios.get(`/general_patient_list/get/${token}/${searchTerm}`)
            return Promise.resolve<IPatient[]>(res.data.patients)
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
    async createLab(token: string, patientId: number, data: FormData){
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

    /**
     * Radiology
     */
    async getRadiologies(token: string, patientId: number){
        try {
            const response = await Axios.get(`/radiology/get/${patientId}/${token}/`)
            return Promise.resolve<IRadiology[]>(response.data.radiology_results_list)
        } catch (error) {
        return Promise.reject(error)
        }
    }
    async deleteRadiology(token: string, radiologyId: number){
        try {
            const response = await Axios.delete(`/radiology/delete/${token}/${radiologyId}/`)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async updateRadiology(token: string, radiologyId: number, data: FormData){
        try {
            const response = await Axios.put(`/radiology/update/${token}/${radiologyId}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async createRadiology(token: string, patientId: number, data: FormData){
        try {
            const response = await Axios.post(`/radiology/create/${patientId}/${token}/`, data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * Ekg
     */

    async getEkgs(token: string, patientId: number){
        try {
            const response = await Axios.get(`/ekg/get/${patientId}/${token}/`)
            return Promise.resolve<IEkg[]>(response.data.ekg_result_list)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async deleteEkg(token: string, ekgId: number){
        try {
            const response = await Axios.delete(`/ekg/delete/${token}/${ekgId}/`)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async updateEkg(token: string, ekgId: number, data: FormData){
        try {
            const response = await Axios.put(`/ekg/update/${token}/${ekgId}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async createEkg(token: string, patientId: number, data: FormData){
        try {
            const response = await Axios.post(`/ekg/create/${patientId}/${token}/`, data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * Problems
     */
    async getProblems(
        token: string, patientId: number){
        try {
            const response = await Axios.get(`/problems/get/${patientId}/${token}/`)
            return Promise.resolve<Promise<IProblem[]>>(response.data.problem_list)
        } catch (error) {
            return Promise.reject(error)
        }
        
    }
    async updateProblem(
        token: string, problemId: number, formData: FormData){
            try {
                
                const response = await Axios.put(`/problem/update/${token}/${problemId}/`, formData)
                return Promise.resolve(response.data)
            } catch (error) {
                return Promise.reject(error)
            }
        }

    async deleteProblem(problemId: number, token: string){
        try {
            const response = await Axios.delete(`/problem/delete/${token}/${problemId}/`)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async createProblem( token: string,
        patientId: number, data: FormData){
            try {
                const response = await Axios.post(`/problem/create/${patientId}/${token}/`, data)
                return Promise.resolve(response.data)
            } catch (error) {
                return Promise.reject(error)
            }
    }

    private searchDiagnosisTokenSource!: CancelTokenSource
    async searchDiagnosis(token: string, searchTerm: string){
        if(this.searchDiagnosisTokenSource != null){
            this.searchDiagnosisTokenSource.cancel("Request was cancelled due to the new request")
        }
        this.searchDiagnosisTokenSource = Axios.CancelToken.source()
        try {
            const response = await Axios.get(`/icd_codes/get/${token}/${searchTerm}/`, {
                cancelToken: this.searchDiagnosisTokenSource.token
            })
            return Promise.resolve<IClerkDiagnosis[]>(response.data.diagnosis)
        } catch (error) {
            Promise.resolve(error)
        }
    }

    /**
     * Medications
     */
    async getMedications(token: string, patientId: number){
        try {
            const response = Axios.get(`medication/get/${patientId}/${token}/`)
            return Promise.resolve<IMedication[]>((await response).data.medication_list)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async createMedication(token: string, patientId: number, data: FormData){
        try {
            const response = await Axios.post(`/medication/create/${patientId}/${token}/`, data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async deleteMedication(token: string, medicationId: number){
        try {
            const response = await Axios.delete(`/medication/delete/${token}/${medicationId}/`)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async updateMedication(token: string, medicationId: number, data: FormData){
        try {
            const response = await Axios.put(`/medication/update/${token}/${medicationId}/`, data)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    private searchMdFromRxnormTokenSource?: CancelTokenSource;

    async searchMdFromRxService(token: string, searchTerm: string){
        if(this.searchMdFromRxnormTokenSource != null){
            this.searchMdFromRxnormTokenSource.cancel("Request was cancelled due to the new request")
        }
        this.searchMdFromRxnormTokenSource = Axios.CancelToken.source()

        try {
            const response = await Axios.get(`/rxnorm_label/get/${token}/${searchTerm}/`, {
                cancelToken: this.searchMdFromRxnormTokenSource.token
            })
            return Promise.resolve<IRxNormLabel[]>(response.data.medications)
        } catch (error) {
            if(Axios.isCancel(error))
                return Promise.reject(false)
            return Promise.reject(error)
        }
    }

    /**
     * Vital Signs
     */
    async getVitalSigns(token: string, patientId: number){
        try {
            const response =  Axios.get(`/vital_signs/get/${patientId}/${token}/`)
            return Promise.resolve<IVitalSigns>((await response).data.vital_signs[0])
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async updateVitalSigns(token: string, patientId: number, data: IVitalSigns){
        try {
            const response =  Axios.put(`/vital_signs/update/${patientId}/${token}/`, data)
            return Promise.resolve((await response).data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
  
    /**
     * Surgery
     */
    async getSurgeries(token: string, patientId: number){
        try {
            const response = await Axios.get(`/surgery/get/${patientId}/${token}/`)
            return Promise.resolve<ISurgery[]>(response.data.surgery_results_list)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async updateSurgery(token: string, surgeryId: number, data: FormData){
        try {
            const response = await Axios.put(`/surgery/update/${token}/${surgeryId}/`, data)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async deleteSurgery(token: string, surgeryId: number){
        try {
            const response = await Axios.delete(`/surgery/delete/${token}/${surgeryId}/`)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async createSurgery(token: string, patientId: number, data: FormData){
        try {
            const response = await Axios.post(`/surgery/create/${patientId}/${token}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    searchSgFromCptCodeTokenSource!: CancelTokenSource;
    async searchSgFromCptCode(token: string, searchTerm: string){
        if(this.searchSgFromCptCodeTokenSource != null){
            this.searchSgFromCptCodeTokenSource.cancel("Request was cancelled due to the new request")
        }
        this.searchSgFromCptCodeTokenSource = Axios.CancelToken.source()

        try {
            const response = Axios.get(`/cpt_code/get/${token}/${searchTerm}/`, {
                cancelToken: this.searchSgFromCptCodeTokenSource.token
            })
            return Promise.resolve<ICptCodeSurgery[]>((await response).data.surgery_list)
        } catch (error) {
            if(Axios.isCancel(error))
                return Promise.reject(false)
            return Promise.reject(error)
        }
    }

    /**
     * Allergy
     */
    async getAllergies(token: string, patientId: Number){
        try {
            const response = await  Axios.get(`/allergy/get/${patientId}/${token}/`)
            return Promise.resolve<IAllergy[]>(response.data.allergy)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async deleteAllergy(token: string, ekgId: number){
        try {
            const response = await Axios.delete(`/allergy/delete/${token}/${ekgId}/`)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async updateAllergy(token: string, allergyId: number, data: FormData){
        try {
            const response = await Axios.put(`/allergy/update/${token}/${allergyId}/`, data)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async createAllergy(token: string, patientId: number, data: FormData){
        try {
            const response = await Axios.post(`/allergy/create/${patientId}/${token}/`, data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
    private searchAllergyMedicationsTokenSource!: CancelTokenSource;
    async searchAllergyMedicationsService(token: string, searchTerm: string){
        if(this.searchAllergyMedicationsTokenSource != null){
            this.searchAllergyMedicationsTokenSource.cancel("Request was cancelled due to the new request")
        }
        this.searchAllergyMedicationsTokenSource = Axios.CancelToken.source()
    
        try {
            const response = await Axios.get(`/rxnorm_label/get/${token}/${searchTerm}/`, {
                cancelToken: this.searchAllergyMedicationsTokenSource.token
            })
            return Promise.resolve<IRxNormLabel[]>(response.data.medications)
        } catch (error) {
            if(Axios.isCancel(error))
                return Promise.reject(false)
            return Promise.reject(error)
        }
    }

    /**
     * Abusive Substance
     */
    async getAS(token: string, patientId: number){
         try {
             const response = await Axios.get(`/abusive_substance/get/${patientId}/${token}/`)
             return Promise.resolve<IAbusiveSubstance[]>(response.data.abusive_substance)
         } catch (error) {
             return Promise.reject(error)
         }
    }
    async createAS(token: string, patientId: number, data: FormData){
        try {
            const response = await Axios.post(`/abusive_substance/create/${patientId}/${token}/`, data)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
     }
    async updateAS(token: string, asId: number, data: FormData){
        try {
            
            const response = await Axios.put(`/abusive_substance/update/${token}/${asId}/`, data)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async deleteAS(token: string, asId: number){
        try {
            const response = await Axios.delete(`/abusive_substance/delete/${token}/${asId}/`)
            return Promise.resolve(response.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default new PatientDataApi()