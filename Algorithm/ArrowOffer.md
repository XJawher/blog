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

## 重建二叉树

根据二叉树的前序遍历和中序遍历的结果，重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

二叉树的遍历分三种情况，前序遍历，中序遍历，后序遍历。

* 前序遍历：中 -> 左 -> 右
* 中序遍历：左 -> 中 -> 右
* 后续遍历：右 -> 中 -> 左

```js
// 缓存中序遍历中数组每个值对应的索引

const mapMidIndex = new WeakMap()

function reconclier
```

## 斐波那契数列

斐波那契数列又称作黄金分割数列，指的是这样的一组数列， 0 1 1 2 3 5 8 13 21 。。。

f(0) = 0; f(1) = 1; f(2) = 1;f(n) = f(n-1) + f(n-2) n>=2
现在要求，输入 n，找到 f(n) = ? n < 39;

```js
  // 斐波那契的算法很多，其中最简单粗暴的就是用递归去做 ，但是递归有个问题，就是很容易爆栈
  // 现在算法的核心思想是 f(n) = f(n-1) + f(n-2) n>2
  function recursion(n){
    if(n < 2) {
        return n;
    }
    return recursion(n -1) + recursion(n -2)
  }
  // 这个解法，有个问题，就是很容易爆栈，因为我们的函数在调用的时候，会形成一个调用栈，每一个栈里面都会保存函数调用时候的变量等等
  // 当调用的栈很深的时候,就会出现爆栈的情况.这时候需要做优化,一般处理的情况是使用尾递归,所谓的尾递归,就是最后递归的那一步
  // 调用的是一个函数,不是返回值,那么这时候,就出现我不管调用栈是多深,最后那一个调用是一个函数,函数在执行完以后,就会被出栈
  // 这样就不会有变量被保存了、现在我们优化一下上面的代码
  function recursionBetter(n,ac1=1,ac2=1){
    if(n < 2) {
        return ac2;
    }
    return recursionBetter(n-1,ac2,ac1+ac2)
  }
```
## 跳台阶
一个楼梯有 n 阶，现在能一步两步上去，那么总共有多少种方法可以上去
这是一个动态规划的问题，这个问题的核心思想是  f(n) = f(n-1) + f(n-2) 和上面提到的 斐波那契 一样，可以用递归解决，我们这里采用另外的一种方案。

```js
function jump2 (n,step1 = 2,step2 = 1) {
  if(n <=2) return step2;
  return jump2(n-1,step1,step1+step2)
}

function jump3(n){
  if(n === 1) return 1;
  if(n === 2) return 2;
  return jump3(n-1) + jump3(n-2);
}

function jump4(n) {
  if(n <= 2) return n;
  let step1 = 1;
  let step2 = 2;
  let res = 0;
  for(let i =2;i<n;i++){
    res = step1 + step2;
    // 这一步的理解要这样，上面的执行完以后，这时候 res = 1 + 2 = 3，那么就要用 res 的值作为新的 step2 的值，那么以前的 setp2 的值变成 step1 的值
    // 这样的话，就成了一个循环
    step1 = step2;
    step2 = res;
  }
  return res;
}
```
## 跳楼梯 变态版
描述：既可以一次跳一格，也可以一次跳N个，那么最多是多少种方法
```js
// 用动态规划做
function jump5(n) {

  const arr = new Array(n).fill(1);


  for(let i = 1; i < n; i++) {

    for(let j = 0; j < i; j++) {
      arr[i] += arr[j]
    }
  }
  return arr[n-1]
}


function jump6(n) {
  return Math.pow(2,n-1)
}

```