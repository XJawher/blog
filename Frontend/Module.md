前端的模块化经历了漫长的历史变迁，目前主流的是 es6 的 module 和 CommonJS
历史上的 js 模块 [模块的变迁历史](https://github.com/myshov/history-of-javascript/tree/master/4_evolution_of_js_modularity)

那个时候都靠 require.js sea.js 这些，配合 grunt 打包，都已经过去式了。

CommonJS 输出的值是一个值的拷贝，ES6 输出的是一个值的引用。
CommonJS 是运行时加载，ES6 是编译时候输出接口。
CommonJS 模块的 require 是同步加载模块，ES6 的 import 是异步加载，有一个独立的模块依赖的解析阶段。

CommonJS 是属于运行时候加载，也就是在运行的时候可以加载第三方的模块对象，且加载的是整个对象，然后再从对象里去读取对应的方法。

es6 的模块属于编译加载，也就是在编译阶段就会完成模块加载，而且加载的是该模块对应的方法，这样的话效率比 CommonJS 高。缺点是没办法引用 es6 模块本身，因为不是对象。

CMD sea.js 推崇的就近依赖，只有用到某个模块的时候，再去 require。

AMD RequiredJS 推崇依赖前置，在定义模块的时候，就要去声明其依赖的模块。
