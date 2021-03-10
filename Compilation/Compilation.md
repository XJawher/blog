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
词法分析将原代码通过一个叫tokenizer的或者是词法分析器东西分解成碎片，将这些东西称作是tokens(标记)。tokens （标记物）是一组极其小的对象所组成的数组，tokens 是独立的语法碎片。tokens 可能是数字，标签，punctuation标点符号，operators操作符。
#### syntactic analysis
语法分析使用上面的 tokens ，重新格式化这些 tokens 进一个表示结构中，这个结构可以描述成语法的每个部分和他们之间的联系。这个就是所谓的中间部分或者抽象语法树。
抽象语法树是一个非常底层的对象，ast 组织代码是一种既可以告诉我们大量的信息，又非常容易工作的代码组织方式。


### Transformation
**Transformation** takes this abstract representation and manipulates to do whatever the complier wants it to.
转换阶段把上面抽象出来的结构操作成编译器想要的任何的样子。
对于一个编译器来说下一个阶段就是转换阶段。重复一下，这一步仅仅是做一些改变给从最后一步拿过来的 AST 。转换可以操作这个抽象语法树变成同一种语言或者是翻译成一个完全新的语言。
抽象语法树的结构都是很相似的，这些对象具有 type 属性，每一个这样的对象都被称作是 AST Node。这些 AST Node 可以孤立的表达树上的某个孤立的节点信息。
当我们把一个 AST 转换的时候，可以通过添加，替换，转移等方式操作这些 Node 的属性。我们可以新建一些 Nodes ，删除一些 Nodes，又或者可以将一个 AST Node 放着不动，在这个 Node 基础上创建一个全新的 Node。
一旦我们的目的是创建一门新的语言，我们就需要将注意力集中在创建一个新的 AST ，这个 AST 和原本的语言是完全不一样的。

**Traversal** 遍历
为了能够浏览和串联起所有的节点信息。我们需要将所有的节点遍历一遍，在遍历这些节点的时候我们会采用深度遍历优先的方式，遍历所有的 AST Nodes。
```js
    {
      type: 'Program',
      body: [{
        type: 'CallExpression',
        name: 'add',
        params: [{
          type: 'NumberLiteral',
          value: '2'
        }, {
          type: 'CallExpression',
          name: 'subtract',
          params: [{
            type: 'NumberLiteral',
            value: '4'
          }, {
            type: 'NumberLiteral',
            value: '2'
          }]
        }]
      }]
    }
```
上面的这颗抽象语法树，我们在遍历的时候可以拿到如下的数据

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
