装饰器是一个很好用的特性，之前写 PY 的时候也常用到，但是没有深入的了解过在 python 中装饰器的原理是啥，后来在写 bd 的时候，有很多的 try catch 公共的代码就像是下面这样的，后来用装饰器搞了一把，发现还是挺好的，能节省挺多的代码的，看起来也很清爽，在装饰器里还可以搞一些公共的方法，也是很不错的。

```js
function catchAPIError(target, key, descriptor) {
  return Object.assign({}, descriptor, {
    value: async function (...arg) {
      try {
        return await descriptor.value.apply(this, arg);
      } catch (e) {
        console.info(
          "HTTP Error: " + (e.msg || e || "No clear error information.")
        );
        if (process.env.NODE_ENV === "test") {
          console.info(descriptor.value);
        }
      }
    },
  });
}

class http {
  someRequest() {
    try {
      return http.request(url);
    } catch (error) {
      // some error happed
      console.log(error);
    }
  }

  @catchAPIError
  someRequestWithDecorator() {
    return http.request(url);
  }
  // 一行顶四行有木有 哈哈哈
}
```

同样的也可以把 redux 写成装饰器，也很好用，看着很简洁很清爽

es6 装饰器这部分的知识点我基本是看的这个文章 [es6 装饰器](https://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E8%A3%85%E9%A5%B0)

装饰器不能装饰函数，因为有作用域提升的问题，这一点我就想起当时看到 react hook 的时候，那就是函数是没有状态的，而 hook 的出现，让函数有了状态，这个就是一件很神奇的事情。当然如果一定要装饰函数，也不是不可以，那就变成了高阶函数去套函数了。
