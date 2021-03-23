算法部分为 Sorting,Searching,Recursion,Backtracking,DP,DFS,BFS,Union Find Big O,Time vs space

## Sorting

排序算法有很多，最简单的就要数冒泡了，这个就不写了很简单。
目前我查到的 v8 在长度小于 10 的 时候是采用的插入排序，当大于 10 的时候采用的是插入排序，因此在这里就重点掌握这两种排序的算法。

### 插入排序

插入的工作原理是通过构建有序的序列，对没有排序的数据，在已经排序的序列中从后向前扫描，找到相应的位置并插入。插入排序在实现上通常是采用 in-place 排序，既只需要用到 O(1)的额外空间的排序。因而在扫描的过程中，需要反复把已经排序的元素逐步向后进行位移，为最新元素提供插入空间。
一般来说算法的实现是这样的

1. 从第一个元素开始，元素被认为是已经被排序。
2. 取出下一个元素，在已经排序的元素中从后向前扫描。
3. 如果该元素（已排序）大于新元素，将该元素移动到下一个位置。
4. 重复步骤 3 ，直到找到已经排序的元素小于或者等于新元素的位置。
5. 将新元素插入到该位置后。
6. 重复步骤 2~5

**插入排序的算法复杂度**
如果是把 n 个元素的序列进行升序排列或者降序排序，那么插入排序就存在着最好和最坏的情况，最好的情况是序列已经是升序排序了，在这种情况下，需要进行的比较操作是 n-1 即可。最坏的情况就是序列是降序排列，那么此时需要进行的比较就是 $\frac{1}{2}$n(n-1)，插入排序的赋值操作是比较操作的次数减去 n-1 次，因为在 n - 1 循环中，每一次循环的比较都比赋值多一个，多在最后的那个比较并不能带来赋值。平均来说插入排序的算法复杂度是 O($n^2$)。所以插入排序不适合大量的数据，当数据是千这个级别的时候，比较适合。或者数据是有一定的规律。
以下是代码算法实现。

```js
/**
 * @description
 * @author lipc
 * @date 18/03/2021
 * @param {Array<number>} params,需要排序的数组
 * @param {number} len,当前的第几个元素。
 * 1 从第一个元素开始，就默认这个元素是排好序的了
 * 2 取出下一个元素，在已经排序的元素中从后向前扫描
 * 3 如果该元素，大于新元素，将该元素移动到下一个位置
1. 从第一个元素开始，元素被认为是已经被排序。
2. 取出下一个元素，在已经排序的元素中从后向前扫描。
3. 如果该元素（已排序）大于新元素，将该元素移动到下一个位置。
4. 重复步骤 3 ，直到找到已经排序的元素小于或者等于新元素的位置。
5. 将新元素插入到该位置后。
6. 重复步骤 2~5
 */
function insert(params) {
  // 默认的第一个元素是 数组的最后一个元素。
  for (let i = 0; i < params.length; i++) {
    for (let j = i; j > 0; j--) {
      // 这里是比较关键的地方，跳出的条件和循环的条件。
      if (params[j] > params[j - 1]) {
        // 这里是将 j 前面的所有的元素当做是一个新的数组，在这个数组中进行排序，因为排序是从 0 开始的
        // 可以认为每次开始之前的排序是都做好的，所以只需要对比一次就可以确定位置
        const tmp = params[j];
        params[j] = params[j - 1];
        params[j - 1] = tmp;
      }
    }
  }
  return params;
}
```

### 快速排序

快速排序使用了分治法策略来把一个序列分为较小和较大两个子序列，然后递归的排序这两个子序列。

1. 挑选基准值：从数列中选择一个元素，称之为 “基准”（pivot）
2. 分割：重新排序子序列，所有比基准值小的放在左边，比基准值大的放在右边，于基准值相等的可以不变，这个分割结束以后对于基准值的分割就结束。
3. 递归排序子序列：递归的将步骤 2 排序好的左右序列进行递归排序。

递归到底部的判断条件是数量的大小是零或者一，此时的数列是已经有序的。
选取基准值对算法的性能有一定的影响。
在 V8 的 sort 算法中选择的是插入和快排，数量小的时候采用插入，数量大的时候选择的是快排。这是因为快排是一种最佳和平均时间复杂度都可以是$xlog(x)$,是一种应用非常广泛的排序算法。
快排的核心就是不断的把数组进行切分，切分成小数组以后继续将小数组进行切分。

代码实现

```js
function quickBase(arr) {
  if (!arr || !arr.length) return [];

  // 中断递归的条件
  if (arr.length < 2) return arr;

  // 基准值的选择,基准值的选择有很多的方案,有的是直接选择的数组开头的值，有的是选择的数组最后的值
  // 随机
  // const pivot = Math.floor(Math.random() * arr.length)
  // 开头
  // const pivot = 0
  // 结尾
  const pivot = arr.length - 1;

  // 声明左右数组，大的往 big 走，小的往 small 走
  const smallArray = [];
  const bigArray = [];
  // 按照 pivot 的值选择数据
  for (let index = 0; index < arr.length; index++) {
    // 相等的可以放到大的组也可以放到小的组
    if (arr[pivot] >= arr[index] && index !== pivot) {
      // 大的值进大的数组
      bigArray.push(arr[index]);
    }

    if (arr[pivot] < arr[index] && index !== pivot) {
      // 小的值进小的数组
      smallArray.push(arr[index]);
    }
  }
  return [...quickBase(bigArray), arr[pivot], ...quickBase(smallArray)];
}
```

上面的算法实现是一个很基础的版本，还有很多是社区里改进的版本。这里就不做更新了。

经过我的实际测算，pivot 对算法的时间有很大的影响，当 pivot 选择是 0 的时候，是时间消耗最大的，当是 10000 个 random 以后的数组的时候，pivot === 0 的时候耗时是 pivot === arr.length 的两三倍。可能的原因是分治不生效，时间复杂度就会上升，耗时就会增加。或者是 random 的生成的是以一种很特殊的规律在分布，而 0 开始的时候可能是相对逆序。

调查了一下，当面对很大的数据量的时候快排的效率其实不是很好的，但是 v8 还是采用这个，可能和前端的场景有关系，但是 node.js 应该会遇到很大的排序场景的吧，或者这是一种平衡的选择，对于很大数据排序这种是很小众的需求，没有考虑进去？我猜测是这样的。

## Searching

### 斐波那契查找/黄金分割查找

(Fibonacci search)[Fibonacci search](./Searching/fibonacci.js)

这个算法好绕啊，光看算法的思想就要好一会。先简单写一下算法的思想
![fibonacci](./Searching/fibonacci.png)
fibonacci 算法和二分法以及插值查找比较相似，仅仅是改变了中间的值的选择， mid 不再是中间值或者插值得到，而是位于黄金分割点附近，也就是 mid = low + f(k-1)-1，f 代表斐波那契数列，如上图所示。

### 二分查找法 Binary search algorithm

先暂时搁置斐波那契查找，将二分法吃透，吃透了以后再去吃透 斐波那契查找。
二分查找在算法中属于分治法，基本分治法的算法都是可以用递归来完成的。
[二分查找法 Binary search algorithm](./Searching/binarySearch.js)
二分法有个适用对象是一堆有序的数组，也就是使用的前提：

1. 有序
2. 数组

时间复杂度按优劣排差不多集中在：
O(1), O(log n), O(n), O(n log n), O(n2), O(nk), O(2n)

```js
/**
 * @description
 * @author lipc
 * @date 23/03/2021
 * @param {*} arr 目标数组，有序的目标数组
 * @param {*} low 范围的左侧小的那个值
 * @param {*} high 范围的右侧，大的那个值
 * @param {*} target 目标值。
 */
function binarySearch(arr, low, high, target) {
  if (low > high) {
    return -1;
  }

  // 计算出中间值，取整
  const mid = Math.floor((low + high) / 2);

  // 当 arr[mid] > target 说明当前的中间值大于目标值，我们的数组是有序数组，
  // 也就是当前的数组 mid 后面的所有值，都是大于目标值，所以后面的值不需要比较
  if (arr[mid] > target) {
    return binarySearch(arr, low, mid - 1, target);
  } else if (arr[mid] < target) {
    // 如果是当前的mid值小于目标值，那么说明当前mid 值的左边所有的值都是小于
    // 目标值的，那就是需要去后面大的值里去查找
    return binarySearch(arr, mid + 1, high, target);
  } else {
    return mid;
  }
}

/**
 * @description 所有的递归是都可以采用自行定义 stack 来解递归的，所以二分法也是可以不采用递归实现，
 * 因为二分法实际上是尾递归，它不关心递归前的所有信息
 * @author lipc
 * @date 23/03/2021
 * @param {*} arr 目标数组，有序的目标数组
 * @param {*} low 范围的左侧小的那个值
 * @param {*} high 范围的右侧，大的那个值
 * @param {*} target 目标值。
 */
function binarySearchTailRecursive(arr, low, high, target) {
  // 尾递归的思想
  while (low <= high) {
    // 还是同样的思想，当 arr[mid] > target 的时候，说明要在左边查找，那么就修改 high 的值
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] > target) {
      // 这时候的 high 就变成了 mid -1；
      high = mid - 1;
    } else if (arr[mid] < target) {
      // 当小于这个值的时候，说明要修改 low 的值，因为 mid 之前的所有值都是小于目标值
      low = mid + 1;
    } else if (arr[mid] === target) {
      // 说明找到了那个值，跳出循环
      return mid;
    } else {
      // 这里就说明是找不到这个值
      return -1;
    }
  }
}
```

## Recursion

## Backtracking

## DP

## DFS

## BFS

## Union Find Big O

## Time vs space
