
/**
 * @description
 * @author lipc
 * @date 18/03/2021
 * @param {Array<number>} params,需要排序的数组
 * @param {number} len,当前的第几个元素。
 * 1 从第一个元素开始，就默认这个元素是排好序的了
 * 2 取出下一个元素，在已经排序的元素中从后向前扫描
 * 3 如果该元素，大于新元素，将该元素移动到下一个位置
 */
function insert (params, len = params.length - 1) {
    // 默认的第一个元素是 数组的最后一个元素。
    console.log(params, params[len])
    for (let index = 0; index < params.length; index++) {
        const element = params[index];

    }
}

insert([1, 3, 4, 5], 3);