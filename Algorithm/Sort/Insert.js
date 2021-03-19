
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
function insert (params) {
    // 默认的第一个元素是 数组的最后一个元素。
    for (let i = 0; i < params.length; i++) {
        for (let j = i; j > 0; j--) {
            if (params[j] > params[j - 1]) {
                console.log(params[i], params[j]);
                const tmp = params[j]
                params[j] = params[j - 1]
                params[j - 1] = tmp
            }
        }
    }
    return params;
}

insert([19, 3, 33, 2, 31, 43, 52, 45, 64]);