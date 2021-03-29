<template>
  <b-modal centered  hide-header hide-footer  body-class="x-modal" id="gi-file-modal">
      <header class="x-modal__header">
        <span class="title">Update <span>{{field.name | formatName}}</span></span>
      </header>
      <main>
        
        <form>
          <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
          {{innerField}}
        </form>
      </main>
      <footer class="x-modal__footer">
        <button @click="onUpdate" class="btn btn-action">Update</button>
      </footer>

    </b-modal>
</template>
<script lang="ts">
import { Component, Prop, Watch } from 'nuxt-property-decorator';
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
    this.$emit('update', Object.assign({}, this.innerField))
  }
  formatName(value: string){
    if(!value) return '';
    const res = value.split('_').join(" ")
    return res[0].toUpperCase() + res.substring(1, res.length)
  }
}
</script>