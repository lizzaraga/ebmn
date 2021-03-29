<template>
  <b-modal centered  hide-header hide-footer  body-class="x-modal" id="gi-select-modal">
      <header class="x-modal__header">
        <span class="title">Update <span>{{field.name | formatName}}</span></span>
      </header>
      <main>
        
        <form>
          <b-form-group :label="formatName(field.name)"> 
            <b-form-select :options="options" v-model='innerField.value' :placeholder="`New ${formatName(field.name)}`">
            </b-form-select>
          </b-form-group>
          {{innerField}}
        </form>
      </main>
      <footer class="x-modal__footer">
        <button @click="onUpdate" class="btn btn-action">Update</button>
      </footer>

    </b-modal>
</template>
<script lang="ts">
import { Component, getModule, Prop, Watch } from 'nuxt-property-decorator';
import Vue from 'vue'
@Component({
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
  }
  formatName(value: string){
    if(!value) return '';
    const res = value.split('_').join(" ")
    return res[0].toUpperCase() + res.substring(1, res.length)
  }
}
</script>