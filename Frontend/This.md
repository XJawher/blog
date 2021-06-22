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

## 函数

箭头函数 和 普通函数

## 对象

## 数组

## 字符串

## setTimeout
