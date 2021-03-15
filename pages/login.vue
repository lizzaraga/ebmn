<template>
  <div>
    <div class="row mx-auto container d-flex justify-content-center">
      <form @submit.prevent="doLogin" class="position-relative col-5 auth-form">
        <header>
          <span class="title">Log In</span>
          <nuxt-link to="/register">Register ?</nuxt-link>
        </header>
        <div class="loader-backdrop" v-show="isLogin">
          <span class="loader"></span>
        </div>
        <div class="entries">
          <div class="form-group">
            <label for="">Email</label>
            <input placeholder="Your email" class="form-control" type="email" name="email" id="email" v-model="loginVM.email">
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input placeholder="Your password" class="form-control" type="password" name="password" id="password" v-model="loginVM.password">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Log In</button>
      </form>
     
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component, } from 'vue-property-decorator'
import {ILogin, IUser} from 'api/models/auth.model'
import {getModule} from 'vuex-module-decorators'
import AuthStore from '@/store/auth-store'
import hospitalApi from '~/api/hospital.api'

@Component
export default class Login extends Vue{

  private authStore = getModule(AuthStore, this.$store)
  private isLogin = false
  loginVM: ILogin = {}


  async doLogin(){
    this.isLogin = true
    await this.authStore.login(this.loginVM)
    
    const user: IUser = this.authStore.user
    if(user.token){
      switch(user.job){
        case 'patient':
          this.$router.push({name: 'patient'})
          break
        case 'clerk':
          
          this.$router.push({name: 'clerk'})
          break
      }
    }

    this.isLogin = false
  }

  mounted(){
    
  }
}
</script>
