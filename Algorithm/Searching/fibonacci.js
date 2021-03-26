/**
 * @description
 * @author lipc
 * @date 22/03/2021
 * @param {*} size
 * @return {*}  返回一个已经完成结构的 fibonacci 数列
 */
function fibonacciFactory (size) {
    // 默认的 0 1 都是1，我这里就直接全部的值都赋值为 1
    const fibonacciArray = Array.from({length: size}, () => 1)

    // 这里直接从 2 开始
    for (let index = 2; index < fibonacciArray.length; index++) {
        // fibonacci 函数  f(n) = f(n-1) + f(n-2)
        fibonacciArray[index] = fibonacciArray[index - 1] + fibonacciArray[index - 2]
    }

    return fibonacciArray;
}

/**
 * @description
 * @author lipc
 * @date 22/03/2021
 * @param {*} arr 目标值所在的数组
 * @param {*} key 需要查的值
 */
function fibSearch (arr, key) {
    // 先定义左右，也就是数组从哪里开始找和哪里结束找要定义下来。
    let low = 0;
    let high = arr.length - 1;

    // 表示 fibonacci 分割数值对应的下标
    // 因为我们的 mid = low + F(k - 1) - 1
    let k = 0;

    let mid = 0; // 存放 mid 的值

    const fibonacciArray = fibonacciFactory(5);

    // 获取 fibonacci 分割数值的下标
    // 当 high 小于等于  fibonacciArray[k] - 1 的时候，我们才找到对应的值
    while (high > fibonacciArray[k] - 1) {
        k++;
    }

    // 因为 fibonacciArray[k] 的值是可能大于数组的长度的，因此这里就需要补齐一下数组的长度
    // 新建一个数组，存放补齐的 arr
    const temps = [...arr]
    while (fibonacciArray[k] > temps.length) {
        temps.push(arr[high])
    }

    // 因为我们找到了 key 的值，也就是在上面的 fibonacciArray 中的那个标记值。

    while (low <= high) {
        mid = low + fibonacciArray[k - 1] - 1;

        if (key < temps[mid]) {
            // z这时候 key 小于 temps mid ，说明要继续想数组的前面部分也就是左边查找
            // 这时候就需要 让 高位变成  mid -1
            high = mid - 1;

            // 全部的元素是 前面的 + 后面的
            // f[k] = f[k-1] + f[k-2]
            // 而 f[k-1] = f[k-2] + f[k-3] 所以可以继续拆分
            // 也就是在 f[k-1] 的前面继续查找
            k--;
        } else if (key > temps[mid]) {
            // 这个条件说明我们应该要去数组的后面查找，也就是 low 的右边去查找
            low = mid + 1;

            // 全部的元素是 前面的 + 后面的
            // f[k] = f[k-1] + f[k-2]
            // 这时候和上面的不一样的地方在于，后面是有 f[k - 2] 个元素，所以可以继续拆分， f[k - 1] = f[k-3] + f[k-4]
            // 也就是在 f[k-2] 的前面继续查找
            k = k - 2;
        } else {

            // 到了这里了我们就找到了下标。
            // 但是这里需要注意是返回 mid 还是 high
            if (mid <= high) return mid;
            return high;
        }
    }

    return -1;
}


fibSearch([1, 2, 34, 3, 4], 3)


function Recursion (arr) {
    const index = arr.findIndex(item => Array.isArray(item));
    if (index === -1) {
        return arr
    }

    for (let j = 0; j < arr[index].length; j++) {
        arr.push(arr[index][j]);
    }

    arr.splice(index, 1);
    return Recursion(arr);
}


[1, [2, [3, [4, [5], [6, [8, [9, [0]]]], [7]]]]]