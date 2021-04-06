<template>
  <b-modal centered  hide-header hide-footer  body-class="x-modal" id="gi-number-modal">
      <header class="x-modal__header">
        <span class="title">Update <span>{{field.name | formatName}}</span></span>
      </header>
      <main>
        <ValidationObserver v-slot="{invalid}">
          <form @submit.prevent>
            <ValidationProvider v-slot='{errors}' rules='required'>
              <div class="form-group">
                <label :for="field.name">{{formatName(field.name)}}</label>
                <b-input type="number" class="form-control" v-model='innerField.value' :placeholder="`New ${formatName(field.name)}`"/>
              </div>
              <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                <i class="bi bi-exclamation-square-fill"></i>
                <span class="ml-1">{{errors[0]}}</span>
              </p>
            </ValidationProvider>
            <footer class="x-modal__footer">
              <button @click="onUpdate" :disabled="invalid" class="btn btn-action main-action">Update</button>
              <button type="cancel" @click="$bvModal.hide('gi-number-modal')" class="btn btn-action">Cancel</button>
            </footer>
          </form>
        </ValidationObserver>
      </main>
      

    </b-modal>
</template>
<script lang="ts">
import { Component, getModule, Prop, Watch } from 'nuxt-property-decorator';
import Vue from 'vue'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
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
export default class GINumModal extends Vue{
  @Prop({default: {name: '', value: ''}}) field!: {name: string, value: string} 

  // Data
  innerField: {name: string, value: string} = {name: '', value: ''}

  @Watch('field')
  onFieldChanged(f: {name: string, value: string} ){
    this.innerField = Object.assign({}, f)
  }

  async onUpdate(){
    this.$emit('update', Object.assign({}, this.innerField))
    //@ts-ignore
    this.$bvModal.hide('gi-number-modal')
  }
  formatName(value: string){
    if(!value) return '';
    const res = value.split('_').join(" ")
    return res[0].toUpperCase() + res.substring(1, res.length)
  }
}
</script>