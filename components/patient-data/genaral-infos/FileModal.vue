<template>
  <b-modal centered  hide-header hide-footer  body-class="x-modal" id="gi-file-modal">
      <header class="x-modal__header">
        <span class="title">Update <span>{{field.name | formatName}}</span></span>
      </header>
      <main>
        <ValidationObserver >
          <form @submit.prevent id="gi-file-form">
            <ValidationProvider v-slot='{errors}' rules='required'>
              <div class="form-group">
                <label :for="field.name">{{formatName(field.name)}}</label>
                <input type="file" :name="field.name" :id="field.name" @change="onChanged($event)"
                  class="form-control"
                />
              </div>
              <p v-if="errors.length > 0" class="error-text fs-6 d-flex align-items-center">
                <i class="bi bi-exclamation-square-fill"></i>
                <span class="ml-1">{{errors[0]}}</span>
              </p>
            </ValidationProvider>
            <footer class="x-modal__footer">
              <button @click="onUpdate" :disabled="file == null" class="btn btn-action main-action">Update</button>
              <button type="reset" @click="$bvModal.hide('gi-file-modal')" class="btn btn-action">Cancel</button>
            </footer>
          </form>
        </ValidationObserver>
      </main>
      
      
    </b-modal>
</template>
<script lang="ts">
import { Component, Prop, Watch } from 'nuxt-property-decorator';
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
export default class GIFileModal extends Vue{
  @Prop({default: {name: '', value: ''}}) field!: {name: string, value: string} 

  // Data
  innerField: {name: string, value: string} = {name: '', value: ''}
  file = null

  @Watch('field')
  onFieldChanged(f: {name: string, value: string} ){
    this.innerField = Object.assign({}, f)
  }

  async onUpdate(){
    const form = document.querySelector('#gi-file-form')
    //@ts-ignore
    const filename = `https://storage.googleapis.com/sincere-signal-267510.appspot.com/ebmnet/photos/${this.file?.name}`
    //@ts-ignore
    this.$emit('update', Object.assign({}, this.innerField, {value: filename, data: new FormData(form)}))
    //@ts-ignore
    this.$bvModal.hide('gi-file-modal')
  }

  onChanged(e: any){
    this.file = e.target.files[0]
  }
  formatName(value: string){
    if(!value) return '';
    const res = value.split('_').join(" ")
    return res[0].toUpperCase() + res.substring(1, res.length)
  }
}
</script>