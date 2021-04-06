<template>
  <b-modal centered  hide-header hide-footer  body-class="x-modal" id="gi-select-modal">
      <header class="x-modal__header">
        <span class="title">Update <span>{{field.name | formatName}}</span></span>
      </header>
      <main>
        <ValidationObserver v-slot="{invalid}">
          <form @submit.prevent>
            <ValidationProvider v-slot='{errors}' rules='required'>
              <div class="form-group">
                <b-form-group :label="formatName(field.name)"> 
                  <b-form-select :options="options" v-model='innerField.value' :placeholder="`New ${formatName(field.name)}`">
                  </b-form-select>
                </b-form-group>
              </div>
              <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                <i class="bi bi-exclamation-square-fill"></i>
                <span class="ml-1">{{errors[0]}}</span>
              </p>
            </ValidationProvider>
            <footer class="x-modal__footer">
              <button @click="onUpdate" :disabled="invalid" class="btn btn-action main-action">Update</button>
              <button type="cancel" @click="$bvModal.hide('gi-select-modal')" class="btn btn-action">Cancel</button>
            </footer>
          </form>
        </ValidationObserver>
      </main>

    </b-modal>
</template>
<script lang="ts">
import { Component, getModule, Prop, Watch } from 'nuxt-property-decorator';
import Vue from 'vue'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
@Component({
  components:{
    ValidationObserver, ValidationProvider
  },
  filters:{
    formatName(value: string){
      if(!value) return '';
      const res = value.split('_').join(" ")
      return res[0].toUpperCase() + res.substring(1, res.length)
    }
  }
})
export default class GISelectModal extends Vue{
  @Prop({default: {name: '', value: ''}}) field!: {name: string, value: string} 

  // Data
  innerField: {name: string, value: string, values: []} = {name: '', value: '', values: []}

  
  public get options() {
    if(this.innerField.values == undefined) return []
    console.log('options: ', this.innerField.values)
    return this.innerField.values.map(e => {
      return {
        text: e,
        value: e
      }
    })
  }
  

  @Watch('field')
  onFieldChanged(f: {name: string, value: string, values: []} ){
    this.innerField = Object.assign({}, f)
  }

  async onUpdate(){
    this.$emit('update', Object.assign({}, this.innerField))
    //@ts-ignore
    this.$bvModal.hide('gi-select-modal')
  }
  formatName(value: string){
    if(!value) return '';
    const res = value.split('_').join(" ")
    return res[0].toUpperCase() + res.substring(1, res.length)
  }
}
</script>