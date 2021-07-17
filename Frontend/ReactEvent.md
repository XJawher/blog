SyntheticEvent  合成事件

在react 中，事件和 dom 的事件是不一样的， react 自己实现了一套合成事件，用来替换 dom 事件。所以就不用担心跨浏览器的兼容性。

## 合成事件和 dom 事件的区别
* 原生 dom 事件执行快，一个 dom 元素上绑定了 原生事件和 合成事件的时候，原生事件会先执行。
* 在 hook 上用 ref 的方式，绑定原生事件。
* 原生事件被阻止冒泡了，合成事件就不会执行了
* react 给合成事件封装的 stopPropagation 函数在调用的时候，给自己加了一个 isPropagationStopped 标记位来确定后续监听器是不是在执行的。
