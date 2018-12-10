---
layout: post
title: '使用React-Hooks开发聊天室2.0'
date: 2018-12-10
author: 'maniaU'
header-img: 'img/brienz lake.jpeg'
tags: React 技术
catalog: true
published: false
---

## 我的React历程

React在前端界大行其道将近三年了，他带来的数据与UI绑定的优势，让我们告别了jQuery和DOM，让我们把注意力集中到单向数据流上，我们可以把一大个web app拆分成小的，独立的，可重用的组件，

### 初识State
两年前我刚刚接触React，自学开发了[聊天室第一版](https://www.yumingyuan.me/2017/02/13/chatroom-developed-using-react-socketio-and-express.html)，当时对状态管理还是非常懵懂，父子通信使用的都是props传值，写一个通信，需要改三处逻辑，代码写着写着就变得不可维护。

### 接触Redux
后来我遇到了redux，便能通过actions来改变reducer，并将reducer拆分到不同组件，映射不同的UI，组件和父子通信变得更加得心应手，虽然逻辑更明晰了，但是代码也变得更加复杂，写一套redux，需要增加至少三个文件，配置redux开发，也需要花点时间，成本变得居高不下。

### 遇见Hooks
而如今，出现了react-hooks，我们可以把所有的class组件，都变成一个纯函数，因为告别了class，也不用再为烦人的this使用bind或者箭头函数，使用了hooks，你的react代码将变得更加纯粹，明晰而又简洁。

## 为什么要使用React-Hooks
但是当一个APP变得足够大时，我们常常会遇到这样的问题

1. 组件的通用性常常会和业务逻辑耦合在一起
2. 当处理很多动画、外来数据时，我们的组件常常会变得不那么`纯粹`
3. 太多的逻辑和生命周期带来的状态管理混乱
4. render和高阶组件导致DOM结构非常复杂
5. 等等

说了那么多，让我们结合实例赶紧体验一下Hooks的魔力吧！

## 使用React-hooks开发聊天室

项目源码[在此](https://github.com/ymyqwe/Websocket-React-Chatroom)，大家可以在阅读本文的时候参考源码

### 使用useState编写受控组件

由于react使用的是单向数据流，因此我们如果要在input中改变值，必须绑定一个`onChange`事件，使用useState的写法如下，可以参考<i>src/container/App.js</i>

```javascript
import React, { useState } from 'react';
/* ...  */
const userState = (username) => {
  const [user, setUsername] = useState(username);
  return [user, setUsername];
}

const App = (props) => {
  /* ... */
  // 输入输出用户名
  const [user, setUsername] = userState();
  /* ... */
  return (
    <input 
      type="text"
      placeholder="请输入用户名"
      onChange={(e) => setUsername(e.target.value)}
    />)
  /* ... */
};
```

以上便是最简单的hooks用法，我们可以定义一个state，再声明一个改变state的方法，接下来通过调用这个方法，可以操作这个state。

### 使用Context和useReducer来管理状态

- [Context](https://reactjs.org/docs/context.html)是React官方提供的一个管理数据的方法，他可以让我们避免一级一级地把数据沿着组件树传下来，详情可以参考官方文档
- useReducer则是hooks提供的一个类似于redux的api，让我们可以通过action的方式来管理context，或者state

接下来我们就将两者结合起来使用，首先创建一个<i>context/index.js</i>文件，加入我们需要共享的状态，通过一个ContextProvider将state和改变state的dispatch方法给子组件。

同时reducer定义三个方法，分别为，登录`LOGIN`，更新系统消息`UPDATE_SYSTEM_MESSAGE`（用户进入或者离开聊天室），更新用户消息`UPDATE_USER_MESSAGE`（用户发送消息），用来更新state。

```javascript
import React, { createContext, useReducer } from 'react';

const Context = createContext();

const initValue = {
  username: '',
  uid: '',
  socket: io(),
  messages: [],
  onlineUsers: {},
  onlineCount: 0,
  userhtml: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'UPDATE_SYSTEM_MESSAGE':
      return { ...state, ...{ messages: state.messages.concat(action.payload.message) }, ...{ onlineUsers: action.payload.onlineUsers }, ...{ onlineCount: action.payload.onlineCount } };
    case 'UPDATE_USER_MESSAGE':
      return { ...state, ...{ messages: state.messages.concat(action.payload.message) } };
    default:
      return state;
  }
}

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initValue);
  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
```



