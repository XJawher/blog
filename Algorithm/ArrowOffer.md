## 数组中重复的数字

在一个长度是 n 的数组中，所有的数字都在 0 - n-1 范围内，数组中的某些数字是重复的，但是不知道几个数字是重复的，也不知道重复了几次，请找出数组中任意一个重复的数字
**要求时间复杂度 O(n)，空间复杂度 O(1)**
这个题目的解题方法还是很多的

1. 如果不限制空间复杂度和时间复杂度的话，就可以直接用循环将所有的元素循环一遍，然后声明一个新变量，将重复的元素 ++ 这样的话就可以找到重复的元素了，但是这样的话，空间复杂度就提高了。不符合要求，要让空间复杂度降低的话，就需要循环自己，不能有新的变量出现
2. 先做排序，然后数组元素做相邻对比，这样的话也可以得到结果。但是不符合要求。
3. 对数组做循环，将值是 i 的元素，调整到第 i 个位置上，当遇到第 i 个位置已经有相同的元素的时候，就得到对应的值了。

我们写第三种方案的代码

```js
const data = [1, 2, 3, 4, 5, 2, 4, 3];

function findIndexFromArray(arr) {
  // 这部分可以直接省略，因为后面的循环，如果是没有找到的话，下面会直接返回 -1
  //   if (!arr.length) {
  //     return -1;
  //   }

  for (let i = 0; i < arr.length; i++) {
    // 将值是 i 的元素调整到第 i 个位置上
    const j = arr[i];
    while (i !== j) {
      // 当 i 元素和arr【i】的值不一致的时候，
      // 这个算法的核心是这样的，找到值是 j 的元素，在 arr[j] 这个位置上，有没有已经存在的值
      console.log("swap while before return j === arr[j]", { i, j });
      if (j === arr[j]) {
        console.log("j === arr[j]", { i, j }, arr[j]);
        return j;
      }

      // 这里就需要交换 arr[i] 位置 和 arr[j] 位置的值
      console.log("swap while after return j === arr[j]", { i, j });
      swap(arr, i, j);
    }
    console.log("swap  out of while return j === arr[j]", { i, j });
    swap(arr, i, j);
  }
  console.log("out of for loop");
  return -1;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

findIndexFromArray(data);
```
