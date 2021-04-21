# go

## go 指南

### 包

每个 go 程序都是由包组成的，程序从 main 包开始运行。

```go
package main
import("fmt","math/rand")
func main() {
    fmt.Println("My favorite number is", rand.Intn(10))
}
```

所谓的包就是一个很多的代码文件的目录。

go 基础
[go 变量](./Cornerstone/corner-variable.md)

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

浮点数的类型有 float32 和 float64 两种，默认是 float64

**复数**：在 go 中还存在一种数是复数，默认类型是 **complex128** 实数位 64 虚数位 64，还有 **complex64** 实数位 32，虚数位 32.

### 字符串

go 中的字符串都是采用的 utf-8 编码，采用 "" 或者 `` 符号括起来定义，类型是 string。

go 中的字符串是一个不可变的变量不能随意修改某个字符。
字符串不能随意修改，但是可以随意切片。

### go 的一些设计规则

- 大写字母的开头是可以被导出的，也就是可以被其他包读取的，是一个共有变量，小写字母的就是不能被导出的，是私有变量。
- 大写的函数也是和上面的一样。

### 数组

在 go 中的数组就是 array

```go
var testArr [10] int
// 上面的代码就是声明了一个数组，类型是 int  长度是 10 的一个数组。
// 因为在强类型的语言中，是需要声明所有的类型的，所以在数组中要一直把类型声明好。
```

嵌套数组声明，在 js 中我们嵌套声明数组的时候很简单，就直接在数组中写就行了 `[[],[],[]]` 类似这样，在 go 中也可以嵌套去声明数组

```go
doubleArr := [3][2]int{{2,3},{1,1},{22,2}}
```

当然在真实的场景中是不会这么简单的，到时候就需要加上相应的 interface 去做声明。通过上面的这个方式声明的数组的长度是定下来的，不能动态的修改，不像 js 的数组是可以动态的修改，因为 js 的数组是在浏览器里的，浏览器自己是占用了计算机的内存的，而强类型的语言是必须要自己声明好数组的长度。

**动态数组**
在很多的时候，我们自己是不知道数组的长度的，因此就需要一个动态数组。在 go 中的动态数组的结构是 slice。
slice 并不能说是一个动态数组，因为它是一个引用类型。slice 总是指向一个底层 array ，slice 的声明也是可以和数组一样，只是不需要长度。

```go
var sliceArr = []int

```

fmt.Printf 和 fmt.Println 区别

## 用 golang 起一个 server

用 go 起一个 server。
[helloworld form golang](./helloworld/helloworld.md)
