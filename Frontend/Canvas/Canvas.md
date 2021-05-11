## 画条线

**canvas** 是基于状态的绘制。前几步都是在确定状态，最后一步才会具体的绘制。

### 移动画笔 moveTo

之前我们获得了画笔，context 所以以此为例，给出方法的使用实例，`context.moveTo(100,100)` 这句代码的意思是移动画笔到 (100,100) 这个点，单位是 px。canvas 是画布上左上角为笛卡尔坐标系的原点，Y 轴是垂直向下，X 轴向右。

### 画笔停点 (lintTo())

同理的 `context.lineTo(600,600)` 这句的意思是从上一笔的停止点绘制到 (600,600) 不过 moveTo(100,100) 到 lineTo(600,600) 都只是状态而已，是规划，是我准备要画，还没开始画。这是几个计划。

### 选择画笔

这里我们暂停只设置一下画笔的颜色和粗细。 `context.lineWidth = 5`，这句话意思是设置画笔为 5px、context.strokeStyle = '#000000' 这句话的意思是设置颜色为黑色。因为 Canvas 是基于状态绘制的，所以我们在选择画笔粗细和颜色的同时，其实也是选择了线条的粗细和颜色。

### 确定绘制

确定绘制只有两种方法，fill() 和 stroke() fill 是填充，stroke 是描边。

### 画个线条

```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.lineWidth = "5px";

context.moveTo(100, 100);
context.lineTo(100, 200);
context.lineTo(200, 100);
context.lineTo(200, 600);
context.strokeStyle = "red";

context.moveTo(200, 200);
context.lineTo(300, 200);
context.lineTo(200, 100);
context.lineTo(200, 600);
context.strokeStyle = "black";

context.stroke();
```

### 初识 beginPath()

上面的代码里原本我们以为画出来的线一条是红色，一条是黑色的，但是画出来的两条都是黑色。因为 canvas 是基于状态的，也就是上面的红色的线先被画出来，但是后面的线开始画的时候，上面的线又会被画一遍，由于宽度我们是统一设置的，因此就是线宽是一样的，但是后面设置了黑色的颜色，就变成黑色。
如果想要设置成红色和黑色的话，就需要使用 beginPath()，也就是 beginPath 和 stroke 做成闭合的。

```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.lineWidth = "5px";

context.beginPath();
context.moveTo(100, 100);
context.lineTo(100, 200);
context.lineTo(200, 100);
context.lineTo(200, 600);
context.strokeStyle = "red";
context.stroke();

context.beginPath();
context.moveTo(200, 200);
context.lineTo(300, 200);
context.lineTo(200, 100);
context.lineTo(500, 600);
context.strokeStyle = "black";
context.stroke();
context.closePath();
```

### closePath

使用 closePath() 做闭合

```js
context.beginPath();
context.moveTo(100, 100);
context.lineTo(300, 100);
context.lineTo(300, 500);
context.lineTo(100, 500);
context.lineTo(100, 100);
context.strokeStyle = "black";
context.lineWidth = 5;
// context.closePath(); 不加 closePath 的时候，就会有个缺口
context.stroke();
```

### fill 上色

fillStyle = '#xxxx'是填充颜色的一个很重要的属性

```js
context.beginPath();
context.moveTo(100, 100);
context.lineTo(300, 100);
context.lineTo(300, 500);
context.lineTo(100, 500);
context.lineTo(100, 100);
context.strokeStyle = "black";
context.lineWidth = 5;
context.fillStyle = "red";
context.fill();
context.closePath();
context.stroke();
```

### 封装一个矩形的方法

```js
function rectAngular(
  x,
  y,
  width,
  height,
  borderColor,
  fillBackColor,
  lineWidth
) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(width, y);
  context.lineTo(width, height);
  context.lineTo(x, height);
  context.lineTo(x, y);
  context.lineWidth = lineWidth;
  context.strokeStyle = borderColor;
  context.fillStyle = fillBackColor;
  context.fill();
  context.closePath();
  context.stroke();
}

for (let index = 0; index < 4; index++) {
  const x = 100 + index * 50;
  const y = 400 - index * 50;
  if (y > 0) {
    rectAngular(x, x, y, y, "red", "yellow", 5);
  }
}
```

### 线条的属性

线条的属性有四个

- lineCap 定义上下文中线的端点，可以有三个值

  - butt 默认值，端点是垂直于线段边缘的平直边缘
  - round 端点是在线段边缘处以线宽为直径的半圆
  - square 端点是以线宽为长，以一半的线宽为宽的矩形

- lineJoin 属性

  - miter 默认值，在连接处边缘延长相接，miterLimit 是角长和线宽所允许的最大比例值 默认是 10
  - bevel 连接处是一个对角线斜角
  - round 连接处是一个圆

- 线宽 lineWidth
- 笔触样式 strokeStyle

```js
// 线条属性
context.beginPath();
context.moveTo(50, 50);
context.lineTo(50, 100);
context.lineWidth = 35;
context.lineCap = "round";
context.strokeStyle = "red";
context.stroke();

context.beginPath();
context.moveTo(100, 50);
context.lineTo(100, 100);
context.lineWidth = 35;
context.lineCap = "square";
context.strokeStyle = "green";
context.stroke();

context.beginPath();
context.moveTo(150, 50);
context.lineTo(150, 100);
context.lineWidth = 35;
context.lineCap = "butt";
context.strokeStyle = "yellow";
context.stroke();
```
