在 ES5 的时代继承是有很多的方案的，但是现在是 es6 的时代了，继承上那么多的方案，我感觉是回字的四种写法这样的存在，这里就介绍 es5 上的组合寄生继承和 es6 的 class 继承

```js
function Parent(name) {
  this.name = name; // 实例基本属性 (该属性，强调私有，不共享)
  this.arr = [1]; // (该属性，强调私有)
}
Parent.prototype.say = function () {
  // --- 将需要复用、共享的方法定义在父类原型上
  console.log("hello");
};
function Child(name, like) {
  Parent.call(this, name, like); // 核心
  this.like = like;
}
Child.prototype = Object.create(Parent.prototype); // 核心  通过创建中间对象，子类原型和父类原型，就会隔离开。不是同一个啦，有效避免了方式4的缺点。

// <!--这里是修复构造函数指向的代码-->
Child.prototype.constructor = Child;
```

es6 中的继承是采用的 class extends 然后在子类中去调用 super()
看下下面的例子

```js
class A {
  constructor() {
    new.target.name;
  }

  nameA() {
    console.log("name from class A");
  }
}

class B extends A {
  constructor() {
    super();
    super.nameA(); // name from class A
  }
}

new A(); // A
new B(); // B
```
