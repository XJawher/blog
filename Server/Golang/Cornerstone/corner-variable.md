# 变量

这部分的内容大多数是来自 [go 语言指南](https://tour.go-zh.org/basics/1)，和 [使用 go 创建一个 web 服务端](https://github.com/XJawher/build-web-application-with-golang/blob/master/zh/02.2.md)

## 变量的定义

在 go 中变量的定义分如下的几种

1. var
2. :=
3. \_,b = 11,12 这时候会丢弃 11 将 12 赋值给 b 。下划线 是一个比较特殊的地方。
4. 常量 const 这个和 js 比较类似

### var

```go

    type Name struct {
        name:string
    }

    var variable_test Name

    // 上面的代码定义了一个 类型 是 Name 的变量。variable_test

    var variable_test1,variable_test2,variable_test3 Name
    // 上面的代码定义了三个变量类型是 Name 的变量

    var variable_test Name = {name: "test"}
    // 上面的代码定义了类型是 Name 的变量，并且初始化了值


    var v1,v2,v3 Name = xx,xx,xx
    // 上面的代码同时定义并初始化了三个变量，而且这三个变量的类型都是一样的

    var v1,v2,v3   = xx,xx,xx
    // 上面的代码也可以简写，去掉 Name 也就是 type

    v1,v2,v3 := xx,xx,xx
    // 也可以直接用 := 取代 var 做变量声明。但是 := 有个缺陷就是只能在函数内部，不能全局，全局变量就可以用 var 去做。

    const Pi float32 = 3.123333
    // 上面的 const Pi 就是初始化了一个常量。
    // go 的常量和一般的不一样的地方在于可以指定相当多的小数，如果指定给 float32 那么就会自动压缩成 32bit。指定成 float64 那么就会自动压缩成 64bit 。

```

## 内置基础类型

### Boolean

在 go 中布尔值的类型是 bool，值是 true 或者 false，默认值是 false、

```go
    var isLive bool
    var enabled,disabled = true,false
    fun test(){
       funvar := false
       isLive = true
    }
```

### 数值类型

整数类型有无符号和有符号两种。go 同时支持 int 和 uint 这两种类型的长度相同，但是具体长度取决不同编译器的实现。go 里面也是直接定义好位数的类型：
rune，int8 int16 int32 int64
byte uint8 uint16 uint32 uint64 其中 rune 是 int32 的别称，byte 是 uint8 的别称。

| 类型   | 有无符号 | 占用存储空间 | 表示范围                    |
| :----- | :------- | :----------- | --------------------------- |
| int8   | 有       | 1            | $-2^7 ~ 2^7-1$ = -128 ~ 127 |
| int16  | 有       | 2            | $-2^15 ~ 2^15-1$            |
| int32  | 有       | 4            | $-2^31 ~ 2^31-1$            |
| int64  | 有       | 8            | $-2^63 ~ 2^63-1$            |
| uint8  | 无       | 1            | $0 ~ 2^7-1$                 |
| uint16 | 无       | 2            | $0 ~ 2^15-1$                |
| uint32 | 无       | 4            | $0 ~ 2^317-1$               |
| uint64 | 无       | 8            | $0 ~ 2^63-1$                |
