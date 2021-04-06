<template>
  <!-- <div>
    <div class="row mx-auto container d-flex justify-content-center">
      <form @submit.prevent="doRegister" class="position-relative col-6 auth-form">
        <header>
          <span class="title">Register</span>
          <nuxt-link to="/login">Log in</nuxt-link>
        </header>
        <div class="loader-backdrop" v-show="isRegister">
          <span class="loader"></span>
        </div>
        <div class="entries">
          <div class="row">
            <div class="form-group col-6">
              <label for="username">Username</label>
              <input type="text" name="username" placeholder="Your username" id="username" class="form-control">
            </div>
            <div class="form-group col-6">
              <label for="">Email</label>
              <input class="form-control" type="email" name="email" placeholder="Your email" id="email" v-model="registerVM.email">
            </div>
          </div>
          <div class="row">
            <div class="form-group col-6">
              <label for="phone_number">Phone number</label>
              <input class="form-control" type="tel" name="phone_number" placeholder="Your phone number" id="phone_number">
            </div>
            <div class="form-group col-6">
              <label for="">Password</label>
              <input class="form-control" type="password" name="password" placeholder="Your password" id="password" v-model="registerVM.password">
            </div>
          </div>
          <div class="row">
            <div class="form-group col-6">
              <label for="pwd_confirm">Password confirmation</label>
              <input type="password" name="pwd_confirm" id="pwd_confirm" placeholder="Confirm your password" class="form-control">
            </div>
          </div>
        </div>
        
        <button type="submit" class="btn btn-danger">Register</button>
      </form>
    </div>
  </div> -->
  <div class="bg-primary-dark h-screen overflow-x-hidden">
    <b-row class="h-100">
      <transition name="scale50" appear>
        <b-col cols="5"  class="bg-white m-4 auth-form-layout rounded-lg p-4 grid-row-auto-fill">
          <header class="d-flex justify-content-between align-items-center">
            <span class="title fw-bold">Registration</span>
            <nuxt-link class="x-link" to="/login">Log in ?</nuxt-link>
          </header>
          <div class="d-flex flex-column justify-content-center w-100">
            <ValidationObserver v-slot="{invalid}">
              <form class="position-relative auth-form" @submit.prevent="doRegister">
                <div class="loader-backdrop" v-show="isRegister">
                  <span class="loader"></span>
                </div>
                <b-row>
                  <b-col>
                    <ValidationProvider v-slot='{errors}' rules='required'>
                      <div class="form-group">
                        <label for="username">Username</label>
                        <input style="height: 45px" v-model="registerVM.username" type="text" name="username" 
                        placeholder="Your username" id="username" class="form-control">
                        <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                          <i class="bi bi-exclamation-square-fill"></i>
                          <span class="ml-1">{{errors[0]}}</span>
                        </p>
                      </div>
                    </ValidationProvider>
                  </b-col>
                  <b-col>
                    <ValidationProvider v-slot='{errors}' rules='required|email'>
                      <div class="form-group">
                        <label for="">Email</label>
                        <input style="height: 45px" class="form-control" type="email" name="email" 
                        placeholder="Your email" id="email" v-model="registerVM.email">
                        <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                          <i class="bi bi-exclamation-square-fill"></i>
                          <span class="ml-1">{{errors[0]}}</span>
                        </p>
                      </div>
                    </ValidationProvider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <ValidationProvider v-slot='{errors}' rules='required'>
                      <div class="form-group">
                        <label for="phone_number">Phone number</label>
                        <input style="height: 45px" v-model="registerVM.phone_number" class="form-control" type="tel" name="phone_number" 
                        placeholder="Your phone number" id="phone_number">
                        <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                          <i class="bi bi-exclamation-square-fill"></i>
                          <span class="ml-1">{{errors[0]}}</span>
                        </p>
                      </div>
                    </ValidationProvider>
                  </b-col>
                  <b-col>
                    <ValidationProvider v-slot='{errors}' rules='required'>
                      <div class="form-group">
                        <label for="">Password</label>
                        <input style="height: 45px" class="form-control" type="password" name="password" placeholder="Your password"
                        id="password" v-model="registerVM.password">
                        <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                          <i class="bi bi-exclamation-square-fill"></i>
                          <span class="ml-1">{{errors[0]}}</span>
                        </p>
                      </div>
                    </ValidationProvider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <ValidationProvider v-slot='{errors}' :rules='"required|samePwd:"+registerVM.password'>
                      <div class="form-group">
                          <label for="">Confirm password</label>
                        <div>
                            <input style="height: 45px" class="form-control" type="password" name="password" placeholder="Confirm your password"
                          id="password" v-model="cpwd">
                        </div>
                        <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                          <i class="bi bi-exclamation-square-fill"></i>
                          <span class="ml-1">{{errors[0]}}</span>
                        </p>
                      </div>
                    </ValidationProvider>
                  </b-col>
                </b-row>
                <button type="submit" :disabled="invalid" style="height: 55px; font-size: 0.9rem" class="x-btn x-btn-primary-dark mt-4 w-100">Register</button>
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
          <h2 class="text-white" style="font-size: 3rem; font-weight: 700">Hi, welcome back !</h2>
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
import {IRegister} from 'api/models/auth.model'
import {getModule} from 'vuex-module-decorators'
import AuthStore from '@/store/auth-store'
import {ValidationProvider, ValidationObserver} from 'vee-validate'

@Component({
  components:{
    ValidationObserver, ValidationProvider
  }
})
export default class Login extends Vue{

  private authStore = getModule(AuthStore, this.$store)
  private isRegister = false
  registerVM: IRegister = {}
  cpwd = ""


  async doRegister(){
    this.isRegister = true
    await this.authStore.register(this.registerVM)
    this.isRegister = false
  }

  mounted(){
    
  }
}
</script>
<style lang="scss" >

