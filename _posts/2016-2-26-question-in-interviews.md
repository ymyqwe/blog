---
layout:    post
title:     "前端面试问题总结"
subtitle:   "Practice Makes Perfect"
date:      2017-2-20
author:    "maniaU"
header-img: "img/bridge.jpg"
tags:      面试 前端
catalog:    true
---

最近换了工作，前前后后也面试了不少公司，碰壁的问题有不少，自己了解但是没有答好的问题也有很多，这篇文章算是对最近面试的一个总结，虽然找到了工作，但是依然不能松懈呀！

<!-- ### 目录
1. [数组去重](#数组去重)
2. [圣杯布局](#圣杯布局)
3. [Reflow和Repaint](#浏览器的重渲染和重画)
4. [offsetheight clientheight区别](#offsetheight-clientheight区别)
5. [cookie是否可以跨域，如何跨域](#cookie是否可以跨域如何跨域)
6. [cookie-localstorage-sessionstorage区别](#cookie-localstorage-sessionstorage区别)
7. [原生dom操作](#原生dom操作)
8. [http状态码有哪些分别代表什么意思](#http状态码有哪些分别代表什么意思)
9. [bind call apply区别](#bind call apply区别)
10. [闭包的概念](#闭包的概念) -->


## 数组去重

这个算是面试常问了吧，这是对JS算法最最基础的问题，但是如果要深入的话也是可以涉及到很多的问题

### 一般方式

```js
//一般方法->使用indexOf，新建一个数组，遍历旧数组元素，如果新数组中没有旧数组元素，则加入该元素
Array.prototype.unique = function(){
    var newArr = [];
    var len = this.length;
    for(var i = 0;i < len; i++){
        if(newArr.indexOf(this[i]) == -1){
            newArr.push(this[i]);
        }
    }
    return newArr;
}
```

### 快速方式

```js
//使用hash，新建一个对象、一个数组，遍历旧数组元素，如果对象中不存在这个属性，则将这个元素作为对象的key，并且放入新数组中。
Array.prototype.unique = function(){
    var json = {}, newArr = [], len = this.length;
    for(var i = 0; i < len; i++){
        if(typeof json[this[i]] == "undefined"){
            json[this[i]] = true;
            newArr.push(this[i]);
        }
    }
    return newArr;
}
```

## 圣杯布局

又是一道经典的面试题，网上的资料很全很多了，我这边就放一下[链接](https://segmentfault.com/a/1190000004524159)吧~

## 浏览器的重渲染和重画

网页的生成过程，大致可以分为五步

1. HTML代码转为DOM代码
2. CSS代码转化为CSSOM
3. DOM和CSSOM生成渲染树
4. 生成布局
5. 将布局绘制在屏幕上

这中间，前三步都很快，耗时的是第四步和第五步，生成布局叫做排布，绘制则就叫绘制。
重新渲染时，就需要重新生成布局（reflow）和重新绘制（repaint），而他们两个，是非常消耗资源的，也是导致网页性能地下的重要原因。
通常来说，以下操作会导致浏览器的重排和重绘

1. 在DOM树种插入、移除或更新元素
2. 调整页面中的内容，比如输入框中的内容
3. 移动一个DOM元素
4. 对DOM使用动画
5. 测量元素，比如offserHeight和getComputedStyle
6. 改变CSS样式
7. 改变元素的类名
8. 增加或者移除样式表
9. 改变窗口大小
10. 滚动事件

### 优化网页性能

1. DOM读写操作，尽量放在一起
2. 样式如果需要重排得到，尽量写在一起
3. 不要一条条改变样式，应该通过改变类，一次性改变
4. 将DOM元素缓存，操作完之后再替换原来的元素
5. 使用虚拟DOM的类库，比如React

## offsetHeight clientHeight区别

如下图所示

<img src="{{ site.baseurl }}/img/offsetheight.jpg" alt="">

* clientHeight返回的是`不包括滚动条，边框，边距`的元素内部高度
* offsetHeight返回的是包括边框、滚动条在内的元素高度
* scrollHeight返回的则包括溢出的整个可以滚动的元素高度

## cookie是否可以跨域，如何跨域
cookie是不能跨域的，解决跨域问题可以参考下面这篇文章:
[前端解决跨域问题的8种方案](http://blog.csdn.net/joyhen/article/details/21631833)

## cookie localStorage sessionStorage区别

共同点：
* 都是保存在浏览器端，而且是同源的

区别：
1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递；cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。

2. 而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

3. 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。

4. 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；


## 原生dom操作
这是对于JS基础的考察，好好去把《JavaScript权威指南》、《JavaScript高级程序设计》看一看！
### 创建

```js
createDocumentFragment() // 创建一个DOM片段
createElement() // 创建一个具体元素
createTextNode() // 创建一个文本节点
```

### 添加、移除、替换、插入
```js
appendChild()
removeChild()
replaceChild()
insertBefore()
```

### 查找

```js
getElementsByTagName() //标签名称
getElementByName() //元素名称
getELementsByClassName() //类名
getElementById() //id名
```

## http状态码有哪些？分别代表什么意思？
这边只列举一些最常见的，能答出来就算可以了

    100  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
    200  OK         正常返回信息
    201  Created    请求成功并且服务器创建了新的资源
    202  Accepted   服务器已接受请求，但尚未处理
    301  Moved Permanently  请求的网页已永久移动到新位置。
    302 Found       临时性重定向。
    303 See Other   临时性重定向，且总是使用 GET 请求新的 URI。
    304  Not Modified 自从上次请求后，请求的网页未修改过。

    400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
    401 Unauthorized 请求未授权。
    403 Forbidden   禁止访问。
    404 Not Found   找不到如何与 URI 相匹配的资源。

    500 Internal Server Error  最常见的服务器端错误。
    503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

## 浏览器缓存的机制是什么，涉及到哪些标签？

在面试之前正好看到这篇文章，十分全面又细致，非常具有参考性：[浏览器缓存机制浅析](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551769&idx=1&sn=3a422455b5cc240f8625842d31d81ab8&chksm=8025afd8b75226cec68e1e0e4b36334bb1d88e51a7fdba0cf7884d9f1d6597e4e4475cffaa38&mpshare=1&scene=1&srcid=0228IogoZNJej8EkvEPwkCST&key=1717ad36244bdbc7f6bb62d97c4925472ae0d3af384176b6263b53d347d7caba53cade54dc1bf0e00fb6dece0bcb4fa72cbe74628f99a2770b852cb25d353a10c8c432c6727e90ba405ab0d7172446d9&ascene=0&uin=MjAxMjc5MjM0Mg%3D%3D&devicetype=iMac+MacBookPro11%2C5+OSX+OSX+10.12.1+build(16B2657)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=eoNwqmSwg8ggVeHui8VSuxpjdxnlakeYSpIlKG86B1s7zCTOuuTYfzQ7%2FC4cF1oX)


## bind call apply区别
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

## 闭包的概念

闭包就是由函数创造的一个词法作用域，里面创建的变量被引用后，可以在这个词法环境之外自由使用。[闭包](https://secure.wikimedia.org/wikipedia/zh/w/index.php?title=%E9%97%AD%E5%8C%85_%28%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6%29&variant=zh-cn )通常用来创建内部变量，使得这些变量不能被外部随意修改，同时又可以通过指定的函数接口来操作。
