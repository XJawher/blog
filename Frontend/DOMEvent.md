## EventTarget 接口

**EventTarget.addEventListener()**
**EventTarget.removeEventLisener()**
**EventTarget.dispatchEvent()**

### 1 简介

DOM 的事件操作，包括监听和触发，都是定义在 EventTarget 接口上。所有的节点对象都部署了这个接口。
这个接口主要提供三个实例方法：

- addEventListener：绑定事件的监听函数
- removeEventLisenter：移除事件的监听函数
- dispatchEvent：触发事件

### 2 addEventListener 函数

这个函数用于在当前节点或者当前对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数，该方法没有返回值。这个方法接收三个参数

```js
    target.addEventListener(type,listener[,useCaptrue])
    //Captrue 捕获，捕捉
```

**type**：事件名称，大小写敏感
**listener**：监听函数，事件发生的时候，会调用这个函数
**useCapture**：捕获还是冒泡，默认是 false，代表监听函数只在冒泡阶段触发。true 的时候，就是在捕获阶段触发上面的函数。

**TIPS**：

1. 需要注意的地方：listener 既可以是函数，又可以是对象，对象的时候，里面要有个 handleEvent 方法。
2. useCapture 既可以是布尔值，true 的时候，代表是捕获阶段触发，false 的时候，代表是在冒泡阶段触发。除了是布尔值，还可以是一个属性配置对象，该对象具备以下的属性
   - captrue: 布尔值，表示在捕获阶段触发，还是在冒泡阶段触发
   - once: 布尔值，表示监听函数是不是只触发一次，然后就自动移除。
   - passive: 布尔值 表示监听函数不会调用事件的 preventDefault 方法。如果调用了，那么浏览器就会忽略这个要求，并在控制台输出一个警告。
3.

备注： event.preventDefault(); 阻止 event 的默认动作被执行，但是事件还是继续去传播。[MDN web doc preventDefault](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)

### 3 removeEventListener

在 removeEventListener 函数中需要注意的是，传入的三个参数必须是和监听的一样的，也就是 type 要一样，函数要一样，最后的布尔值也要一样，这样的话才能生效、

```js
div.addEventListener("click", function (e) {}, false);
div.removeEventListener("click", function (e) {}, false);

// 上面的代码虽然看起来是一样的，但是却不会起作用的，因为监听的函数不是同一个函数，是两个不一样的函数。
function printName() {
  console.log("name");
}
div.addEventListener("click", printName, false);
div.removeEventListener("click", printName, false);
// 如果这样写的时候，才会把监听函数干掉。
// 要注意：必须是三个参数都是一样的才可以被取消监听。
```

### 4 dispatchEvent

eventTarget.dispatchEvent(event) 这个函数会返回布尔值，表示当前在这个节点对象上监听的行为是不是被触发了。比如

```js
div.addEventListener("click", hello, false);
const event = new Event("click");
const hasClicked = div.dispatchEvent(event);

// 上面的代码如果触发了那么 hasClicked 就是 true；
```

## 浏览器事件模型

### 1 HTML-on 属性

HTML 语言是允许在元素的某些属性中，直接定义某些事件的监听代码例如

```html
<div id="test" onclick="console.log('this is on click')"></div>
<!-- 这个方式的执行阶段是在 冒泡阶段执行。要注意传入函数的时候，需要加圆括号，函数要执行才行。 -->
上面的这个效果和下面的这个是一样的 const test = document.getElementById('test')
test.setAttribute('onclick','someFunction()')
```

### 2 元素节点的事件属性

```js
test.onclick = funcion(event) {
    console.log('clicked!!!')
}
// 这个函数也是在冒泡阶段会被触发。和上面的 on- 不一样的是，这个的是传入函数名，不用加圆括号直接执行。
```

### 3 addEventListener()

所有的 dom 节点实例都有 addEventListener 的方法，这个方法也是我们推荐的监听方法

### 小结

上面的三种方法是都可以用来监听事件的，第一种 HTML 的 on 属性，违反了 HTML 和 js 相分离的原则，将两者写在一起，耦合了，因此是不推荐使用的。
元素节点的事件属性的缺点在于，同一个事件只能定义一个监听函数，如果定义两次的话，后面的函数会把前面的函数覆盖了，这个也不推荐使用，而且只能监听冒泡阶段。
addEventListener 是我们推荐的监听方式，它可以做到一个事件被多个函数监听，能够指定监听的阶段，是冒泡还是捕获阶段。很灵活。他的三个参数赋予了这个函数更多的可能性。
