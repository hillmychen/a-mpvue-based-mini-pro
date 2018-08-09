import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip=false
const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 设置标题
    navigationBarTitleText: '评论列表',
    // 允许下拉刷新
    enablePullDownRefresh: true
  }
}
