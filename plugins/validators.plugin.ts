import { Context } from '@nuxt/types'
import {extend} from 'vee-validate'
import {required, email} from 'vee-validate/dist/rules'

export default function(ctx: Context){
 
  extend('required', {...required, message: 'This field is required.'})
  extend('email', {...email, message: 'Enter a valid email.'})
  extend('samePwd', {
     validate(value, args){
       return value == args
     },
     message: 'Must have a same password.'
  })
  extend('isCheck', {
    validate(value){
      return value == true
    },
    message: 'This field must be check.'
 })
}
