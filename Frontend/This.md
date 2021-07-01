## this 的由来

在 js 中出现 this 的原因是和内存里的数据结构有关系。例如下面的代码

```js
const data = {
  name: "test",
};
```

上面的代码将一个对象赋值给一个变量 data，js 引擎会在内存里生成一个 {name : "test"} 对象，然后把这个对象的内存地址赋值给变量 data，原始的对象是以字典的形式保存的，每一个属性名都是对应一个属性描述对象，举例来说上面的代码，在内存里是这样去保存的

```js
data: {
    [[value]] : "test",
    [[writable]] : true, // 属性的值是不是可以被重写，设置 true 可以被重写，设置 false 就不行。
    [[enumerable]] : true, // 属性是不是可以被枚举，也就是使用 for in 或者
    [[configurable]] : true, //
}
```
需要注意的是，严格模式下，this 是禁止指向 window 的，要在函数中指定运行的 this ，在严格模式下才可以使用 this，要不然就是 undefined。
## 函数

箭头函数 和 普通函数
箭头函数本身是没有 this 的，而且指向是一旦定了，就不会发生变化的，普通函数的 this 指向是可以发生变化的，但是箭头函数的指向，一旦确定了，就不会发生变化了。例如下面的例子。箭头函数不能用 call apply bind 等去修改 this 的指向，因为它内部是没有 this 的，所以也不能被用作构造函数。

```js

function foo () {
  return () =>{
    return () => {
      return () => {
        console.log(this.id)
      }
    }
  }
}

const f = foo.call({id: 1});

const t1 = f.call({id: 2})()()
const t2 = f().call({id: 3})()
const t3 = f()().call({id: 4})

// 这段代码上的 this ，全部是指向的 f 的 call 对象 {id : 1}
```
## setTimeout
在 setTimeout 中，fn 的回调可以认为是这样的

```js
const fn = function () {console.log(this)}

const a = {
  fn : function () {console.log(this)}
}

let call = fn.bind(a)
setTimeout(fn , 1000)
setTimeout(call , 1000)
// 在上面的代码中，可以看到，我们的函数在声明以后，就没有做修改，也就是 fn 的指向是 window 的。
```