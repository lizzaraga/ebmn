<template>
  <!-- <div>
    <div class="row mx-auto container d-flex justify-content-center">
      <form method="post" @submit.prevent="doLogin" class="position-relative col-5 auth-form">
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
  </div> -->
  <div class="bg-primary-dark h-screen overflow-x-hidden">
    <b-row class="h-100">
      <transition name='scale50' appear>
        <b-col cols="5"  class="bg-white m-4 auth-form-layout rounded-lg p-4 grid-row-auto-fill">
          <header class="d-flex justify-content-between align-items-center">
            <span class="title fw-bold">Log in</span>
            <nuxt-link class="x-link" to="/register">Register ?</nuxt-link>
          </header>
          <div class="d-flex flex-column justify-content-center w-100">
            <ValidationObserver v-slot="{invalid}">
              <form class="position-relative auth-form" @submit.prevent="doLogin">
                <div class="loader-backdrop" v-show="isLogin">
                  <span class="loader"></span>
                </div>
                <ValidationProvider v-slot='{errors}' rules="required|email">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="loginVM.email" style="height: 50px" type="email"
                      placeholder="Your email"
                    name="email" id="email" class="form-control">
                    <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                      <i class="bi bi-exclamation-square-fill"></i>
                      <span class="ml-1">{{errors[0]}}</span>
                    </p>
                  </div>
                </ValidationProvider>
                <ValidationProvider v-slot='{errors}' rules="required">
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="loginVM.password" style="height: 50px" type="password" placeholder="Your password"
                    name="password" id="password" class="form-control">
                    <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                      <i class="bi bi-exclamation-square-fill"></i>
                      <span class="ml-1">{{errors[0]}}</span>
                    </p>
                  </div>
                </ValidationProvider> 
                <button type="submit" :disabled="invalid" style="height: 55px; font-size: 0.9rem" class="x-btn x-btn-primary-dark mt-4 w-100">Log in</button>
              </form>
            </ValidationObserver>
          </div>
          <p style="font-size: 0.8rem; color: #444" class="text-center">© 2021. E-base Medical Network App.</p>
        </b-col>
      </transition>
      <b-col class="d-flex align-items-center justify-content-center">
        <div style="max-width: 400px">
          <div class="d-flex align-items-center" style="margin-left: -10px; margin-bottom: 2rem">
            <img width="50" src="@/assets/svgs/logo.svg" alt="">
            <span class="link-color" style="font-size: 0.8rem; font-weight: 700">E-base Medical Network</span>
          </div>
          <h2 class="text-white " style="font-size: 3rem; font-weight: 700">Hi, welcome back !</h2>
          <p style="color: #fffa; font-weight: 300; margin-top: 1.1rem; font-size: 1.2rem">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet qui quisquam, eligendi illum quae libero.
          </p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component, } from 'vue-property-decorator'
import {ILogin, IUser} from 'api/models/auth.model'
import {getModule} from 'vuex-module-decorators'
import AuthStore from '@/store/auth-store'
import hospitalApi from '~/api/hospital.api'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
@Component({
  components:{
    ValidationObserver,
    ValidationProvider
  }
})
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
        case 'manager':
          this.$router.push({name: 'manager'})
          break
        case 'admin':
          this.$router.push({name: 'admin'})
          break
      }
    }

    this.isLogin = false
  }

  mounted(){
    /* this.$toast.info("Info", {duration: 2000, action : {
        text : 'Cancel',
        onClick : (e, toastObject) => {
            toastObject.goAway(0);
        }
    },}) */
  }
}
</script>
