// 引入ajax
import ajax from './ajax.js'
// http://localhost:5000/position/40.10038,116.36867
const BASE = '/api'
// 获取地址信息
export const reqAddress = (longitude, latitude) => ajax.get(BASE + `/position/${latitude},${longitude}`)
// 获取食品分类信息
export const reqCategorys = () => ajax({
  method: 'GET',
  url: BASE + `/index_category`,
  headers:{
    needToken:true
  }
})
// 获取商铺信息
export const reqShops = ({ longitude, latitude }) => ajax({
  method: 'GET',
  url: BASE + `/shops`,
  params: {
    longitude,
    latitude
  },
  headers:{
    needToken:true
  }
})

//发送验证码
export const reqSendCode=(phone)=>ajax({
  method:'GET',
  url:BASE+`/sendcode`,
  params:{
    phone
  }
})


  export const reqPwdLogin=({name,pwd,captcha})=>{
    return ajax({
      method:'POST',
      url:BASE+'/login_pwd',
      params:{
        name,
        pwd,
        captcha
      }
    })
  }


//验证码登录
export const reqCodeLogin=(phone,code)=>{
  return ajax({
    method:'POST',
    url:BASE+"/login_sms",
    params:{
      phone,
      code
    }
  })
}
//自动登录
export const login=()=>{
  return ajax({
    method:'GET',
    url:BASE+"/auto_login",
    headers:{
      needToken:true
    }
  })
}



export const reqGoods=()=>ajax('/goods')
export const reqRatings=()=>ajax('/ratings')
export const reqInfo=()=>ajax('/info')