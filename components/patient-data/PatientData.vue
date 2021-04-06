<template>
  <div>
    <main-content-with-menu>
      <template #menu>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#general-infos'}">General Informations</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#legal-docs'}">Legal Documents</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#labs'}">Labs</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#radiologies'}">Radiologies</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#ekg-list'}">Ekg List</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#problem-list'}">Problem List</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#medication-list'}">Medication List</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#vital-signs'}">Vital signs</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#surgeries'}">Surgeries</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#allergies'}">Allergies</nuxt-link>
        <nuxt-link class="aside-menu-link" :to="{name: $route.name, 'hash': '/#substance-abuses'}">Substance Abuses</nuxt-link>
      </template>
      <div>
        <general-infos :patientId="patientId" v-if="hash.trim() == '/#general-infos'"/>
        <legal-docs :patientId="patientId" v-if="hash.trim() == '/#legal-docs'"/>
        <labs :patientId="patientId" v-if="hash.trim() == '/#labs'"/>
        <radiologies :patientId="patientId" v-if="hash.trim() == '/#radiologies'"/>
        <ekgs :patientId="patientId" v-if="hash.trim() == '/#ekg-list'"/>
        <problems :patientId="patientId" v-if="hash.trim() == '/#problem-list'"/>
        <medications :patientId="patientId" v-if="hash.trim() == '/#medication-list'"/>
        <vital-signs :patientId="patientId" v-if="hash.trim() == '/#vital-signs'"/>
        <surgeries :patientId="patientId" v-if="hash.trim() == '/#surgeries'"/>
        <allergies :patientId="patientId" v-if="hash.trim() == '/#allergies'"/>
        <abusive-substances :patientId="patientId" v-if="hash.trim() == '/#substance-abuses'"/>
      </div>
    </main-content-with-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import MainContentWithMenu from '~/components/MainContentWithMenu.vue';
import AbusiveSubstances from './abusive-substances/AbusiveSubstances.vue';
import Allergies from './allergies/Allergies.vue';
import Ekgs from './ekgs/Ekgs.vue';
import GeneralInfos from './genaral-infos/GeneralInfos.vue';
import Labs from './labs/Labs.vue';
import LegalDocs from './legal-docs/LegalDocs.vue';
import Medications from './medications/Medications.vue';
import Problems from './problems/Problems.vue';
import Radiologies from './radiologies/Radiologies.vue';
import Surgeries from './surgeries/Surgeries.vue';
import VitalSigns from './vital-signs/VitalSigns.vue';

@Component({
  components: {
    mainContentWithMenu: MainContentWithMenu,
    generalInfos: GeneralInfos,
    legalDocs: LegalDocs,
    labs: Labs,
    radiologies: Radiologies,
    ekgs: Ekgs,
    problems: Problems,
    medications: Medications,
    vitalSigns: VitalSigns,
    surgeries: Surgeries,
    allergies: Allergies,
    abusiveSubstances: AbusiveSubstances
  }
})
export default class PatientData extends Vue{
  @Prop({required: true}) patientId!:number
  mounted(){
    if(this.$route.hash == '')
      this.$router.replace({name: this.$route.name!!, 'hash': '/#general-infos'})
  }

  
  public get hash() : string {
    return this.$route.hash
  }
  
}
</script>