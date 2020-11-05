<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:phoneShow}"  @click="phoneShow=true">短信登录</a>
          <a href="javascript:;" :class="{on:!phoneShow}" @click="phoneShow=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:phoneShow}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneNumber" v-validate="'required|phoneNumber'" name="phoneNumber">
              <span style="color:red" v-show="errors.has('phoneNumber')" class="help is-danger">{{ errors.first('phoneNumber') }}</span>
              <button :disabled='!disabledShow ||setIntervalTime>0' class="get_verification" :class="{black:disabledShow}" 
               @click.prevent="sendCode">{{setIntervalTime>0?'剩余'+setIntervalTime+'秒':'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" name="code" v-validate="'required|code'" v-model="code">
              <span style="color:red" v-show="errors.has('code')" class="help is-danger">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!phoneShow}">
            <section>
              <section class="login_message">
                <input v-model="phone" type="tel" maxlength="11" placeholder="手机/邮箱/用户名" name="phone" v-validate="'required|phone'">
                <span style="color:red" v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isPasword?'text':'password'" maxlength="8"  placeholder="密码"  v-model="password" name="password" v-validate="'required|password'">
                <span style="color:red" v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                <div class="switch_button" :class="isPasword?'on':'off'" @click="isPasword=!isPasword">
                  <div class="switch_circle" :class="{right:isPasword}"></div>
                  <span class="switch_text">{{isPasword?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" name="captcha" v-validate="'required|captcha'">
                <span style="color:red" v-show="errors.has('captcha')" class="help is-danger">{{ errors.first('captcha') }}</span>
                <img class="get_verification" @click="upDataCaptch" ref="captch" src="http://localhost:4000/captcha" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="denglu">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import {reqSendCode,reqCodeLogin,reqPwdLogin} from '../../api/index.js'
import{Toast} from 'mint-ui'
  export default {
    data(){
      return{
        phoneShow:true,//切换手机号登陆或者密码登陆
        // disabledShow:true,//按钮禁用
        setIntervalTime:0,//倒计时
        isPasword:false,//是否显示密码
        phoneNumber:'13591464396',//手机号码
        code:'',
        phone:"",
        password:'',
        captcha:''
        

      }
    },
    computed:{
      disabledShow(){
        return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phoneNumber)
      },

    },
    methods: {
    // 发送验证码
     async sendCode() {
        console.log(111)
        this.setIntervalTime=5
        this.timeId=setInterval(() => {
           this.setIntervalTime--
          if(this.setIntervalTime<=0){
            this.setIntervalTime=0
            clearInterval(this.timeId)
          } 
        }, 1000);
        let res=await reqSendCode(this.phoneNumber)
        if(res.code===0){
           Toast('发送成功')
        }else{
           Toast('发送失败')
        }

      },
      async denglu(){
        let {phoneShow}=this
        // const success = await this.$validator.validateAll() // 对所有表单项进行验证
        // const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
        // const success = await this.$validator.validateAll()
        let names=phoneShow?['phoneNumber','code']:['phone','password','captcha']
         console.log(names)
        if(phoneShow){

          const success = await this.$validator.validateAll(names)
          // const success = await this.$validator.validateAll(['phoneNumber','code'])
          console.log(success+"1")
          if(success){
            let phoneNumber=this.phoneNumber
            let code=this.code
            let res=await reqCodeLogin(phoneNumber,code)
            console.log(res)
            if(res.code===0){
            
              const user=res.data
              this.$store.dispatch('saveUser',user)
              this.$router.replace('/Profile')

            }
          }

        }else{
          const success1 = await this.$validator.validateAll(['phone','password','captcha'])
          console.log(success1+"11")
          let phone=this.phone
          let password=this.password
          let captcha=this.captcha
          if(success1){
            let res=await reqPwdLogin({phone,password,captcha})
            console.log(res)
          }

        }

      },
      upDataCaptch(){
        this.$refs.captch.src="http://localhost:4000/captcha?time="+Date.now()
      }

  }
}
  
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
 .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                border 2px solid pink
                &.black
                  color blue
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

 
</style>
