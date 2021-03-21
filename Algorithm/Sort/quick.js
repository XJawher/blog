/**
 * @description
 * @author lipc
 * @date 20/03/2021
 * 快速排序有很多种算法实现， optimization 的版本有很多，这里先写一个最基础的
 */

function quickBase (arr) {
    if (!arr || !arr.length) return [];

    // 中断递归的条件
    if (arr.length < 2) return arr;

    // 基准值的选择,基准值的选择有很多的方案,有的是直接选择的数组开头的值，有的是选择的数组最后的值，还有的是选择的随机的值。

    // 随机
    const pivot = Math.floor(Math.random() * arr.length)

    // 开头
    // const pivot = 0
    // 结尾
    // const pivot = arr.length - 1

    // 声明左右数组，大的往 big 走，小的往 small 走
    const smallArray = [];
    const bigArray = [];

    // 按照 pivot 的值选择数据


    for (let index = 0; index < arr.length; index++) {
        // 相等的可以放到大的组也可以放到小的组
        if (arr[pivot] >= arr[index] && index !== pivot) {
            // 大的值进大的数组
            bigArray.push(arr[index])
        }

        if (arr[pivot] < arr[index] && index !== pivot) {
            // 小的值进小的数组
            smallArray.push(arr[index])
        }
    }
    return [...quickBase(bigArray), arr[pivot], ...quickBase(smallArray)]
}

module.exports = {quickBase};