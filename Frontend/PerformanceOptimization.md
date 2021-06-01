性能优化是一个需要大家一起通力合作才能完成的比较好的工作。

![性能优化图解](../Image/PerformanceOptimization.png)

## 网络层面

- 请求过程的优化
  - 构建工具优化
  - 压缩
  - 图片优化
- 减少网络请求
  - 本地缓存
  - 网络缓存

## 渲染层面

- 服务端渲染 有利有弊，会加大服务器的压力，用户数多的项目反而会把计算下发给客户端。
- 浏览器渲染 css 方案
- 浏览器渲染 JS 方案
- DOM 优化
  - 原理和基本思路
  - 事件循环和异步更新
  - 回流和重绘
- 首屏渲染提速

## 请求过程的优化

请求过程的优化主要是：减少请求次数，缩短请求时间。而这俩的关键就是资源的压缩合并和缓存。这时候就需要我们打开 Gzip 压缩。
减少情趣次数：必须要有效的利用缓存，不管是 http 网络缓存还是本地的 local storage cookie session storage 等。

缩短请求时间：这里就需要将资源压缩，构建工具也需要做相应的优化

### 构建工具优化

webpack 优化主要分两点：减少打包时间，减小打包文件大小。
**缩短时间**：一定要高效的利用缓存，加入 dll 插件。使用 happy pack 。等手段加速打包的过程。
**缩小体积**：tree shaking ，当然这个在 webpack4 5 中是默认集成的。

### 缓存

缓存是一个非常重要的知识点，几乎所有的静态 css js ，图片，我们都是需要使用缓存。而有个很重要的缓存是 CDN。在大型的公司里，静态文件走 CDN 是一个规定。CDN 好处就是加速静态文件的请求，给更好的用户体验，而且这种静态资源是不用携带 cookie 的，这对于大型的公司来说，节省的流量费都是一笔不小的开支。当然 CDN 也不是完美的，也可能会出现 CDN 挟持等问题，但是只要不管是缓存还是回源全链路 https ，给 script 标签上使用 SRI subresource integrity 加密方案的话，基本就可以避免绝大部分的攻击了。

http 缓存：我们在设置一个文件的缓存策略的时候，一般是这样的一个决策树。

1. 判断这个文件是不是可以被缓存，不可以缓存直接设置 cache-control 为 no-store
2. 可以缓存，那么先设置 cache-control ： no-cache 然后再考虑文件是不是可以被代理资源服务器缓存，再设置 public 和 private。
3. 设置完是不是可以被资源服务器缓存以后，再设置缓存时间。也就是 max-age 和 s-maxage
4. 设置完缓存时间以后，再设置协商缓存的 last-modify 以及 Etag 等参数。

## 渲染

在渲染的过程中，我们的浏览器会把获取的 dom object tree 和 css object tree 结合起来，然后就得到一颗渲染树。然后从渲染树的根节点开始调用，这样就得到一个

### css

Css 会在渲染的时候阻塞代码，所以要尽量早的将 css 加载出来这里就需要的是将 css 位置放在 head 标签里，或者使用 cdn，一般在大型项目中，使用 cdn 加载静态资源是一种规定。

在 css 中做性能优化有如下的几个点：

1. 尽量不要用 通配符。
2. 标签选择尽量不要嵌套很深。
3. 由于 css 是从右往左加载的，因此在使用的时候，能用类或者 id 的就不用标签选择器。

### js

我们的 js 执行模式三种，

- 一种是普通模式，js 会阻塞浏览器，直到 script 执行完才会继续执行下面的代码
- async 执行不会阻塞浏览器。加载是异步的，当加载结束的时候，就会立即执行 script 代码
- defer 模式。执行是异步的，不会阻塞浏览器运行。当 contentLOaded 以后才会去执行 script 代码

#### 防抖和节流

在 js 中有两个很重要的优化手段就是防抖和节流，这俩都是闭包的形式出现的。

**防抖**： 在指定时间就执行第一次的。
**节流**：在指定时间里执行最后一次。

```js
// 在指定的时间内，函数只能被触发一次
function throttle(fn, interval) {
  // 这个函数的核心思想是在 interval 的时间里，执行第一次进来的函数
  let last = 0;
  let timer = null;

  return function () {
    const context = this;

    const args = arguments;

    const now = +new Date(); // 这一步是将日期转成 number

    if (now > last + interval) {
      // 这里是两种情况
      // 1 第一次进来，那么因为 last 是 0；interval + last 必然是比 now 小的
      // 2 不是第一次进来，而是一直在输入，last 的值 + interval 已经是大于当前的 now
      last = now;
      fn.apply(context, args);
    } else {
      clearTimeout(timer);

      timer = setTimeout(() => {
        // 这里比较重要，需要在每次函数执行到这里 的时候，改变 last 时间。
        // 这里不一定执行，但是这里会改变时间戳。
        last = now;
        fn.apply(context, args);
      }, interval);
    }
  };
}

// 防抖函数，在规定的时间内，函数被触发一次，当一直被触发的时候，前面的时间就要被清空。直到停止触发一段时间才执行。
function debounce(fn, delay) {
  let timer = null;

  return function (args) {
    const context = this;
    clearTimeout(timer);
    // 这里call 和 apply 相比，传输的是单个参数，apply 是类数组，所以可能 call 性能好的原因是少了一次解析。
    timer = setTimeout(() => {
      fn.call(context, args);
    }, delay);
  };

  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

const testDiv = document.getElementById("testDiv");

function ajax(params) {
  console.log(`this is ajax: ${params}，times: ${new Date().toLocaleString()}`);
}

let throttleAjax = throttleFunction(ajax, 1000);

testDiv.addEventListener("keyup", function (e) {
  throttleAjax(e.target.value);
});
```
