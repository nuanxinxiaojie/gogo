import {USER,RESET_USER,
  RESET_TOKEN,TOKEN} from '../mutation-types.js'
  import {login} from '../../api'

const state={
  user:{},
  token:localStorage.getItem("token"),
}
const mutations={
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
}
const actions={
  saveUser({state,commit},user){
    console.log(user)
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
  },
}
const getters={}
export default {
  state,
  mutations,
  actions,
  getters
}