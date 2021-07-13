import Vue from 'vue'
import Vuex from 'vuex'
import player from './modules/player'

Vue.use(Vuex)

export default new Vuex.Store({
  // 设置vuex的严格模式，状态只能通过mutations修改
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  // 设置仓库的子模块
  modules: {
    player 
  }
})
