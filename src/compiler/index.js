/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options) // parse过程 将template转为AST
  if (options.optimize !== false) {
    optimize(ast, options) // optimize 标记静态节点 优化性能, diff VNode时将忽略静态节点比对
  }
  const code = generate(ast, options) // 根据AST结构拼接生成 render function 的字符串
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
