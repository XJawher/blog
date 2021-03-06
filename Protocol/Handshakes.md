TCP 协议是面向连接的，稳定的有重传机制的，有序的，全双工，有拥塞控制机制，相对 UDP 较慢，头部信息 20-60 字节，所以在建立连接的时候，需要有三次握手，用来确定连接建立稳定有序，拆除连接的时候，就需要四次挥手，用来保证数据的稳定传输。

## 三次握手

所谓的三次握手，就是指的建立一个 TCP 连接的时候，服务端和客户端需要发送三个包，才可以建立一个稳定的连接。三次握手的目的是连接服务器指定的端口，建立 TCP 连接，并同步连接双方的序列号，和确认号，交换 TCP 窗口大小信息。在 socket 编程中，客户端执行 connect() 的时候，就会触发三次握手，这个过程的示意图如下。

![三次握手过程示意图](../Image/threehandshake.png)

- 第一次握手（SYN=1 seq = x）:

  客户端发送一个 TCP 的 SYN 标志位置 1 的包，指明客户端打算链接的服务器的端口，以及初始序号 X，保存在包头的序列号 Sequence Number 字段里。发送完毕以后客户端进入 SYN_SEND 状态

- 第二次握手 SYN=1 ACK= 1 seq=y ACKnum = x + 1，服务器发送确认包（ack）应答，也就是 SYN 和 ACK 标志位都是 1，服务器端选择自己的 ISN 序列号，放到 Seq 域里，同时将确认号 number 设置为客户端的 ISN +1 也就是 X+1。发送完毕后服务器进入 SYN_RCVD 状态。
- 第三次握手 ACK = 1 ，ACKnum = y + 1 客户端再次发送确认包，SYN 标志位是 0 ，ACK 标志位是 1，并且把服务器发来的 ACK 序号段加一，放在确定字段中发送给对方，发送完毕后客户端进入 ESTABLISHED 阶段，当服务器端接收到这个包的时候，也进入 ESTABLISTED 状态，TCP 结束。

## 四次挥手

TCP 的拆除需要发送四个包，客户端和服务器端任意一方都可以发起挥手动作。

- 第一次挥手， FIN = 1.seq = x 假设客户端要中断链接，客户端发送一个 FIN 标志位 1 的包，表示自己没有数据可发送了，但是任然可以接接收数据，发送完毕以后进入 FIN_WAIT_1 状态。
- 第二次挥手 ACK = 1 ACKnum = x + 1 服务器端确认客户端的 FIN 包，发送一个确认包，表明自己接到客户端关闭连接的请求，但是还没准备好关闭连接。发送完毕后服务器进入 CLOSE_WAIT 的状态，客户端接收到这个包以后进入 FIN_WAIT2 状态。等待服务器关闭连接
- 第三次挥手 FIN = 1，seq = y 服务器端准备好关闭连接的时候，向客户端发送 FIN = 1 的包，发送完以后服务器端进入 LAST_ACK 状态，等待来自客户端的最后一个 ACK。
- 第四次挥手 ACK = 1 ，ACKnum = y + 1. 客户端接收到来自服务器端的关闭请求，发送一个 确认包，并进入 TIME_WAIT 阶段，等待可能要出现重传的 ACK 包，服务器在接收到这个确认包以后，关闭连接，进入 CLOSE 状态，客户端在等待了 2MSL 两个最大段生命周期之后，没有手段服务器端的 ACK，这时候就是认为服务器端已经正常关闭连接，于是自己也关闭连接，进入 CLOSE 的状态。

![四次挥手](../Image/four-hands-shake.png)

## SYN 攻击

在三次握手的过程中，服务器在发送了 SYN_ACK 以后，收到客户端的 ACK 之前的 TCP 连接称之为半连接
SYN 攻击指的是在短时间内伪造大量不存在的 ip，向服务器不停的发送 SYN 包，服务器回复确认包，等待客户端的回应，因为 ip 源地址是伪造的，因此服务器一直得不到回应，这时候服务器就需要一直重发，直到超时，这些伪造的 SYN 包就会一直占用连接通道，正常的 SYN 包就会被抛弃，导致服务器网络拥塞或者系统瘫痪。

一般在服务器上出现大量的半连接，且 ip 是无序的时候，就可以认为是有人发起了 SYN 攻击。防御 SYN 攻击就需要缩短 SYN 超时时间，增加最半连接数，过滤网关防护。
