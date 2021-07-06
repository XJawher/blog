在 es6 中有了一个新的循环，for of，可以循环 数组，map， set，类似数组，参数 arguments，字符串等。
es6 之前呢，有个 for in 的循环，在 js 中被广泛的使用在循环对象中，在 js 中循环对象的话主要是以下的几种方法

```js
class P {
    constructor () {
        this.name = 'P';
        this.age = 10;
    }
}

class C extends P {
    constructor () {
        super()
    }
}

const C1 = new C();

```
### for in
for in 循环自身的和继承的可枚举属性，不含 Symbol。
```js
for (let key in C1) {
    console.log(key) // name  age
}
```
### for of
 for of 只能循环有 iterable 接口的对象，所以这里就不能循环 C1 这个对象。
```js
for (let key of C1) {
    console.log(key) // Uncaught TypeError: C1 is not iterable at <anonymous>:1:17
}
```
### Object.keys(C1)
for in 循环自身的和继承的可枚举属性，不含 Symbol。
```js
Object.keys(C1) // name  age
```
### getOwnPropertyNames
这个属性返回一个数组，包含对象自身的所有属性，不含有 Symbol 属性，但是含有不可枚举属性。
```js
// 这里我们利用 Object.defineProperty() 来新增和修改对象的现有属性。
Object.defineProperty(C1,'test',{
    value:'test defineProperty by handle',
    enumerable : false,
})

Object.keys(C1) // name  age
for (let key in C1) {
    console.log(key) // name  age  不含有不可枚举的属性
}

Object.getOwnPropertyNames(C1) // ["name", "age", "test"]  含有不可枚举的属性。
```