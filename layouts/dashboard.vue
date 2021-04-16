<template>
  <div id="dashboard" style="height: 100vh; overflow: hidden">
    <nav  id="h-navbar" class="d-flex justify-content-between align-items-center">
      <div id="dashboard-logo">
        <img width="35px" src="@/assets/svgs/logo-black.svg"/>
      </div>
      
      <div class="d-flex align-items-center flex-row-reverse">
        <nuxt-link class="mr-4" style="font-size: 0.9rem" to="/login">
          <div class="d-flex align-items-center">
            <span>Log out</span>
          </div>
        </nuxt-link>
        <form id="search-patient-id-form" v-if="patientId != -1" @submit.prevent="onSearchPatientId">
          <div class="form-group search" style="margin:0; margin-right: 0.8rem;">
            <!-- <input @blur="onSearchbarBlur" name="user_id"  v-model="patientCode"  :class='{"expand": expandSearchBar}' placeholder="Type patient code" type="text" class="form-control">
            <i @click="onSearchIconClick" class="bi bi-search search-icon"></i> -->
            <i @click="onSearchIconClick" class="bi bi-search search-icon"></i>
            <input type="text" name="user_id" placeholder="Search patient by code"  v-model="patientCode">
          </div>
        </form>
      </div>
    </nav>
    <nav id="v-navbar">
      <clerk-navbar-menu v-if="user.job == 'clerk'"/>
      <hp-navbar-menu v-if="user.job == 'health_personnel'"/>
      <manager-navbar-menu v-if="user.job == 'manager'"/>
      <patient-navbar-menu v-if="user.job == 'patient'"/>
      <admin-navbar-menu v-if="user.job == 'admin'"/>
      <div id="user-bloc">
        <span class="icon">{{userInitial}}</span>
        <span class="text">{{user.username}}</span>
      </div>
    </nav>
    <main>
      <nuxt-child/>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { IUser } from '~/api/models/auth.model';
import { IPatient } from '~/api/models/patient-data.model';
import patientDataApi from '~/api/patient-data.api';
import AdminNavbarMenuVue from '~/components/navbar-menu/AdminNavbarMenu.vue';
import ClerkNavbarMenuVue from '~/components/navbar-menu/ClerkNavbarMenu.vue';
import HpNavbarMenuVue from '~/components/navbar-menu/HpNavbarMenu.vue';
import ManagerNavbarMenuVue from '~/components/navbar-menu/ManagerNavbarMenu.vue';
import PatientNavbarMenuVue from '~/components/navbar-menu/PatientNavbarMenu.vue';
import AuthStore from '~/store/auth-store';
import IdStore from '~/store/patient-data/id-store';
@Component({
  middleware: ['auth.mid'],
  components:{
    clerkNavbarMenu: ClerkNavbarMenuVue,
    hpNavbarMenu: HpNavbarMenuVue,
    managerNavbarMenu: ManagerNavbarMenuVue,
    patientNavbarMenu: PatientNavbarMenuVue,
    adminNavbarMenu: AdminNavbarMenuVue
  }
})
export default class Dashboard extends Vue{

  private authStore = getModule(AuthStore, this.$store)
  private idStore = getModule(IdStore, this.$store)
  user?: IUser
  expandSearchBar = false

  patientCode =  ""
  
  public get userInitial() : string {
    return this.user?.username != undefined ? this.user.username!![0].toUpperCase() : ""
  }

  get patientId(){
    return this.idStore.patientId
  }

  
  
  constructor(){
    super()
    this.user = this.authStore.user
  }

  onSearchIconClick(){
    //@ts-ignore
    document.querySelector('.form-group.search > input').focus()
    this.expandSearchBar = true
  }
  onSearchbarBlur(){
    if(this.patientCode.trim() == "")
      this.expandSearchBar = false
  }
  async onSearchPatientId(){
    try {
      const form = document.querySelector('#search-patient-id-form')
      //@ts-ignore
      const formData = new FormData(form)
      const patientId = await patientDataApi.searchPatientId(this.authStore.token, formData)
      if(patientId == undefined){
        alert("No patient found for this code !")
      }
      else {
        this.$router.push({name: 'hp-patients-id', params: { id: patientId.toString()},
          hash: this.$route.hash})
          this.idStore.setPatientId(patientId)
      }
      
      
    } catch (error) {
      alert("An error occurred during the patient search")
    }
  }


}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/base/_variables.scss';

#h-navbar{
  height: $navbar-thickness;
  width: 100%;
  position: fixed;
  //border-bottom: 1px solid #eee;
  background-color: white; //$primary-dark-color;
  //box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.05);
  box-shadow: 0px 4px 12px rgba($color: #000000, $alpha: 0.05);
  z-index: $navbar-zindex;

  &>#dashboard-logo{
    width: $navbar-v-thickness;
    height: $navbar-v-thickness;
    line-height: $navbar-v-thickness;
    text-align: center;
  }
}
#v-navbar{
  width: $navbar-v-thickness;
  height: 100%;
  left: 0;
  //border-right: 1px solid #eee;
  position: fixed;
  background-color: white;
  //box-shadow: 2px 0 4px rgba($color: #000000, $alpha: 0.05);
  box-shadow: 4px 0 12px rgba($color: #000000, $alpha: 0.05);
  z-index: $navbar-zindex - 1;
  padding-top: $navbar-thickness * 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &>#user-bloc{
    width: 100%;
    height: $navbar-v-thickness + 10px;
    //border-top: 2px solid $primary-dark-color;
    background-color: #EEF1F3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &>.icon{
      width: $navbar-v-thickness / 2.5;
      height: $navbar-v-thickness / 2.5;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #CCD8F0;
      color: #8CB2EA;
      border-radius: 50%;
      font-size: 0.8rem;
      font-weight: 600;
    }
    &>.text{
      margin-top: 5px;
      font-size: 0.7rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: center;
      color: #164791;
      width:  $navbar-v-thickness - 10px;
    }
  }
}

main{
  //padding-top: $navbar-thickness;
  padding-left: $navbar-v-thickness;
  position: relative;
  z-index: 0;
  height: 100vh;
  overflow: hidden;
  
}

.form-group.search{
  background-color: transparent;
  position: relative;
  background-color: #f5f5f5;
  overflow: hidden;
  height: 40px;
  border-radius: 20px;
  input{
    width: 100%;
    padding-left: 40px;
    border: none;
    background-color: #fff0;
    height: 100%;
    width: 250px;
    font-size: 0.8rem;
    outline: none;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    
    &:focus{
      outline: none;
    }
    &::placeholder{
      
      font-size: 0.8rem;
      
    }
  }
  .search-icon{
    cursor: pointer;
    color: #666;
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  .searchbar-results{
    position: absolute;
    left: 0;
    right: 0;
    
    background-color: $primary-dark-color;
    border-radius: 8px;
    margin-top: 0.6rem;
    box-shadow: 0 4px 20px rgba($color: #000000, $alpha: 0.2);
    color: #C2DEFF;

    header{
      padding: 0 0.8rem;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
    }
    section{
      padding: 0.8rem 0;
      min-height: 40px;
      max-height: 200px;
      overflow: auto;
      &>.results{
        display: flex;
        flex-direction: column;
        &>.results-item{
          cursor: pointer;
          height: 40px;
          line-height: 40px;
          padding: 0 0.8rem;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba($color: #C2DEFF, $alpha: .75);

          &:hover{
            color: #C2DEFF;
            background-color: rgba($color: #C2DEFF, $alpha: 0.1);
          }
        }
      }
    }
  }
}
</style>