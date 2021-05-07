react 和 ng 有个很大的不同点，在 ng 中代码继承是一个很重要的地方，比如我们有一个公共的组件，那么这个组件会在不同的地方不同的表单里去调用，这时候我们就可以写一个基类，这个基类中会写一些这个组件的公共方法之类的。但是在 react 中，我们是直接会把这个组件写好，然后到处去复用。并不是去继承的使用它。如果是非 UI 功能的话，建议是抽成一个公共函数，然后 import 。

## 生命周期

### 挂载

```js
constructor();
static getDeriveStateFromProps();
render();
componentDidMount();
```

### 更新

```js
static getDerivedStateFromProps();
shouldComponentUpdate();
render();
getSnapshotBeforUpdate();
componentDidUpdate();
```

### 卸载

```js
componentWillMount();
```

## react 数据绑定原理

react 数据变化后视图也会发生变化，在这个过程中发生了什么？
react 用官方的描述就是 UI=render（data） 当 data 发生变化的时候，那么 UI 视图就会进一步跟着变化。在 react 中不管是因为 state 发生了变化还是 props 发生了变化引起的 render 函数变化，从而导致了视图的更新，本质上都是因为数据的单向流动，造成了视图的更新。数据在发生变化的时候，react 会更新视图。
在数据发生变化的这个过程中，会发生 js 对象被渲染成 DOM 对象，会发生 Virtual Dom 更新，diff 算法计算要更新的那部分对象。

## react 渲染原理

在 15 版本之前渲染是不能被中断的，可能会造成卡顿，因为 js 一直占用着进程，会造成卡顿。
16 版本的 react 对渲染的流程做了改造，使得渲染可以被中断，可以被调度，让优先级更高的任务优先去渲染，从而让页面变的不卡顿。
16 的渲染过程

## react setState 同步和异步的区分

react 三种模式

1. legacy 模式 ReactDOM.render(<app />,rootNode)
2. blocking 模式 ReactDOM.createBlockingRoot(rootNode).render(<app />)
3. concurrent 模式 ReactDOM.createRoot(rootNode).render(<app />)

其中 2 3 是 concurrent 模式，当我们开启了 concurrent 模式以后，那么我们的更新就会出现优先级，优先级高的就会优先更新。

react 有三种模式，在不同的模式下 react 的 setState 的流程是不一样的。
legacy 模式下当我们在某个函数中去设置 setState 的时候，react 源码中有个性能优化的东西，叫 batchUpdates 批处理，当我们去批量设置了 setState 的时候，就会把多个 setState 合并成一个，只会触发一次 render ，这样会提高性能。在 react 内部有一个叫 batchUpdates 的函数，这个函数接收一个函数作为参数，在这个函数中去判断是不是批处理，如果被判断成批处理的时候，那么多个 setState 会合并成一个，只会触发一次 render，并且是异步执行的。如果需要别的函数同步的执行的话，那么就需要将传入的这个函数变成异步的，比如 setTimeout 之类的。
所以在 react 中，看 setSstate 是不是同步或者异步执行，分两种情况：

1. legacy 模式下，触发了 batchUpdates 时候是异步，很好理解，触发的时候，会将多个合并成一个执行，尽量减少 render ，当未触发的时候，那么就会同步执行。
2. 在 blocking 和 concurrent 模式下，一直是异步执行。

源码如下

```js
function scheduleUpdateOnFiber(fiber, expirationTime) {
  checkForNestedUpdates();
  warnAboutRenderPhaseUpdatesInDEV(fiber);
  var root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);

  if (root === null) {
    warnAboutUpdateOnUnmountedFiberInDEV(fiber);
    return;
  }

  checkForInterruption(fiber, expirationTime);
  recordScheduleUpdate(); // TODO: computeExpirationForFiber also reads the priority. Pass the
  // priority as an argument to that function and this one.

  var priorityLevel = getCurrentPriorityLevel();

  if (expirationTime === Sync) {
    if (
      // Check if we're inside unbatchedUpdates
      (executionContext & LegacyUnbatchedContext) !== NoContext && // Check if we're not already rendering
      (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
      // Register pending interactions on the root to avoid losing traced interaction data.
      schedulePendingInteractions(root, expirationTime); // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
      // root inside of batchedUpdates should be synchronous, but layout updates
      // should be deferred until the end of the batch.

      performSyncWorkOnRoot(root);
    } else {
      ensureRootIsScheduled(root);
      schedulePendingInteractions(root, expirationTime);

      if (executionContext === NoContext) {
        // Flush the synchronous work now, unless we're already working or inside
        // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
        // scheduleCallbackForFiber to preserve the ability to schedule a callback
        // without immediately flushing it. We only do this for user-initiated
        // updates, to preserve historical behavior of legacy mode.
        flushSyncCallbackQueue();
      }
    }
  } else {
    ensureRootIsScheduled(root);
    schedulePendingInteractions(root, expirationTime);
  }

  if (
    (executionContext & DiscreteEventContext) !== NoContext && // Only updates at user-blocking priority or greater are considered
    // discrete, even inside a discrete event.
    (priorityLevel === UserBlockingPriority$1 ||
      priorityLevel === ImmediatePriority)
  ) {
    // This is the result of a discrete event. Track the lowest priority
    // discrete update per root so we can flush them early, if needed.
    if (rootsWithPendingDiscreteUpdates === null) {
      rootsWithPendingDiscreteUpdates = new Map([[root, expirationTime]]);
    } else {
      var lastDiscreteTime = rootsWithPendingDiscreteUpdates.get(root);

      if (lastDiscreteTime === undefined || lastDiscreteTime > expirationTime) {
        rootsWithPendingDiscreteUpdates.set(root, expirationTime);
      }
    }
  }
}

function batchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= BatchedContext;

  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;

    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      flushSyncCallbackQueue();
    }
  }
}
```

## setSate 原理

在 react 中，我们组件自己的 state 发生了变化，就会导致组件的状态的更新。

在 this.setState 内部会调用 this.updater.enenqueSetState 方法

```js
Component.prototype.setState = function (partialState, callback) {
  if (
    !(
      typeof partialState === "object" ||
      typeof partialState === "function" ||
      partialState == null
    )
  ) {
    {
      throw Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
      );
    }
  }

  this.updater.enqueueSetState(this, partialState, callback, "setState");
};

// 这里的 callback 就是 this.setState({},functionCallBack)
// 在 enqueueSetState 方法中就是我们熟悉的从创建 update 到调度 update 的流程了。

function enqueueSetState(instance, payload, callback) {
  const fiber = getInstance(instance); // 获取实例，并命名为 fiber
  const eventTime = requestEventTime(); // 为调度做时间设置

  const suspenseConfig = requestCurrentSuspenseConfig();

  //获取优先级
  const lane = requestUpdateLane(fiber, suspenseConfig);
  // 创建 update
  const update = createUpdate(eventTime, lane, suspenseConfig);

  // 这里的 payload 就是 this.setState({...value}) 中的这个 {...value}
  update.payload = payload;

  // 如果有回调函数的话再赋值回调函数
  if (callback !== undefined && callback !== null) {
    update.callback = callback;
  }

  // 将 update 插入到 updateQueue
  enqueueUpdata(fiber, update);

  // 调度 update
  scheduleUpdateOnFiber(fiber, lane, eventTime);
}
```

## react hook

hooks 的理念是为了践行代数效应的思想，函数式组件本身是一个函数，在函数式的编程中，有个代数效应的理念，代数效应就是把副作用从我们的函数调用中剥离出去，也就是所谓的纯函数，在参数不变的前提下，不管输入多少次同样的参数，返回的值永远是一样的。

在 react 中 hook 和 class 是两种 code 编程的方法论

class 的话是数据和逻辑的封装。也就是说组件的方法和状态是封装在一起的。选择了类的方法就应该把相关的数据和操作都写在一个 class 里面。
hook 函数一般来说，一个函数就应该是干一件事，有多个操作就应该写多个函数，数据的状态和操作方法是分离的，根据这种理念呢，react 的函数组件就应该是只做一件事，返回 HTML 的代码，没有别的功能。

现在就知道 Hook 的作用是啥了，就是为了解决函数组件的副作用的问题，我们的函数组件所有的副作用是要在 hook 中解决的，针对很多的副作用 react 设计了不同的 hooks，当然我们不知道使用哪个副作用的 hook 的时候，就可以直接使用 useEffect 这个 hook。

React Hook 的设计目的是，组件就是一个纯函数，**如果需要外部的功能或者副作用的时候，就用钩子将这部分的代码钩进来**。
需要什么样的功能，就使用什么样的钩子。如果官方的钩子不能满足要求，就可以开发自己的钩子。

### 基础钩子

- useState 保存状态
- useEffect (didUpdate) didUpdate 可能有副作用的函数，引入副作用
- useContext(context) 保存上下文。
- useReducer action 钩子

精简代码，逻辑层的组件封装，代码的可读性提升，封装高阶组件，打个比方 antd 中的 table 就可以封装成 useTable ，基本上我们的业务代码中的 table 这样的组件，会有基本相同的使用方法，像刚加载的时候请求数据，默认排序，分页，等等的一些业务逻辑，有了 hook 就可以封装一个基类，然后使用的地方直接去使用就可以了。或者是表单的一些校验逻辑也可以封装成 hook 然后到处去复用。

不好的点：
hook 不怎么擅长处理异步的问题，当有大量的异步操作的时候， class 或许是一个比较好的选择。
依赖的问题，在 hook 中依赖是一个比较大的问题，当我们的依赖发生了变化的时候，hook 就会被更新，当依赖所依赖的对象变化的时候，hook 也可能会被更新，所以这个链条是比较麻烦的，可能会出现 hook 发生了变化，但是不是当前 hook 依赖变化了，而是依赖的依赖变化了，这个链条上不容易控制。

hook 的展望：react 官方在 12 月的时候提出了一个 server components 提案运行在服务端的 react 组件。函数组件，写了以后可以在客户端使用也可以在服务端使用，当然这个功能使用的前提是 concurrent mode 使用变的稳定，
