// const canvas = document.getElementById("canvas");

// const context = canvas.getContext('2d')

// /**
//  * @description
//  * @author lipc
//  * @date 10/05/2021
//  * @param {*} x 长
//  * @param {*} y
//  * @param {*} width 宽
//  * @param {*} height 高
//  * @param {*} borderColor 线条的颜色
//  * @param {*} fillBackColor 内部填充的颜色
//  * @param {*} lineWidth 线宽
//  */
// function rectAngular (x, y, width, height, borderColor, fillBackColor, lineWidth) {
//     context.beginPath();
//     context.moveTo(x, y)
//     context.lineTo(width, y);
//     context.lineTo(width, height);
//     context.lineTo(x, height);
//     context.lineTo(x, y)
//     context.lineWidth = lineWidth;
//     context.strokeStyle = borderColor;
//     context.fillStyle = fillBackColor;
//     context.fill();
//     context.closePath();
//     context.stroke();
// }

// // for (let index = 0; index < 4; index++) {
// //     const x = 100 + index * 50;
// //     const y = 400 - index * 50;
// //     if (y > 0) {
// //         rectAngular(x, x, y, y, "red", "yellow", 5);
// //     }
// // }

// // 线条属性
// context.beginPath();
// context.moveTo(50, 50)
// context.lineTo(50, 100)
// context.lineWidth = 35;
// context.lineCap = 'round';
// context.strokeStyle = 'red';
// context.stroke();

// context.beginPath();
// context.moveTo(100, 50)
// context.lineTo(100, 100)
// context.lineWidth = 35;
// context.lineCap = 'square';
// context.strokeStyle = 'green';
// context.stroke();


// context.beginPath();
// context.moveTo(150, 50)
// context.lineTo(150, 100)
// context.lineWidth = 35;
// context.lineCap = 'butt';
// context.strokeStyle = 'yellow';
// context.stroke();

const normal = document.getElementById('normal')
const canvas = document.getElementById('canvas')
const debounceInput = document.getElementById('debounce')

function ajax (params) {
    console.log(`this is ajax: ${params}，times: ${new Date().toLocaleString()}`);
}

/**
 * 节流，在指定的时间范围内，只执行最后一次的。
 * 时间范围是确定的，每次都要看下最后一次的时间和当前的时间差值，是不是满足 大于 执行时间，当大于的时候，就执行，当小于的时候，将当前的 time
 * out 清空，等待下一次
 * @param {*} params
 */

function throttleFunction (fn, interval) {
    // 这个函数的核心思想是在 interval 的时间里，执行第一次进来的函数
    let last = 0;
    let timer = null;

    return function() {
        const context = this;

        const args = arguments;

        const now = +new Date(); // 这一步是将日期转成 number

        if (now > last + interval) {
            // 这里是两种情况
            // 1 第一次进来，那么因为 last 是 0；interval + last 必然是比 now 小的
            // 2 不是第一次进来，而是一直在输入，last 的值 + interval 已经是大于当前的 now
            last = now;
            fn.apply(context, args);
        } else {
            clearTimeout(timer);

            timer = setTimeout(() => {
                last = now;
                fn.apply(context, args);
            }, interval);
        }
    };
}

function debounce (fn, delay) {

    let timer = null;

    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    };
}

let throttleAjax = throttleFunction(ajax, 1000)
let debounceAjax = debounce(ajax, 1000)

normal.addEventListener('keyup', function(e) {
    throttleAjax(e.target.value)
})

debounceInput.addEventListener('keyup', function(e) {
    debounceAjax(e.target.value)
})

