---
layout:    post
title:     "Immutable和PureComponent打造高性能react组件"
subtitle:  "High performance component built with immutablejs"
date:      2017-5-25
author:    "maniaU"
header-img: "img/flying-birds.jpg"
tags:      React 前端
catalog:    true
---

## Fundamental

从JavaScript数据生成Immutable(支持嵌套数据):

```js
Immutable.fromJS({a: 1})
Immutable.fromJS([1, 2])
```

从JavaScript数据生成Immutable(不支持嵌套数据):

```js
Immutable.List([1, 2])
Immutable.Map({a: 1})
```

从Immutable数据生成JavaScript数据:

```js
Immutable.Map({a: 1}).toJS();
```

判断两个Immutable是否相等:

```js
const a = Immutable.Map({a: 1})
const b = Immutable.Map({a: 1})
Immutable.is(a, b);
// true
a === b; 
//false
a.equals(b); 
// true
```

## List

```js
Immutable.List() 
// 空List
Immutable.List([1, 2])
Immutable.fromJS([1, 2])
```

查看List大小:

```js
const a = Immutable.List([1, 2])
a.size
// 2
a.count()
// 2
```

判断React组件 `PropTypes` 是否是List:

```js
React.PropTypes.instanceOf(Immutable.List).isRequired
```

操作List元素:

```js
a.set(1, 2)
// [2, 2]
const b = List([1, 2, 3, List([4, 5])])
b.setIn([3, 0], 999)
// [1, 2, 3, [999, 5]]
b.updateIn([3, 0], s=>s+100);
// [1, 2, 3, [104, 5]]
```

获取List元素:

```js
const c = Immutable.List([3, 2, 1])
c.get('1') 
// 2
c.get(1) 
// 2
c.get(-1) 
// 1
```

其他List操作:

```js
// 排序
c.sort((a, b) => {
    if (a < b) { return -1 };
    if (a > b) { return 1 };
    return 0
}) 
// [1, 2, 3]
c.sortBy(x => x);
// [1, 2, 3]

// 过滤
c.filter(x => x > 1);
// [2, 3]
c.filterNot(x => x <= 1);
// [2, 3]
```

## Map

基础操作和List几乎类似，嵌套结构有一些方便的方法

```js
const m = Immutable.Map({a: Map({b:1})})
m.getIn(['a', 'b'])
// 1
m.setIn(['a', 'b'], 3)
// {a: {b: 3}}
m.updateIn(['a', 'b'], x => x + 2);
// {a: {b: 3}}
```

从JavaScript迁移到Immutable主要用这些指令足矣，更深层次的可以进一步探究文档。

## Immutable Test

```js
var a = { a: 1 };
var d1 = new Date();
for (i = 1; i < 1000000; ++i) {
  var b = JSON.parse(JSON.stringify(a));
  b.a = 2
  var c = b.a;
}
var d2 = new Date();
console.log(d2 - d1);    // 595

var a = { a: 1 };
var d1 = new Date();
for (i = 1; i < 1000000; ++i) {
  var b = Object.assign({}, a);
  b.a = 2;
  var c = b.a;
}
var d2 = new Date();
console.log(d2 - d1); // 203

var Immutable = require('immutable');
var a = Immutable.Map({ a: 1});
var d1 = new Date();
for (var i = 1; i < 1000000; ++i) {
  var b = a.set('a', 2);
  var c = b.get('a');
}
var d2 = new Date();
console.log(d2 - d1); // 137
```

从上可以看出，Immutable的操作比原生JSON操作速度快许多，

## Something About React Migration to 15.x

### 引入React PureComponent

它和`React.Component`相似，只是在执行`shouldComponentUpdate()`的时候使用了prop和state的浅比较。如果你的component 有相同的prop和state时显示相同的结果，可以使用`PureComponent`。

如果组件含有深层次的数据结构，那么可以使用Immutablejs+PureComponent来执行属性的快速比较。此外，`PureComponent`的`shouldComponentUpdate()`方法跳过了组件的子组件，因此要确保所有的子组件也是纯净(pure)的。

React 16+将会抛弃`PropTypes`，因此可以安装npm的`prop-types`作为替代，

