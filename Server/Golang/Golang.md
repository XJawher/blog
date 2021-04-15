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

### go 基础

[go 变量](./Cornerstone/corner-variable.md)

fmt.Printf 和 fmt.Println 区别

## 用 golang 起一个 server

用 go 起一个 server。
[helloworld form golang](./helloworld/helloworld.md)
