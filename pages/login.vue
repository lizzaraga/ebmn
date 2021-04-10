<template>
  
  <!-- <div class="bg-primary-dark h-screen overflow-x-hidden">
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
  </div> -->
  <div class="h-screen" style="overflow-y: auto; background-color: #fafafa">
    <section id="auth-section">
      <div class="container h-100">
        <b-row class="h-100" >
          <b-col cols="3" class="h-100 d-flex align-items-center">
            <h4 class="text-white" style="font-weight: 600">
              Connect, share and react with people in your life.
            </h4>
          </b-col>
          <b-col cols="4">

          </b-col>
          <b-col cols="5">
            <transition name="scale50" appear>
              <div class="form-box shadow position-relative">
                <div class="loader-backdrop" v-show="isLogin">
                  <span class="loader"></span>
                </div>
                <h4 style="font-weight: 700">Welcome back !</h4>
                <span class="text-muted" style="font-size: 0.9rem">Log in to continue.</span>
                <ValidationObserver v-slot="{invalid}">
                  <form @submit.prevent="doLogin" class="x-auth-form">
                    <ValidationProvider v-slot='{errors}' rules='required|email'>
                      <div class="form-group">
                        <label for="email">E-mail</label>
                        <div class="with-icon">
                          <i class="icon bi bi-envelope"></i>
                          <input v-model="loginVM.email" type="email" placeholder="Your email" class="form-control">
                        </div>
                        <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                          <i class="bi bi-exclamation-square-fill"></i>
                          <span class="ml-1">{{errors[0]}}</span>
                        </p>
                      </div>
                    </ValidationProvider >
                    <ValidationProvider v-slot='{errors}' rules='required'>
                      <div class="form-group">
                        <label for="password">Password</label>
                        <div class="with-icon">
                          <input v-model="loginVM.password" :type="`${showPwd ? 'text': 'password'}`" placeholder="Your password" class="form-control">
                          <i @click="showPwd = !showPwd"  :class="`icon bi ${showPwd ? 'bi-eye-slash': 'bi-eye'}`"></i>
                          
                        </div>
                        <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                          <i class="bi bi-exclamation-square-fill"></i>
                          <span class="ml-1">{{errors[0]}}</span>
                        </p>
                      </div>
                    </ValidationProvider>
                    <button  :disabled="invalid" type="submit">Log In</button>
                    <p class="text-center mt-4" style="font-size: 0.8rem; color: #666">
                      Don't have an account ? <nuxt-link to="/register">Register</nuxt-link>
                    </p>
                  </form>
                </ValidationObserver>
              </div>
            </transition>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component, } from 'vue-property-decorator'
import {ILogin, IUser} from 'api/models/auth.model'
import {getModule} from 'vuex-module-decorators'
import AuthStore from '@/store/auth-store'
import hospitalApi from '~/api/hospital.api'
import IdStore from '@/store/patient-data/id-store'
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
  showPwd = false

  async doLogin(){
    this.isLogin = true
    await this.authStore.login(this.loginVM)
    
    const user: IUser = this.authStore.user
    if(user.job == 'health_personnel'){
      const idStore = getModule(IdStore, this.$store)
      idStore.setPatientId(user.id!!)
    }
    
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
        case 'health_personnel':
          this.$router.push({name: 'hp'})
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
<style lang="scss">
#auth-section{
  height: 300px;
  background: linear-gradient(190deg, #0E9FEE, #0571ca);

  .form-box{
    background-color: #fff;
    min-height: 400px;
    max-height: 560px;
    overflow: auto;
    margin-top: 3rem;
    border-radius: 8px;
    padding: 2rem 1rem
  }
}
.x-auth-form{
  margin-top: 3rem;
  .form-group{
    
    input{
      padding: 0;
      padding: 0 10px;
      height: 45px;
      background-color: #F0F0F0;
    }
    &>.with-icon{
      position: relative;
      input{
        padding-right: 60px;
      }
      .icon{
        height: 45px;
        width: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 1.1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.4s ease;
        background-color: #e7e5e5;
        &:hover{
          background-color: rgb(219, 219, 219);
        }
      }
    }
  }
  button{
    margin-top: 2rem;
    border: none;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #0E9FEE;
    color:whitesmoke;
    font-size: 0.8rem;
    border-radius: 5px;
    font-weight: 700;

    &:disabled{
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
