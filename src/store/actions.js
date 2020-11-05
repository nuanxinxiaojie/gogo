import {USER,RESET_USER,TOKEN,
  RESET_TOKEN} from './mutation-types.js'
import {login} from '../api'
export default{
  // async getAddress({state,commit}){

  //   let {longitude,latitude}=state
  //   let res=await reqAddress(longitude,latitude)
  //   if(res.code===0){
      
  //     let address=res.data
  //     commit(RECEIVE_ADDRESS,address)
  //   }
  // },
  // async categorys({commit}){
  //   let res=await reqCategorys()
  //     if(res.code===0){
  //     let categorys=res.data
  //       commit(RECEIVE_CATEGORYS,categorys)
      
  //   }
  // },

  // async shops({state,commit}){
  //   let { longitude,latitude} =state
  //  let res=await reqShops({longitude,latitude})
  //  if(res.code===0){
  //     let shops=res.data   
  //     commit(RECEIVE_SHOPS,shops)
  //  }

  // },
  saveUser({state,commit},user){
    let token=user.token
    console.log(token)
    commit(TOKEN,token)
    localStorage.setItem("token",token)
    let aaa=localStorage.getItem("token")
    console.log(aaa)
    delete user.token
    commit(USER,user)
    console.log(state)


  },
  resetUser({commit}){
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token')
   
  },
  async autoLogin({state,commit}){
    if(state.token){
      let res=await login()
      let user=res.data
      commit(USER,user)

    }
  }


  // async shop_goods({commit}){
  //   let res=await reqGoods()
  //   console.log(res)
  //   if(res.code===0){
  //     let goods=res.data
  //     console.log(goods)
  //     commit(SHOP_GOODS,{goods})
  //   }

  // },
  // async shop_ratings({commit}){
  //   let res=await reqRatings()
  //   console.log(res)
  //   if(res.code===0){
  //     let ratings=res.data
  //     console.log(ratings)
  //     commit(SHOP_RATINGS,{ratings})
  //   }

  // }, 
  // async shop_info({commit}){
  //   let res=await reqInfo()
  //   console.log(res)
  //   if(res.code===0){
  //     let info=res.data
  //     console.log(info)
  //     commit(SHOP_INFO,{info})
  //   }

  }

