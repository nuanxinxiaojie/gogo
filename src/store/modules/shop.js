import {SHOP_GOODS,SHOP_RATINGS,SHOP_INFO,INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT} from '../mutation-types.js'
import {reqGoods,reqRatings,reqInfo} from '../../api'
import Vue from 'vue'
const state={
  goods:[],
  ratings:[],
  info:[],
  carfood:[]
}
const mutations={
  [SHOP_GOODS](state,{goods}){
    state.goods=goods
  },
  [SHOP_RATINGS](state,{ratings}){
    state.ratings=ratings
  },
  [SHOP_INFO](state,{info}){
    state.info=info
  },
  [INCREMENT_FOOD_COUNT](state,food){
    console.log(food)
    if(!food.count){
      Vue.set(food,"count",1)
      state.carfood.push(food)
    }else{
      food.count++
    }
    
  },
  [DECREMENT_FOOD_COUNT](state,food){
    if(food.count>0){

      food.count--
      let index=state.carfood.findIndex((f)=>f===food)
      console.log(index)
      if(food.count===0){
        state.carfood.splice(index,1)
      }
      
    }
  }
}
const actions={
  async shop_goods({commit}){
    let res=await reqGoods()
    if(res.code===0){
      let goods=res.data
      commit(SHOP_GOODS,{goods})
    }

  },
  async shop_ratings({commit}){
    let res=await reqRatings()
    if(res.code===0){
      let ratings=res.data
      commit(SHOP_RATINGS,{ratings})
    }

  }, 
  async shop_info({commit}){  
    let res=await reqInfo()
    if(res.code===0){
      let info=res.data
      commit(SHOP_INFO,{info})
    }
  },

  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      console.log(food)
      commit(INCREMENT_FOOD_COUNT,food)
    }else{
      commit(DECREMENT_FOOD_COUNT,food)
    }

  }

}
const getters={
  totalCount (state){
    return state.carfood.reduce((pre,food)=>pre+food.count,0)
  },
  totalPrice (){
    return state.carfood.reduce((pre,food)=>pre+food.count*food.price,0)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}