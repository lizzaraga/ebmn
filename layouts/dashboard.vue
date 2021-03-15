<template>
  <div id="dashboard">
    <nav id="h-navbar" class="d-flex justify-content-between align-items-center">
      <div id="dashboard-logo">
        <img width="35px" src="@/assets/svgs/logo.svg"/>
      </div>
    </nav>
    <nav id="v-navbar">
      <clerk-navbar-menu v-if="user.job == 'clerk'"/>
      <hp-navbar-menu v-if="user.job == 'doctor'"/>
      <manager-navbar-menu v-if="user.job == 'manager'"/>
      <patient-navbar-menu v-if="user.job == 'patient'"/>
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
import { getModule } from 'vuex-module-decorators';
import { IUser } from '~/api/models/auth.model';
import ClerkNavbarMenuVue from '~/components/navbar-menu/ClerkNavbarMenu.vue';
import HpNavbarMenuVue from '~/components/navbar-menu/HpNavbarMenu.vue';
import ManagerNavbarMenuVue from '~/components/navbar-menu/ManagerNavbarMenu.vue';
import PatientNavbarMenuVue from '~/components/navbar-menu/PatientNavbarMenu.vue';
import AuthStore from '~/store/auth-store';
@Component({
  middleware: ['auth.mid'],
  components:{
    clerkNavbarMenu: ClerkNavbarMenuVue,
    hpNavbarMenu: HpNavbarMenuVue,
    managerNavbarMenu: ManagerNavbarMenuVue,
    patientNavbarMenu: PatientNavbarMenuVue,
  }
})
export default class Dashboard extends Vue{

  private authStore = getModule(AuthStore, this.$store)
  user?: IUser

  
  public get userInitial() : string {
    return this.user?.username != undefined ? this.user.username!![0].toUpperCase() : ""
  }
  
  constructor(){
    super()
    this.user = this.authStore.user
  }


}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/base/_variables.scss';

#h-navbar{
  height: $navbar-thickness;
  width: 100%;
  position: fixed;
  background-color: white;
  box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.05);
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
  position: fixed;
  background-color: #fff;
  box-shadow: 2px 0 4px rgba($color: #000000, $alpha: 0.05);
  z-index: $navbar-zindex - 1;
  padding-top: $navbar-thickness * 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &>#user-bloc{
    width: 100%;
    height: $navbar-v-thickness + 10px;
    border-top: 1px solid #eee;
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
      background-color: black;
      color: #fff;
      border-radius: 50%;
      font-size: 0.8rem;
      font-weight: 600;
    }
    &>.text{
      margin-top: 2px;
      font-size: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      width:  $navbar-v-thickness - 10px;
    }
  }
}

main{
  padding-top: $navbar-thickness;
  padding-left: $navbar-v-thickness;
  position: relative;
  z-index: 0;
}
</style>