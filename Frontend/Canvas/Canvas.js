const canvas = document.getElementById("canvas");

const context = canvas.getContext('2d')

/**
 * @description
 * @author lipc
 * @date 10/05/2021
 * @param {*} x 长
 * @param {*} y
 * @param {*} width 宽
 * @param {*} height 高
 * @param {*} borderColor 线条的颜色
 * @param {*} fillBackColor 内部填充的颜色
 * @param {*} lineWidth 线宽
 */
function rectAngular (x, y, width, height, borderColor, fillBackColor, lineWidth) {
    context.beginPath();
    context.moveTo(x, y)
    context.lineTo(width, y);
    context.lineTo(width, height);
    context.lineTo(x, height);
    context.lineTo(x, y)
    context.lineWidth = lineWidth;
    context.strokeStyle = borderColor;
    context.fillStyle = fillBackColor;
    context.fill();
    context.closePath();
    context.stroke();
}

// for (let index = 0; index < 4; index++) {
//     const x = 100 + index * 50;
//     const y = 400 - index * 50;
//     if (y > 0) {
//         rectAngular(x, x, y, y, "red", "yellow", 5);
//     }
// }

// 线条属性
context.beginPath();
context.moveTo(50, 50)
context.lineTo(50, 100)
context.lineWidth = 35;
context.lineCap = 'round';
context.strokeStyle = 'red';
context.stroke();

context.beginPath();
context.moveTo(100, 50)
context.lineTo(100, 100)
context.lineWidth = 35;
context.lineCap = 'square';
context.strokeStyle = 'green';
context.stroke();


context.beginPath();
context.moveTo(150, 50)
context.lineTo(150, 100)
context.lineWidth = 35;
context.lineCap = 'butt';
context.strokeStyle = 'yellow';
context.stroke();