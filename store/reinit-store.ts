import { Module, VuexAction, VuexModule } from "nuxt-property-decorator";

@Module({
  name: 'reinit-store',
  namespaced: true,
  stateFactory: true
})
export default class ReinitStore extends VuexModule{

  @VuexAction
  reinit(){

    // Root stores

    //@ts-ignore
    this.store.commit('admin-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('auth-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('clerk-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('hospital-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('manager-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-store/RESET_STORE')
    // End root stores

    //@ts-ignore
    this.store.commit('patient-data/allergy-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/as-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/ekg-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/gi-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/id-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/id-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/lab-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/ld-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/medication-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/problem-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/radiology-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/surgery-store/RESET_STORE')
    //@ts-ignore
    this.store.commit('patient-data/vs-store/RESET_STORE')

    
    
  }
}