webpack 里面涉及到的知识点有很多个，知道多少写多少吧。

## loader 和 plugin

webpack 中很重要的两个知识点就是 loader 和 plugin 。
**loader**：是一个函数，将函数中接收的内容进行转换并返回转换的结果。
**plugin**：插件， webpack 会在打包的过程中广播出有很多事件，plugin 会检测到这些事件，利用这些广播事件然后做一些适合项目打包的事情，对 webpack 的能力是一种扩展。

loader 在 module.rules 中配置，作为模块的解析规则，是数组类型，数组内的每一项是一个对象，对象中包含的属性有 test 类型文件，loader，option 等　参数。

plugin 在 plugins 中配置，类型是数组，每一项是一个 Plugin 实例，参数都是通过构造函数传入。

## webpack 的打包原理

webpack 打包的过程是一个串行的过程，从启动到结束会依次执行如下的流程

1. 初始化参数，把配置文件和 shell 中出入的参数做合并处理。得到最终的参数。
2. 开始编译，用 1 得到的参数，初始化 compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
3. 确定入口，根据配置中的 enter 找到所有的入口文件。
4. 编译模块，从入口文件出发。调用所有的 loader 对模块进行翻译，再找到模块依赖的模块，递归本步骤，直到所有入口依赖的模块都经过 loader 的编译处理。等到翻译完所有的模块，这时候就会得到模块翻译完的内容和模块之间的依赖关系。
5. 输出资源，根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk，再把每个 chunk 转换成一个单独的文件加入到输出列表中，这一步是可以改变输出内容的最后步骤。
6. 输出完成，在确定好输出的资源以后，根据配置文件中确定的路径和文件名，把内容写入到文件系统中。

webpack 在以上的打包过程中，会在特定的时间点广播出特定的事件，这时候插件在监听到某个事件后会执行某些我们写好的逻辑。

## 热更新

HMR 的核心就是客户端从服务端去拉更新后的文件，准确的说就是 chunk diff，webpack-dev-server WDS 和浏览器之间维护了一个 websock。当本地资源发生了变化的时候，WDS 会向浏览器推送资源，并带上构建时候的 hash，让客户和上一次的资源进行对比，对比完成后根据差异会触发请求来获取变化的文件列表和 hash，这样客户端就可以继续向服务端发起 JSONP 请求这样就可以获取这个 chunk 的增量更新。
[webpack hmr 原理](https://zhuanlan.zhihu.com/p/30669007)

## happyPack

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。HappyPack 就是利用了这个特性，可以加速打包的过程。

## 手动编写 loader

## 代码切分

在 webpack 中有个很重要的功能是基于路由的代码拆分，

```js
// react 中
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);

// webpack 中

module.exports = {
  entry: {
    main: "./src/app.js",
  },
  output: {
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: "[name].bundle.js",
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: "[name].bundle.js",
    // `path` is the folder where Webpack will place your bundles
    path: "./dist",
    // `publicPath` is where Webpack will load your bundles from (optional)
    publicPath: "dist/",
  },
};
```

## 不同的路由下相同的资源

有这样的场景，在不同的路由下，有两个相同的资源，这时候怎么打包，会将这俩资源打包成一个，而不是打包成两份。
这时候需要使用 splitChunks 分割代码，将公共部分抽取出来。在 optimization 中配置\*\*\*\*
简单来说就是下面的这部分

```js
module.exports = {
  entry: {
    index: "./src/index.js",
    album: "./src/album.js",
  },
  output: {
    filename: "[name].bundle.js", // [name] 是入口名称
  },
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: "all",
    },
  },
  // ... 其他配置
};
```
