---
layout: post
title: '新浏览器中的passive事件监听器引发的移动端交互问题'
subtitle: 'Interaction problem caused by passive event listener'
date: 2018-9-25
author: 'maniaU'
header-img: 'img/brienz lake.jpeg'
tags: Passive-eventlistener iOS12
catalog: true
---

最近在做一个移动端的页面，碰到了之前不存在的问题，即使添加了 user-scalable=no 的 meta head，页面依然能缩放。

而弹出全屏弹窗时，页面依然能滚动，实在是让人十分厌烦的一个交互，搜寻了众多文档之后，得出了这篇文章。

## iOS10+ 忽略了 meta user-scalable

<b>From release notes:</b>

> To improve accessibility on websites in Safari, users can now pinch-to-zoom even when a website sets user-scalable=no in the viewport.

因此在 iOS 10 以后的 safari 浏览器中，即使添加了这个 meta，页面依然能随意缩放。

因此，禁止缩放这些事，都要手动来做了。可以参考[Disable viewport zooming iOS 10 Safari](https://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari)

但是，更新了 iOS 12 之后，突然发现这个方法也没用，真的是 WTF 了。在网上寻找了很久的解决方案之后，发现了 passive eventlistener 这个东西，下面就来简单介绍一下。

## Eventlistener passive option

参考[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

如果这个属性设置为 true，表示该函数不会调用 preventDefault()，如果调用了 preventDefault()，用户代理也只会产生一个 console warning，不会做其他的事。

### 对于提升滚动性能所做的优化

> According to the specification, the default value for the passive option is always false. However, this introduces the potential for event listeners handling certain touch events (among others) to block the browser's main thread while it is attempting to handle scrolling, resulting in possibly enormous reduction in performance during scroll handling.

> To prevent this problem, some browsers (specifically, Chrome and Firefox) have changed the default value of the passive option to true for the touchstart and touchmove events on the document-level nodes Window, Document, and Document.body. This prevents the event listener from being called, so it can't block page rendering while the user is scrolling.

大意就是根据规范，事件监听器的 passive 属性默认是 false，但是某些情况下，浏览器的主线程尝试去控制滚动和触摸事件时，会降低滚动控制的性能，从而导致掉帧。

因此有些浏览器（如 Chrome、Firefox）已将文档级别的 touchstart, touchmove 事件 passive 默认值设置为 true，这样用户在滚动页面时就不会阻塞页面渲染。

### 各种各样的问题

Chrome 在 56 版本默认设置了顶级文档元素 passive 为 true 的属性，而 iOS 12 似乎也设置了这一属性。

如今大多数互联网公司，已经开始忽略适配旧浏览器，让前端实在省了不少事。然而谷歌这一动作，又让移动端出现了需要额外做的工作，包括但不限于以下几点：

1.  移动端弹出全屏幕 Modal 时，背景页面依然可以滚动
2.  iOS12 以后，无法禁止页面缩放了
3.  React Synthetic Event，无法阻止 Document 的滚动了

### 处理方式

#### 移动端弹出全屏幕 Modal 时，背景页面依然可以滚动

添加如下代码

```javascript
export default (function() {
  var forbidListener = function(event) {
    event.preventDefault();
    event.stopPropagation();
  };
  return {
    // 允许屏幕滚动
    disable: function() {
      document.removeEventListener('touchmove', forbidListener, {
        passive: false
      });
    },
    // 禁止屏幕滚动
    enable: function() {
      document.addEventListener('touchmove', forbidListener, {
        passive: false
      });
    }
  };
})();
```

需要禁用屏幕滚动的时候，调用 enable 方法，需要禁用时则调用 disable 方法

#### iOS12 以后，无法禁止页面缩放了

根据屏幕上手指数量阻止事件行为

```javascript
var forbidListener = function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
    event.stopPropagation();
  }
};
```

但是这么写会遇到一个问题，如果先使用单个手指滚动屏幕，滚动的同时另一只手指放到屏幕上放大页面，目前尚未找到好办法来阻止这一操作。不知有没有什么好办法。

#### React Synthetic Event，无法阻止 Document 的滚动了

由于 react 团队使用了 Synthetic Event 来进行事件代理，而且 react 一直在为支持这一方式做奴隶，详见[issue#6436](https://github.com/facebook/react/issues/6436)，在 react 开放 api 之前，我们可以先不使用 react 的合成事件，使用原生 DOM 来处理这样的问题。

## 总结

各大浏览器开发商，总是会因为一些人的方便，做一些并不是所有人都能适应的事，这次的 passive event listener 是一个例子，还有之前的 modal input 定位问题，[详见](https://hackernoon.com/how-to-fix-the-ios-11-input-element-in-fixed-modals-bug-aaf66c7ba3f8)。

做业务开发嘛，总会遇到各种各样的坑，要么就是把这些坑踩掉，但是如果坑踩不掉，我们就得绕过去。或者通过 hack 的方式，或者就通过和产品、业务沟通的方式来解决。

总而言之，不要钻牛角尖，得去找问题的方式，能解决最好，不然就做一些妥协，毕竟我们的最终目标是向前进。
