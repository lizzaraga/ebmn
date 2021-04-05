<template>
  <div>
    <!-- {{guidelines}} -->
    <div class="data guidelines">
      <div class="card-data guideline" :key="gl.diagnosis_id" v-for="gl in guidelines">
        <header>
          <span class="title">ICD code: {{gl.icd_code}} </span>
          <div class="actions">
            <span @click="openEditModal(gl)" class="action">
              <i class="bi bi-pen"></i>
            </span>
          </div>
        </header>
        <main>
          <div class="row">
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Author</span>
              <span class="value">{{gl.author}}</span>
            </div>
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Guideline title</span>
              <span class="value">{{gl.title}}</span>
            </div>
          </div>
          <div class="d-flex mt-2 flex-column card-data-item">
            <span class="key">Description</span>
            <span class="value">{{gl.description}}</span>
          </div>
          <div class="d-flex mt-2 flex-column card-data-item">
              <span class="key">Causes</span>
              <span class="value">{{gl.causes}}</span>
            </div>
          <div class="row mt-2">
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Transmission</span>
              <span class="value">{{gl.transmission}}</span>
            </div>
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Symptoms</span>
              <span class="value">{{gl.symptoms}}</span>
            </div>
          </div>
          <div class="row">
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Treatment</span>
              <span class="value">{{gl.treatment}}</span>
            </div>
            <div class="d-flex col-6 flex-column card-data-item">
              <span class="key">Prevention</span>
              <span class="value">{{gl.prevention}}</span>
            </div>
          </div>
        </main>
      </div>
    </div>

    <b-modal size="lg" hide-header hide-footer  body-class="x-modal" id="edit-guideline-modal">
      <header class="x-modal__header">
        <span class="title">Edit guideline</span>
      </header>
      <main>
        <form id="edit-guideline-form" @submit.prevent="doEditHospital">
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
        </form>
      </main>
      <footer class="x-modal__footer">
        <button class="btn btn-action" @click="$bvModal.hide('edit-guideline-modal')">Cancel</button>
        <button @click="doEditGuideline" class="btn btn-action">Edit</button>
      </footer>

    </b-modal>
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