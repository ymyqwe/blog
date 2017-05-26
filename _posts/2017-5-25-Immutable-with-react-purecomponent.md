---
layout:    post
title:     "Immutable和PureComponent打造高性能react组件"
subtitle:  "High performance component built with immutablejs"
date:      2017-5-17
author:    "maniaU"
header-img: "img/flying-birds.jpg"
tags:      React 前端
catalog:    true
published:  false
---


```js
import cloneDeep from 'lodash/cloneDeep';
var obj = {/* something */};
/* Shallow Copy */
var obj1 = $.extend({}, obj, yourObj);
var obj2 = Object.assign({}, obj, yourObj);
/* Deep Copy */
var obj3 = $.extend(true, {}, obj, yourObj)
var obj4 = cloneDeep(obj);
```