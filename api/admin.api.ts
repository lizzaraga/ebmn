import Axios from 'axios'
import { IAdminUser, IGuideline } from './models/admin.model'
import { IAdminClerk } from './models/clerk.model'
import { IAdminManager } from './models/manager.model'

class AdminApi{
  // Guidelines
  async getGuidelines(token: string){
    try {
      const response = Axios.get(`/guidelines/get/${token}/`)
      return Promise.resolve<IGuideline[]>((await response).data.guidelines)
    } catch (error) {
        return Promise.reject(error)
    }
  }
  async updateGuideline(token: string, id: Number, data: FormData) {
    try {
        const response = Axios.put(`/guideline/update/${token}/${id}/`, data)
        return Promise.resolve((await response))
      } catch (error) {
          return Promise.reject(error)
      }
  }

  // Managers
  async  getManagers(token: string) {
    try {
        const response = Axios.get(`/managers/get/${token}/`)
        return Promise.resolve<IAdminManager[]>((await response).data.user_is_manager)
      } catch (error) {
          return Promise.reject(error)
      }
  }

  async createManager(token: string, data: FormData) {
      try {
          const response = Axios.post(`/manager/create/${token}/`, data)
          return Promise.resolve((await response))
      } catch (error) {
          return Promise.reject(error)
      }
  }

  async deleteManager(token: string, managerId: Number) {
      try {
          const response = Axios.delete(`/manager/delete/${token}/${managerId}/`)
          return Promise.resolve((await response))
      } catch (error) {
          return Promise.reject(error)
      }
  }

  async getUsers(token: string){
    try {
        const response = await Axios.get(`/users/get/${token}/`)
        return Promise.resolve<IAdminUser[]>(response.data.users)
    } catch (error) {
        return Promise.reject(error)
    }
}

  // Clerks
  async getClerks(token: string) {
    try {
        const response = Axios.get(`/clerks/get/${token}/`)
        return Promise.resolve<IAdminClerk[]>((await response).data.user_is_clerk)
      } catch (error) {
          return Promise.reject(error)
      }
  }

  async createClerk(token: string, data: FormData) {
      try {
          const response = Axios.post(`/clerk/create/${token}/`, data)
          return Promise.resolve((await response))
      } catch (error) {
          return Promise.reject(error)
      }
  }

  async deleteClerk(token: string, clerkId: Number) {
      try {
          const response = Axios.delete(`/clerk/delete/${token}/${clerkId}/`)
          return Promise.resolve((await response))
      } catch (error) {
          return Promise.reject(error)
      }
  }
}

export default new AdminApi()