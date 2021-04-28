## 查找的性能比较

写了一下震惊体标题 啊哈哈哈

```js
function speedSome() {
  console.time("speedSome");
  const numberList = [];
  for (let index = 0; index < 100000; index++) {
    numberList.push(index);
  }
  const result = numberList.some((item) => item > 89999);
  console.log(result);
  console.timeEnd("speedSome");
}

function speedEvery() {
  console.time("speedEvery");
  const numberList = [];
  for (let index = 0; index < 100000; index++) {
    numberList.push(index);
  }
  const result = numberList.every((item) => item < 89999);
  console.log(result);
  console.timeEnd("speedEvery");
}

function speedFind() {
  console.time("speedFind");
  const numberList = [];
  for (let index = 0; index < 100000; index++) {
    numberList.push(index);
  }
  const result = numberList.find((item) => item > 89999);
  console.log(result);
  console.timeEnd("speedFind");
}

function speedFindIndex() {
  console.time("speedFindIndex");
  const numberList = [];
  for (let index = 0; index < 100000; index++) {
    numberList.push(index);
  }
  const result = numberList.findIndex((item) => item > 89999);
  console.log(result);
  console.timeEnd("speedFindIndex");
}

speedSome();
speedEvery();
speedFind();
speedFindIndex();

// speedSome: 4.31103515625 ms
// speedEvery: 4.7216796875 ms
// speedFind: 3.966796875 ms
// speedFindIndex: 4.39013671875 ms
// chrome 版本 88.0.4324.104（正式版本） （64 位）
```

上面的数据我测试了好几次，基本 find 的性能会好一丢丢。确实是有点无聊了哈哈哈
