/**
 * @description 堆排序
 * @author lipc
 * @date 29/03/2021
 * 1 构造堆，一般降序是大顶堆，升序是小顶堆
 * 2 交换第一和末尾的值，继续在 0 ~ n-1 个值中构造堆
 * 3 重复 1 2 直到数组长度是 1 。
 * @param {*} params
 */
function heap (params) {

}

/**
 * @description
 * @author lipc
 * @date 30/03/2021
 * @param {*} arr 需要交换的目标数组
 * @param {*} i 交换的值
 * @param {*} j
 */
function swap (arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * @description 构建堆，当堆顶的元素是最大的时候，就是大顶堆，当堆顶的元素是最小的时候，就是小顶堆
 * @author lipc
 * @date 30/03/2021
 * @param {*} arr
 * ! 堆是这样的一个完全二叉树，父节点总是大于或者等于左右孩子节点。这是大顶堆
 * ! 父节点总是小于或者等于左右孩子节点，这是小顶堆
 * ! 完全二叉树，除了最后一层，别的节点都是满的，完全填充，
 * 如何构造一个堆？
 * 1 先构造一个完全二叉树
 * 2 然后将二叉树数据移动，完成一个堆
 *
 * 1 怎么构造一个完全二叉树
 * 完全二叉树是
 */
function heapFactory (arr) {
    const size = arr.length;

    function maxHeapify (i) {
        let max = i;

        // 中断递归
        if (i >= size) {
            return;
        }

        const left = i * 2 + 1;

        const right = i * 2 + 2;

        // 当前节点和左右节点哪个大，当当前节点小于左右的时候，就交换值
        if (left < size && arr[left] > arr[max]) {
            // 调整小顶对的时候这里变成小于
            // 这时候当前的节点的值小于左边孩子值。
            max = left;
        }

        if (right < size && arr[right] > arr[max]) {
            // 调整小顶对的时候这里变成小于
            // 当前节点的值小于右孩子值。
            max = right;
        }

        // 这时候 max 就是自己，终止递归
        if (max === i) {
            return;
        }

        const temp = arr[i];
        arr[i] = arr[max];
        arr[max] = temp;

        return maxHeapify(max)
    }

    // 我们通过 for 循环递归调动 maxHeapify 函数，就可以构建一个完全二叉树出来，但是我们需要一个堆，那么对于堆来说需要调整上面的完全二叉树
    // 完全二叉树的叶子节点是不需要调整的，需要调整的是非叶子节点，那么在完全二叉树中非叶子节点是 数组的长度/2取整数，那么在这个数字之前的值，就是需要我们做调整的值


    // 这里是比较关键的地方，我们需要构建一个大顶堆出来，这时候就需要处理中间的叶子节点。

    const unLeafIndex = Math.floor(arr.length / 2);

    for (let i = unLeafIndex; i >= 0; i--) {
        maxHeapify(i)
    }

    return arr; // 这时候，就获取了一个大顶堆，如果要小顶堆的话就把上面的值变成小于
}