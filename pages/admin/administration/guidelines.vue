<template>
  <div class="data-grid">
    <div class="data-grid-main">
      <!-- {{guidelines}} -->
      <div class="patient-data-grid">
        <div class="data-item" :key="gl.diagnosis_id" v-for="gl in guidelines">
          <header>
            <div class="title-field">
                <span class="title-key">ICD code: </span>
                <span class="title-value">{{gl.icd_code}}</span>
              </div>
            <div class="actions">
              <i @click="openEditModal(gl)" class="bi bi-pen action"></i>
            </div>
          </header>
          <main>
            <div class="data-row">
              <span class="data-key">Author</span>
              <span class="data-value">{{gl.author}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Guideline title</span>
              <span class="data-value">{{gl.title}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Description</span>
              <span class="data-value">{{gl.description}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Causes</span>
              <span class="data-value">{{gl.causes}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Transmission</span>
              <span class="data-value">{{gl.transmission}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Symptoms</span>
              <span class="data-value">{{gl.symptoms}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Treatment</span>
              <span class="data-value">{{gl.treatment}}</span>
            </div>
            <div class="data-row">
              <span class="data-key">Prevention</span>
              <span class="data-value">{{gl.prevention}}</span>
            </div>
          </main>
        </div>
      </div>

      <b-modal size="lg" hide-header hide-footer  body-class="x-modal" id="edit-guideline-modal">
        <header class="x-modal__header">
          <span class="title">Edit guideline</span>
        </header>
        <main>
          <form id="edit-guideline-form" @submit.prevent>
            <span class="input-group-title">Single line text entries</span>
            <div class="row">
              <b-form-group class="col-4" label="Author"> 
                <b-input name="author" v-model="editGl.author" placeholder="Guideline author"/>
              </b-form-group>
              <b-form-group class="col-4" label="Title"> 
                <b-input name="title" v-model="editGl.title" placeholder="Guideline title"/>
              </b-form-group>
              <b-form-group class="col-4" label="Transmission"> 
                <b-input name="transmission" v-model="editGl.transmission" placeholder="Guideline transmission"/>
              </b-form-group>
            </div>
            <span class="input-group-title">Multi lines text entries</span>
            <div class="row">
              <b-form-group class="col-4" label="Description"> 
                <b-form-textarea
                  placeholder="Guideline description"
                  rows="3"
                  name="description"
                  class="form-control"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
              <b-form-group class="col-4" label="Causes"> 
                <b-form-textarea
                  placeholder="Guideline causes"
                  rows="3"
                  name="causes"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
              <b-form-group class="col-4" label="Symptoms"> 
                <b-form-textarea
                  placeholder="Guideline symptoms"
                  rows="3"
                  name="symptoms"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
            </div>
            <div class="row">
              <b-form-group class="col-4" label="Preventions"> 
                <b-form-textarea
                  placeholder="Guideline preventions"
                  rows="3"
                  no-resize
                  name="prevention"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group class="col-4" label="Diagnosis"> 
                <b-form-textarea
                  placeholder="Guideline diagnosis"
                  rows="3"
                  name="diagnosis"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
              <b-form-group class="col-4" label="Treatments"> 
                <b-form-textarea
                  placeholder="Guideline treatments"
                  rows="3"
                  name="treatment"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
            </div>
            <footer class="x-modal__footer">
              <button @click="doEditGuideline" 
              class="btn btn-action main-action">Edit</button>
              <button class="btn btn-action" @click="$bvModal.hide('edit-guideline-modal')">Cancel</button>
              
            </footer>
          </form>
        </main>
      

      </b-modal>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import AdminStore from '@/store/admin-store'
import { IGuideline } from '~/api/models/admin.model';

@Component({
  layout: 'dashboard'
})
export default class Guidelines extends Vue{

  private adminStore = getModule(AdminStore, this.$store)
  editGl: IGuideline = {
    description: '', title: '', author: '', causes: '',
    symptoms: '', prevention: '', transmission: '', treatment: '',
    diagnosis: ''
  }
  
  public get guidelines(){
    return this.adminStore.guidelines
  }
  
  openEditModal(data: IGuideline){
    this.editGl = data
    //@ts-ignore
    this.$bvModal.show('edit-guideline-modal')
  }
  async doEditGuideline(){
    const form = document.querySelector("#edit-guideline-form")
    
    //@ts-ignore
    const formData = new FormData(form)
    //@ts-ignore
    this.$bvModal.hide('edit-guideline-modal')
    await this.adminStore.editGuideline({guidelineId: Number(this.editGl.diagnosis_id), formData})
    
  }
  mounted(){
    this.adminStore.getGuidelines()
  }

}
</script>
<style lang="scss">
.data.guidelines{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

</style>