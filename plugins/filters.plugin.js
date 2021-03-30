import Vue from 'vue'
import moment from 'moment'

Vue.filter('convertDate', (date) => {
    return moment(date).format('MMM Do YYYY, [\n] h:mm:ss a')
})