---
layout: post
title: '使用React-Hooks开发聊天室之2.0版本'
date: 2018-12-10
author: 'maniaU'
header-img: 'img/storm.jpg'
tags: React 技术
catalog: true
---

## 我的 React 历程

React 在前端界大行其道将近三年了，他带来的数据与 UI 绑定的优势，让我们告别了 jQuery 和 DOM，让我们把注意力集中到单向数据流上，我们可以把一大个 web app 拆分成小的，独立的，可重用的组件，

### 初识 State

两年前我刚刚接触 React，自学开发了[聊天室第一版](https://www.yumingyuan.me/2017/02/13/chatroom-developed-using-react-socketio-and-express.html)，当时对状态管理还是非常懵懂，父子通信使用的都是 props 传值，写一个通信，需要改三处逻辑，代码写着写着就变得不可维护。

### 接触 Redux

后来我遇到了 redux，便能通过 actions 来改变 reducer，并将 reducer 拆分到不同组件，映射不同的 UI，组件和父子通信变得更加得心应手，虽然逻辑更明晰了，但是代码也变得更加复杂，写一套 redux，需要增加至少三个文件，配置 redux 开发，也需要花点时间，成本变得居高不下。

### 遇见 Hooks

而如今，出现了 react-hooks，我们可以把所有的 class 组件，都变成一个纯函数，因为告别了 class，也不用再为烦人的 this 使用 bind 或者箭头函数，使用了 hooks，你的 react 代码将变得更加纯粹，明晰而又简洁。

## 为什么要使用 React-Hooks

但是当一个 APP 变得足够大时，我们常常会遇到这样的问题

1. 组件的通用性常常会和业务逻辑耦合在一起
2. 当处理很多动画、外来数据时，我们的组件常常会变得不那么`纯粹`
3. 太多的逻辑和生命周期带来的状态管理混乱
4. render 和高阶组件导致 DOM 结构非常复杂
5. 等等

说了那么多，让我们结合实例赶紧体验一下 Hooks 的魔力吧！

## 使用 React-hooks 开发聊天室

[项目源码](https://github.com/ymyqwe/Websocket-React-Chatroom)在此，大家可以在阅读本文的时候参考源码，关于 webpack 和 socket.io 相关的，请参考[聊天室第一版](https://www.yumingyuan.me/2017/02/13/chatroom-developed-using-react-socketio-and-express.html)

### 使用 useState 编写受控组件

由于 react 使用的是单向数据流，因此我们如果要在 input 中改变值，必须绑定一个`onChange`事件，使用 useState 的写法如下，可以参考<i>`src/container/App.js`</i>

```javascript
import React, { useState } from 'react';
/* ...  */
const userState = (username) => {
  const [user, setUsername] = useState(username);
  return [user, setUsername];
};

const App = (props) => {
  /* ... */
  // 输入输出用户名
  const [user, setUsername] = userState();
  /* ... */
  return <input type="text" placeholder="请输入用户名" onChange={(e) => setUsername(e.target.value)} />;
  /* ... */
};
```

以上便是最简单的 hooks 用法，我们可以定义一个 state，再声明一个改变 state 的方法，接下来通过调用这个方法，可以操作这个 state。

### 使用 Context 和 useReducer 来管理状态

- [Context](https://reactjs.org/docs/context.html)是 React 官方提供的一个管理数据的方法，他可以让我们避免一级一级地把数据沿着组件树传下来，详情可以参考官方文档
- useReducer 则是 hooks 提供的一个类似于 redux 的 api，让我们可以通过 action 的方式来管理 context，或者 state

接下来我们就将两者结合起来使用，首先创建一个<i>context/index.js</i>文件，加入我们需要共享的状态，通过一个 ContextProvider 将 state 和改变 state 的 dispatch 方法传给子组件。

同时 reducer 定义三个方法，分别为，登录`LOGIN`，更新系统消息`UPDATE_SYSTEM_MESSAGE`（用户进入或者离开聊天室），更新用户消息`UPDATE_USER_MESSAGE`（用户发送消息），用来更新 state。

```jsx
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

### 组件接入 Context

写完了 context，我们将所有需要用到 context 的组件放入到`Context.Provider`的子元素中，这样就可以获取到状态 state 和方法 dispatch。

<i>`src/container/App.js`</i>中，关键代码如下，

```jsx
import React, { useContext, useState } from 'react';
import { Context } from '../context';

const App = (props) => {
  // 获取context中的数据
  const { state, dispatch } = useContext(Context);
  const handleLogin = () => {
    const uid = generateUid();
    const username = user ? user : `游客${uid}`;
    dispatch({ type: 'LOGIN', payload: { uid, username } });
    state.socket.emit('LOGIN', { uid, username });
  };
  /* ... */
};
```

以上代码表示登录时出发 context 中的 dispatch 方法，并传输 uid 和 username 两个参数，对应到 context 中，则是

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    /* ... */
  }
}
```

表示登录之后，将用户的 uid 和 username 存储到 state 中。

在聊天室代码<i>`src/container/ChatRoom.js`</i>中，逻辑基本类似，通过 socket 接受到用户的登录、登出、发送消息等行为，更新到 context 的 state 中，具体代码如下。

```jsx
import React, { useContext, useState } from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { Context } from '../context';

const ChatRoom = (props) => {
  const { state, dispatch } = useContext(Context);
  const [init, setInit] = useState(false);
  // 更新系统消息
  const updateSysMsg = (o, action) => {
    const newMsg = { type: 'system', username: o.user.username, uid: o.user.uid, action: action, msgId: generateMsgId(), time: generateTime() };
    dispatch({
      type: 'UPDATE_SYSTEM_MESSAGE',
      payload: {
        onlineCount: o.onlineCount,
        onlineUsers: o.onlineUsers,
        message: newMsg
      }
    });
  };

  // 发送新消息
  const updateMsg = (obj) => {
    const newMsg = { type: 'chat', username: obj.username, uid: obj.uid, action: obj.message, msgId: generateMsgId(), time: generateTime() };
    dispatch({
      type: 'UPDATE_USER_MESSAGE',
      payload: {
        message: newMsg
      }
    });
  };
  // 监听消息发送
  const ready = () => {
    const { socket } = props;
    setInit(true);
    socket.on('login', (o) => {
      updateSysMsg(o, 'login');
    });
    socket.on('logout', (o) => {
      updateSysMsg(o, 'logout');
    });
    socket.on('message', (obj) => {
      updateMsg(obj);
    });
  };
  if (!init) {
    ready();
  }
  const renderUserList = () => {
    const users = state.onlineUsers;
    let userhtml = '';
    let separator = '';
    for (const key in users) {
      if (users.hasOwnProperty(key)) {
        userhtml += separator + users[key];
        separator = '、';
      }
    }
    return userhtml;
  };
  return (
    <div className="chat-room">
      <div className="welcome">
        <div className="room-action">
          <div className="room-name">鱼头的聊天室 | {props.username}</div>
          <div className="button">
            <button onClick={() => window.location.reload()}>登出</button>
          </div>
        </div>
      </div>
      <div className="room-status">
        在线人数: {state.onlineCount}, 在线列表: {renderUserList()}
      </div>
      <div>
        <Messages messages={state.messages} myId={props.uid} />
        <ChatInput myId={props.uid} myName={props.username} socket={props.socket} />
      </div>
    </div>
  );
};
export default ChatRoom;
```

而在<i>`src/component/Messages.js`</i>中，我们以同样的方式接入 context，获取 state 中的 messages，一一渲染，我们的聊天室核心功能就完成了！

```jsx
const Messages = (props) => {
  // 使用context中的状态，而不是props传值
  const { state } = useContext(Context);

  const { uid, messages } = state;
  return (
    <div className="messages" ref={messageList}>
      {messages.map((message) => (
        <Message key={message.msgId} msgType={message.type} msgUser={message.username} action={message.action} isMe={uid == message.uid ? true : false} time={message.time} />
      ))}
    </div>
  );
};
```

### 使用 useEffect 和 useRef 更优雅地玩转 React

聊天室经常有个功能，就是收到新消息，页面保持在最新消息，这个功能如何完成呢？我们这里可以使用 useEffect 和 useRef。

曾经，我们需要背下 react 的生命周期方法，并经常会因为搞不清使用哪个方法而晕头转向，有了 hooks 的 useEffect 方法，我们可以将`componentDidMount`，`componentDidUpdate`和`componentWillUnmount`合成 useEffect。

```javascript
// before
componentDidMount() {
  window.scrollTo(0, messageList.current.clientHeight + 50);
}
componentDidUpdate() {
  window.scrollTo(0, messageList.current.clientHeight + 50);
}
componentWillUnmount() {
  // DO SOMETHING
}

// after
useEffect(() => {
  window.scrollTo(0, messageList.current.clientHeight + 50);
  return () => {
    // DO SOMETHING
  }
});
```

可以达到完全一致的效果，怎么样，代码是不是精简了很多？

至于`useRef`，使用方法则更简单了

```jsx
const messageList = useRef(null);

return (
  <div className="messages" ref={messageList}>
    {messages.map((message) => (
      <Message key={message.msgId} msgType={message.type} msgUser={message.username} action={message.action} isMe={uid == message.uid ? true : false} time={message.time} />
    ))}
  </div>
);
```

以上两个结合起来，就能达到新消息送达时保持最新消息在底部的目的了。

这样子就可以轻松使用 DOM 了，而且如果绑定了 input 等元素，将 ref 暴露给父元素，也可以在父元素中调用 focus 等等的方法，至于更多的使用方法，就等大家自己去探索咯。

## 后记

经过如上的核心代码，我们的聊天室就基本搞定了，当然具体细节大家可以查看源码研究。

研究了一番 react-hooks，我总结出来如下几点。

- 告别[Render Props](https://reactjs.org/docs/render-props.html)和[High Order Components](https://reactjs.org/docs/higher-order-components.html)带来的组件嵌套噩梦
- 不需要再面向生命周期编程，可以直接面向业务编程(useEffect)
- 不再需要箭头函数或者 bind 来绑定 this，也不再需要 Component，只需要最纯粹的函数

## 参考

1. [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
2. [Hooks Proposal](https://github.com/reactjs/rfcs/pull/68#issuecomment-439314884)
3. [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)
4. [React High Order Component Hell](https://www.reddit.com/r/ProgrammerHumor/comments/9jhs67/react_higherorder_component_hell/)
