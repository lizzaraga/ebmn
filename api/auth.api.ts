import Axios, {AxiosResponse} from 'axios'
import { ILogin, IRegister, IUser } from './models/auth.model'




class AuthApi{

  async login(login: ILogin): Promise<IUser>{
    try {
      // Get user info
      const res = await Axios.post('/login/', login)
      console.log(AuthApi.name+ ': ',res)
      const user = res.data
      // Get user jobs
      const request = await Axios.get(`/job/${user.token}/`)
      const {job, patient_id} = request.data
      // Add job key tu user data
      user.job = job
      user.patient_id = patient_id
      // Converts response to IUser and return it
      return Promise.resolve<IUser>(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async register(register: IRegister): Promise<AxiosResponse<any>>{
    try {
      const res = await Axios.post('/register/', register)
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }

}

export default new AuthApi();