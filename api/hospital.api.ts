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
  

}

export default new HospitalApi()