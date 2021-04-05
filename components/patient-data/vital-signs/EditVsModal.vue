<template>
  <b-modal size="lg" hide-header hide-footer  body-class="x-modal" id="edit-vs-modal">
    <header class="x-modal__header">
      <span class="title">Edit Vital signs</span>
    </header>
    <main>
      <ValidationObserver>
        <form @submit.prevent="doStartEdit" id="edit-vs-form">
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Height" label-for="height">
                  <b-input type="number" name="height" id="height"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Weight" label-for="weight">
                  <b-input type="number" name="weight" id="weight"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Body mass index" label-for="body_mass_index">
                  <b-input type="number" name="body_mass_index" id="body_mass_index"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Waist circumference" label-for="waist_circumference">
                  <b-input type="number" name="waist_circumference" id="waist_circumference"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Head circumference" label-for="head_circumference">
                  <b-input type="number" name="head_circumference" id="head_circumference"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Temperature" label-for="temperature">
                  <b-input type="number" name="temperature" id="temperature"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Pulse" label-for="pulse">
                  <b-input type="number" name="pulse" id="pulse"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Respiratory rate" label-for="respiratory_rate">
                  <b-input type="number" name="respiratory_rate" id="respiratory_rate"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Pain scale" label-for="pain_scale">
                  <b-input type="number" name="pain_scale" id="pain_scale"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Pregnancy month" label-for="pregnancy_month">
                  <b-input  name="pregnancy_month" id="pregnancy_month"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Muac" label-for="muac">
                  <b-input  name="muac" id="muac"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Oxygen flow rate" label-for="oxygen_flow_rate">
                  <b-input  name="oxygen_flow_rate" id="oxygen_flow_rate"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Systolic bp" label-for="systolic_bp">
                  <b-input  name="systolic_bp" id="systolic_bp"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider>
                <b-form-group label="Diastolic bp" label-for="diastolic_bp">
                  <b-input  name="diastolic_bp" id="diastolic_bp"></b-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          
        </form>
        <footer class="x-modal__footer">
          <button class="btn btn-action" @click="$bvModal.hide('edit-vs-modal')">Cancel</button>
          <button @click="doStartEdit" class="btn btn-action">Edit</button>
        </footer>
      </ValidationObserver>
    </main>
  </b-modal>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { IVitalSigns } from '~/api/models/patient-data.model';
import {ValidationObserver, ValidationProvider} from 'vee-validate'
@Component({
  components:{
    ValidationObserver,
    ValidationProvider,
  }
})
export default class EditVsModal extends Vue{

  model: IVitalSigns =  {
    height: '',
    weight: '',
    body_mass_index: '',
    waist_circumference: '',
    head_circumference: '',
    temperature: '',
    pulse: '',
    respiratory_rate: '',
    pain_scale: '',
    pregnancy_month: '',
    muac: '',
    oxygen_flow_rate: '',
    systolic_bp: '',
    diastolic_bp: '',
    
  }


  doStartEdit(){
    const form = document.querySelector('#edit-vs-form')
    //@ts-ignore
    const formData = new FormData(form)
    Object.keys(this.model).forEach((key) => {
      if(formData.get(key) == null || formData.get(key)?.toString().trim() == "")
        formData.set(key, "-")
    })
    formData.set('date_of_update', (new Date()).toISOString())
    this.$emit('edit', formData)
  }
}
</script>