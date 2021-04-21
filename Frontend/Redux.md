## redux 用途

redux 的设计初衷是为了确定数据的流向，也就是当确定的状态发生变化的时候，知道数据是从哪里来的，要去往哪里这种可以预测的行为。
所以在 redux 中有很重要的一点就是在应用程序中我们要遵循一个特定的约束：应用的状态需要存储为纯数据的格式，用普通的对象描述状态的改变，用不可更新的纯函数式方式来处理状态的变化。

## 核心思想

redux 的核心思想很简单，state 里的特定对象只能被对应的特定 action 改变，action 是一个普通的 js 对象，里面有改变这个 state 对象的原因和值（这里使用 action 的好处就是我们知道 state 为什么发生变化，变化的源头在哪里）。现在我们要把 action 和 state 联系到一起，这时候就需要一个 reducer 函数，这个函数很简单接收两个参数，一个 state 一个 action ，函数的内容是判断 action 里 type 条件然后再更新 state 的值。
核心思想就是上面的这部分内容，非常简单，下面用代码再描述一下

```js
// state
{
    number : 1,
    data : []
}

//  现在吗，我们要改变 state 中的 number ，这时候需要发起一个 action
// action number
{
    type: 'CHANGE_NUMBER_FROM_TEST',
    value: 2
}

// action data
{
    type: 'CHANGE_DATA_FROM_TEST',
    data: [1,2,3]
}
// 使用 reducer 函数改变 state 中的 number 值
function reducer_number(state=0,action) {
    if(action.type === 'CHANGE_NUMBER_FROM_TEST') {
        // 这时候就知道是在这种条件下，我们的 number 发生了变化
        // 这里可以做很多事情
        return action.value;
    }
    return state;
}

// 改变 data 的值
function reducer_data(state=[],action) {
    if(action.type === 'CHANGE_DATA_FROM_TEST') {
        return action.data;
    }
    return state;
}

// 再开发一个函数，用来统一管理 reducer 函数。

function reduceAll (state,action) {
    return {
        number: reducer_number(state.number,action),
        number: reducer_data(state.data,action),
    }
}
```

可以在上面的代码中看出来，redux 的思想确实是很简单，特定的 action 通过 reducer 去改变 state 中的特定的值。单向的数据流动，追溯数据的来源和去向。

## 三大原则

### 单一数据源

整个应用的 state 是被存储在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

### state 只读

唯一改变 state 的方法就是 action。用 action 记录为什么发生变化，改变的理由是什么。

### 使用纯函数执行 action

我们的 action 和 state 要关联起来，就需要编写 reducers。通过 reducer 进行关联。
所谓的纯函数：就是我传参数比如说是 1，他返回了 2，那么不管我传多少次参数 1 ，中间经过多长时间传参数 1 ，他的返回结果要一直保持唯一，那就是 2 。不能发生任何的变化。
