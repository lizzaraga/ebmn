import { VuexAction, VuexMutation } from "nuxt-property-decorator";
import { Module, VuexModule } from "vuex-module-decorators";
import { IHospital } from "~/api/models/hospital.model";

@Module({
  name: "hospital-store",
  namespaced: true,
  stateFactory: true
})
export default class HospitalStore extends VuexModule{
  
  
}