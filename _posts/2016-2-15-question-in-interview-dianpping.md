---
layout:    post
title:     "大众点评前端面试问题总结"
subtitle:  
date:      2017-2-20
author:    "maniaU"
header-img: "img/bridge.jpg"
tags:      面试 前端
---


## 数组去重
## 圣杯布局
## function f() {
  sayHello()
}
a = new f()

## reflow and repaint
insert, remove or update an element in the DOM
modify content on the page, e.g. the text in an input box
move a DOM element
animate a DOM element
take measurements of an element such as offsetHeight or getComputedStyle
change a CSS style
change the className of an element
add or remove a stylesheet
resize the window
scroll
[http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)
1. HTML to DOM
2. CSS to CSSOM
3. DOM and CSSOM to render tree
4. generate layout
5. paint on the screen

* change DOM
* change style
* user event(mouseover, scroll, input, window.resize)

offsetHeight clientHeight区别

## new箭头函数
## cookie是否可以跨域，如何跨域

## 原生dom操作
### 创建

createDocumentFragment() // 创建一个DOM片段
createElement() // 创建一个具体元素
createTextNode() // 创建一个文本节点

### 添加、移除、替换、插入
appendChild() 
removeChild()
replaceChild()
insertBefore()

### 查找
getElementsByTagName() //标签名称
getElementByName() //元素名称
getELementsByClassName() //类名
getElementById() //id名

position absolute
http 请求码
缓存 http返回expire
cookie localstorage区别
### bind call apply区别
call把this绑定到函数中，并且立即执行函数

```js
var person = {  
  name: "James Smith",
  hello: function(thing) {
    console.log(this.name + " says hello " + thing);
  }
}

person.hello.call(person, "world"); // output: "James Smith says hello world"
```

bind把this绑定到函数中，等到需要执行的时候再引用

```js
var person = {
    name: "James Smith",
    hello: function(thing) {
        console.log(this.name + " says hello " + thing);
    }
}
var helloFunc = person.hello.bind(person);
helloFunc("world"); // output: "James Smith says hello world"
```
或者这样
```js
...
var helloFunc = person.hello.bind(person, "world");
helloFunc();
```

apply和call类似，但是接受的参数是一个数组，而不是列出来所有参数

```js
function personContainer() {
  var person = {  
     name: "James Smith",
     hello: function() {
       console.log(this.name + " says hello " + arguments[1]);
     }
  }
  person.hello.apply(person, arguments);
}
personContainer("world", "mars"); // output: "James Smith says hello mars", note: arguments[0] = "world" , arguments[1] = "mars"
```


## css选择器优先级（伪类）
