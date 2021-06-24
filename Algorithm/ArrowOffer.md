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

## 第一个只出现一次的字符位置

在一个字符串中找到第一个只出现一次的字符。

```js
// 第一种方案，利用 weak Map 做哈希，然后循环找到 值是1 的第一个就可以

function findCharactor(str) {
  // 这里不能使用 weak map ，因为 weak map 只接受对象引用做为 key ，
  const charMap = new Map();
  for (let i = 0; i < str.length; i++) {
    if (charMap.has(str.charAt(i))) {
      charMap.set(str.charAt(i), false);
    } else {
      charMap.set(str.charAt(i), true);
    }
  }

  for (const [key, value] of charMap.entries()) {
    if (value) {
      return key;
    }
  }

  return -1;
}
```

## 二维数组中的查找

给定一个二维数组，每一行是从左到右递增，每一列是从上到下递增，现在给定一个数，判断在不在这个二维数组中。

**思路：** 一个二维数组，从左到右递增，从上到下也是递增，说明这个二维数组的较大值是在最右边，最大值是最后的那个值。现在给了一个值，那么就从第一行的最右边做对比，如果是大，那么从第二行开始，以此类推，当找到行数以后，再从这一样开始做对比，也是从右开始，一个一个的往左对比，直到找到那个值为止，如果找不到，说明就没有这个值，返回 -1

```js
/**
 * @description
 * @author lipc
 * @date 24/06/2021
 * @param {*} arr
 * @param {*} target
 * @return {*} 思路：二维数组的值左边的小，右边的大，在查找的时候，先和第一行的最后一个值比较，
 * 看大小情况，如果大于这个值，那么就往第二行的最后一个值比较，他如果小于第二行的最后一个值，说明这个
 * 目标值可能在第二行的左边，或者是第三行左侧，然后对比第二行倒数第二个值，如果这个值还是大于目标值
 * 继续比较第三个值，如果第三个值小于目标值，说明是在第三行的第三要继续找，因为这个二维数组的行和列
 * 都是递增的。
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
 */
function findTargetNumber(arr, target) {
  // 首先判断 arr 的状态，是不是符合一个二维数组
  if (!arr || !arr.length || arr[0].lenght) {
    return -1;
  }

  // 这里就是确定这个是二维数组，满足我们的要求的。
  // 按照一个从左到右依次递增的状态，那么首先我们要做的是找到总共有多少行，
  const row = arr.length;
  const col = arr[0].length;

  let indexRow = 0;
  let indexCol = col - 1;

  while (indexRow < row - 1 && indexCol >= 0) {
    if (arr[indexRow][indexCol] === target) {
      return true;
    } else if (arr[indexRow][indexCol] < target) {
      indexRow++;
    } else {
      indexCol--;
    }
  }

  console.log({ indexRow, indexCol });

  return false;
}
```
