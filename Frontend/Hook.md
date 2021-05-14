React 的 hook 给前端带来了更多的惊喜和可能性。

一般情况下 function 是没有状态的，class 是有状态的，但是 hook 的出现，让 function 也有了状态。这个状态是存在哪里的呢

```js
export type Hook = {
  memoizedState: any, // 最新的状态值
  baseState: any, // 初始状态值，如`useState(0)`，则初始值为0
  baseUpdate: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null, // 临时保存对状态值的操作，更准确来说是一个链表数据结构中的一个指针
  next: Hook | null, // 指向下一个链表节点
};
```

从上面的代码可以看到 hook 的状态值是被保存在组件实例对象 FiberNode 的 memoizedState 中，作为

闭包
