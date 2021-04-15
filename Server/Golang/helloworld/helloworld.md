在 Linux 中使用 go 做一个 hello world 。

## 安装 go

按照 [安装 go](https://www.jianshu.com/p/c43ebab25484) 将 go 安装到 Linux 服务器上。

## hello world

应该是先写一个 go 文件，然后再通过 go build 。经过 build 以后再去执行。大概的思路应该是这样的，我们先写第一个 go 文件。

```go

package main

import (
	"fmt"
	"net/http"
	"strings"
	"log"
)

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()  //解析参数，默认是不会解析的
	fmt.Println(r.Form)  //这些信息是输出到服务器端的打印信息
	fmt.Println("path", r.URL.Path)
	fmt.Println("scheme", r.URL.Scheme)
	fmt.Println(r.Form["url_long"])
	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	fmt.Fprintf(w, "Hello astaxie!") //这个写入到w的是输出到客户端的
}

func main() {
	http.HandleFunc("/", sayhelloName) //设置访问的路由
	err := http.ListenAndServe(":9090", nil) //设置监听的端口
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

```

这时候的目录是 `$HOME/go/src/hello` 然后执行 `go build -o hello hello.go` 这时候会编译出一个 hello 的二进制文件，然后在该目录下执行 ./hello
最后在浏览器中输入网址或者 ip 加端口 9090 然后就就可以直接看到输出的 Hello astaxie
