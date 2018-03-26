/* @flow */

// 这个是 Vue构造函数的配置项文件
import config from '../config'

import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

// 函数参数为 Vue构造函数
export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  // 初始化 Vue构造函数的配置信息，覆写config的getter和setter
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 暴露工具方法，这些工具方法不属于公共API，尽量避免使用它们，除非你很清除其中的风险
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  // set 设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。
  Vue.set = set
  // delete 删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但是你应该很少会使用它。
  Vue.delete = del
  // nextTick 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)

  // 初始化构造函数options上的资源对象为null
  // ASSET_TYPES: ['component', 'directive', 'filter']
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // 向Vue构造函数中注册内置组件
  // 内置组件为: keep-alive 抽象组件, 主要用于保留组件状态或避免重新渲染
  extend(Vue.options.components, builtInComponents)

  // 注册Vue.use方法，用于使用Vue插件
  initUse(Vue)

  // 注册Vue.mixin 全局混入方法
  initMixin(Vue)

  // 注册Vue.extend 使用基础Vue构造器，创建一个“子类”Vue构造函数
  initExtend(Vue)

  // 注册Vue.component Vue.directive Vue.filter方法，注册[ASSETS]使用
  initAssetRegisters(Vue)
}
