<template>
  <b-modal centered  hide-header hide-footer  body-class="x-modal" id="gi-date-modal">
      <header class="x-modal__header">
        <span class="title">Update <span>{{field.name | formatName}}</span></span>
      </header>
      <main>
        
        <form>
          <b-form-group :label="formatName(field.name)"> 
            <b-input type="date" v-model='innerField.value' :placeholder="`New ${formatName(field.name)}`"/>
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
export default class GIDateModal extends Vue{
  @Prop({default: {name: '', value: ''}}) field!: {name: string, value: string} 

  // Data
  innerField: {name: string, value: string} = {name: '', value: ''}

  @Watch('field')
  onFieldChanged(f: {name: string, value: string} ){
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