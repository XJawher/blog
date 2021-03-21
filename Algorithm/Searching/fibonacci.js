function fibonacciFactory (size) {
    // 默认的 0 1 都是1，我这里就直接全部的值都赋值为 1
    const fibonacciArray = Array.from({length: size}, () => 1)

    for (let index = 0; index < fibonacciArray.length; index++) {
        const element = fibonacciArray[index];
        // fibonacci 函数  f(n) = f(n-1) + f(n-2)
        if (index >= 2) {
            fibonacciArray[index] = fibonacciArray[index - 1] + fibonacciArray[index - 2]
        }
    }

    return fibonacciArray;
}