/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  // subs数组中的项 就是 订阅者watcher，即当该属性变化时，需要通知的对象
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  // 增加订阅者
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 删除订阅者
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // 属性getter中调用，收集当前属性的依赖
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  // 属性setter中调用，遍历订阅者list中的watcher，调用watcher.update方法
  // 通知依赖该属性的表达式或计算属性更新
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null
const targetStack = []

export function pushTarget (_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
