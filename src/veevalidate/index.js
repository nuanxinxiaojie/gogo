import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

import zh_CN from 'vee-validate/dist/locale/zh_CN'
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phoneNumber:'手机号码',//手机号码
  
    code: '验证码',
    phone: '手机号',
    password:"密码",
    captcha:'图形验证码'
  }
})


VeeValidate.Validator.extend('phoneNumber', {
  getMessage: (field) =>  '必须是11位'+field,
  validate: value => {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
  }
})
VeeValidate.Validator.extend('code', {
  getMessage: (field) =>  '必须是4-6位'+field,
  validate: value => {
    return /^\d{4}|\d{6}$/.test(value)
  }
})
VeeValidate.Validator.extend('phone', {
  getMessage: (field) =>  field+'必须是英文字母数字组成',
  validate: value => {
    return /^\w+$/.test(value)
  }
})
VeeValidate.Validator.extend('password', {
  getMessage: (field) =>  field+'必须是英文字母数字组成',
  validate: value => {
    return /^\w+$/.test(value)
  }
})
VeeValidate.Validator.extend('captcha', {
  getMessage: (field) =>  field+'必须是英文字母数字组成',
  validate: value => {
    return /^\w+$/.test(value)
  }
})


