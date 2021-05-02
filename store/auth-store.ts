import { Module, VuexAction, VuexModule, VuexMutation } from "nuxt-property-decorator"
import authApi from "~/api/auth.api"
import { ILogin, IRegister, IUser } from "~/api/models/auth.model"

@Module({
  name: "auth-store",
  namespaced: true,
  stateFactory: true
})
export default class AuthStore extends VuexModule{

  user: IUser = {}

  
  public get token() : string {
    return this.user.token!!
  }

  
  public get patientId () : number {
    return this.user.id!!
  }
  
  

  @VuexMutation
  setUser(user: IUser){
    this.user = user
  }
  @VuexMutation
  RESET_STORE(){
    this.user = {}
  }
  
  @VuexAction({rawError: true})
  async login(loginForm: ILogin){
    try {
      const user = await authApi.login(loginForm)
      this.context.commit('setUser', user)
      
      
    } catch (error) {
      alert("Login failed")
    }
  }
  @VuexAction({rawError: true})
  async register(registerForm: IRegister){
    try {
      await authApi.register(registerForm)
    } catch (error) {
      alert("Registration failed")
    }
  }
}