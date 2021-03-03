# 编译原理 Compilation
这部分从基础的 babel 开始，到写一个简单的编译器为止。
* babel 基础
* 编译器

## 编译器
[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
大多数的编译器可以分解成三个主要的阶段：**Parsing,Transformation,and Code Gerneration**
* Parsing 解析阶段
* Transformation 转换阶段
* Code Generation 程序代码阶段

**Parsing** is taking raw code and turning it into a more abstract representation of the code.
解析就是将源代码转换成更加抽象的代码进行表示。

**Transformation** takes this abstract representation and manipulates to do whatever the complier wants it to.
转换阶段把上面抽象出来的结构操作成编译器想要的任何的样子。

**Code Generation** takes the transformed representation of the code and turns it into new code.
代码转换阶段将上面转换过的抽象结构代码编译成新的代码

### Parsing
**Parsing** is taking raw code and turning it into a more abstract representation of the code.
解析就是将源代码转换成更加抽象的代码进行表示。
解析阶段分为两种情况。
* 1 lexical analysis 词法分析
* 2 syntactic analysis 语法分析

#### lexical analysis
Lexical analysis 词法分析


### Transformation
**Transformation** takes this abstract representation and manipulates to do whatever the complier wants it to.
转换阶段把上面抽象出来的结构操作成编译器想要的任何的样子。

### Code Generation
**Code Generation** takes the transformed representation of the code and turns it into new code.
代码转换阶段将上面转换过的抽象结构代码编译成新的代码

## babel
[**babel 安装**](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-babel-cli)
现在的需求是在生产环境将项目里的 `console.log()` 给删除，在开发环境中将 `console.log(xxx) 转成 console.log('xxx',xxx)`
### babel 编译
我们先来编译第一个文件，在 package.json 中添加
```json
    "scripts": {
        "build": "babel index.js --out-file compiled.js"
    }
```
然后运行 npm run build。

[手动设置babel插件](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

#### 基础名词
**抽象语法树 AST** 所谓的抽象语法树，就是将
