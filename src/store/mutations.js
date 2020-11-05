import {USER,RESET_USER,
  RESET_TOKEN,TOKEN} from './mutation-types.js'
export default{
  // [RECEIVE_ADDRESS](state,address){
  //   state.address=address
  // },
  // [RECEIVE_CATEGORYS](state,categorys){
  //   state.categorys=categorys
  // },
  // [RECEIVE_SHOPS](state,shops){
  //   state.shops=shops
  // },
  [USER](state,user){
    state.user=user
  },
  [RESET_USER](state){
    state.user={}
  },
  [TOKEN](state,token){
    state.token=token
  },
  [RESET_TOKEN](state){
    state.token=''
  },


  // [SHOP_GOODS](state,{goods}){
  //   state.goods=goods
  // },
  // [SHOP_RATINGS](state,{ratings}){
  //   state.ratings=ratings
  // },
  // [SHOP_INFO](state,{info}){
  //   state.info=info
  // }
}
