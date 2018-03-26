/**
 * 这个文件就是整个Vue构造函数的入口文件
 * import导入核心Vue构造函数
 * 扩展构造函数的全局API
 * 定义运行环境参数
 */

// Vue构造函数的核心实现文件
import Vue from './instance/index'

import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// 为Vue构造函数扩展全局API, 如: vue.extend, vue.filter等
initGlobalAPI(Vue)

// 覆写$isServer的getter: 判断是否是SSR
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
