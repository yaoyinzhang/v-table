import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

// 这个是webpack提供的require方法，可以创建上下文环境。相当于将svg目录下的svg文件require进来。
// https://webpack.js.org/guides/dependency-management/#require-context
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
