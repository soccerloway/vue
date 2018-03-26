import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue对象的构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue) // 这里检测是否为Vue实例
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 根据options配置初始化Vue实例
  this._init(options) // _init方法在下面的initMixin中有定义
}

/* 扩展Vue的原型 */
initMixin(Vue) // 扩展Vue初始化
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
