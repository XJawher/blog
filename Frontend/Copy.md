## 浅拷贝

拷贝对象和被拷贝的对象公用一个引用地址，当修改其中的一个的时候，另一个也会受到影响。

## 深拷贝

拷贝对象和被拷贝对象是地址不同的两个变量。是将被拷贝对象进行递归后将所有的属性都复制到拷贝对象中的新对象。

实现一个深拷贝的原理很简单，就是递归。遍历对象，数组，直到里面全部都是基本数据类型的时候，再去复制，这就是深拷贝。但是有一种特殊情况，就是对象的属性引用到自己的情况，解决这种循环引用问题，我们可以开辟一个存储空间，来存储单签对象和拷贝对象的对应关系，当需要拷贝当前对象的时候，先去存储空间中找，有没有拷贝过这个对象，有的话直接返回，没的话就继续拷贝。

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);
```
