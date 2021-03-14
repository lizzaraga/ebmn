<template>
  <div>
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
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component, } from 'vue-property-decorator'
import {IRegister} from 'api/models/auth.model'
import {getModule} from 'vuex-module-decorators'
import AuthStore from '@/store/auth-store'

@Component
export default class Login extends Vue{

  private authStore = getModule(AuthStore, this.$store)
  private isRegister = false
  registerVM: IRegister = {}


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
html,body{
  background-color: #fafafa;
}
</style>
