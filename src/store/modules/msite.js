import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from '../mutation-types'
import {reqAddress,reqCategorys,reqShops} from '../../api/index.js'
const state={
   // 经度
   longitude: '116.36867',
   // 纬度
   latitude: '40.10038',
   //地址
   address:{},
   //视频分类
   categorys:[],
   shops:[],
}
const mutations={
  [RECEIVE_ADDRESS](state,address){
    state.address=address
  },
  [RECEIVE_CATEGORYS](state,categorys){
    state.categorys=categorys
  },
  [RECEIVE_SHOPS](state,shops){
    state.shops=shops
  },
}
const actions={

  async getAddress({state,commit}){

    let {longitude,latitude}=state
    let res=await reqAddress(longitude,latitude)
    if(res.code===0){
      
      let address=res.data
      commit(RECEIVE_ADDRESS,address)
    }
  },
  async categorys({commit}){
    let res=await reqCategorys()
      if(res.code===0){
      let categorys=res.data
        commit(RECEIVE_CATEGORYS,categorys)
      
    }
  },

  async shops({state,commit}){
    let { longitude,latitude} =state
   let res=await reqShops({longitude,latitude})
   if(res.code===0){
      let shops=res.data   
      commit(RECEIVE_SHOPS,shops)
   }

  },
}
const getters={}
export default {
  state,
  mutations,
  actions,
  getters
}