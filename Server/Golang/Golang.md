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


## 用 golang 起一个 server

用 go 起一个 server。
