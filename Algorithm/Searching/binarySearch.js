
/**
 * @description
 * @author lipc
 * @date 23/03/2021
 * @param {*} arr 目标数组，有序的目标数组
 * @param {*} low 范围的左侧小的那个值
 * @param {*} high 范围的右侧，大的那个值
 * @param {*} target 目标值。
 */
function binarySearch (arr, low, high, target) {
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
        return mid
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
function binarySearchTailRecursive (arr, low, high, target) {

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
            return mid
        } else {
            // 这里就说明是找不到这个值
            return -1
        }
    }
}


const test = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const data = binarySearchTailRecursive(test, 0, test.length, 22)
console.log(data);