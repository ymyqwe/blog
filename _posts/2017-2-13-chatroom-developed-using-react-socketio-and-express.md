---
layout:    post
title:     "使用React, Socket.io和Express开发一个简易聊天室"
subtitle:  "Develope A Chatroom using React, Socket.io and Express"
date:      2017-2-13
author:    "maniaU"
header-img: "img/dolphins.jpg"
tags:      React Socket.io Express 技术
catalog:    true
---

对于一直使用jQuery和zepto的我来说，React的确是一种新鲜的存在，数据和元素绑定让数据操作着实变得简单了许多，虚拟DOM也让jQuery繁琐的DOM操作提升了不少性能，因此也坚定了我转向React的决心。

从前的实时刷新页面从来都是长连接或者轮询，这多少有点愚蠢，自从接触到了websocket，实时通讯变得更优雅、更简单了。

本文介绍了Socket.io结合React开发的一个简易聊天室。


## 安装依赖

假设你已经安装好了node和npm(没有安装的赶紧去安装[Node.js](https://nodejs.org/en/download/))

```zsh
mkdir chatroom
cd chatroom
npm init
```

根据你的信息完成初始化后，安装依赖

```zsh
npm install express socket.io --save
```

安装完了express和socket.io，还需要的是配置webpack、react，详细的配置可以参考我之前的博客[使用Npm, Webpack开发React应用](http://www.yumingyuan.me/2017/02/06/Getting-Started-With-Reactjs-Using-Npm-Webpack.html)

## 服务端实现

新建一个`server.js`，用于放置服务端的node.js代码，此处的代码主要参考[Node.js+Socket.io搭建聊天室](http://www.plhwin.com/2014/05/28/nodejs-socketio/)

```js
var path = require('path');
var express = require('express');
var app = express();
var webpack = require('webpack');
var config = require('./webpack.config');
var server =require('http').createServer(app);
var io = require('socket.io')(server);
var compiler = webpack(config);

app.use(express.static(path.join(__dirname, '/')))

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})

// 在线用户
var onlineUsers = {};
// 在线用户人数
var onlineCount = 0;

io.on('connection', function(socket) {
    // 监听客户端的登陆
    socket.on('login', function(obj){

        // 用户id设为socketid
        socket.id = obj.uid;

        // 如果没有这个用户，那么在线人数+1，将其添加进在线用户
        if (!onlineUsers.hasOwnProperty(obj.uid)) {
            onlineUsers[obj.uid] = obj.username;
            onlineCount++;
        }

        // 向客户端发送登陆事件，同时发送在线用户、在线人数以及登陆用户
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'加入了群聊');
    })

    // 监听客户端的断开连接
    socket.on('disconnect', function() {

        // 如果有这个用户
        if(onlineUsers.hasOwnProperty(socket.id)) {
            var obj = {uid:socket.id, username:onlineUsers[socket.id]};

            // 删掉这个用户，在线人数-1
            delete onlineUsers[socket.id];
            onlineCount--;

            // 向客户端发送登出事件，同时发送在线用户、在线人数以及登出用户
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'退出了群聊');
        }
    })

    // 监听客户端发送的信息
    socket.on('message', function(obj){
        io.emit('message', obj);
        console.log(obj.username+"说:"+ obj.message)
    })

})

server.listen(3300, function(err) {
    console.log('Listening at *:3300');
})
```

## 客户端实现

在根目录下创建`index.html`，

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>在线聊天室</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" name="viewport">
    <meta name="format-detection" content="telephone=no" />
    <script src="./node_modules/socket.io-client/dist/socket.io.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
    <div id="app"></div>
    <script src="/static/bundle.js"></script>
</body>
</html>
```

为了开发方便，我们使用了webpack的[hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware)和[dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware)插件，这样打包完的文件是放在内存中，而不是静态文件，同时修改代码后自动重新打包并刷新浏览器，着实是很方便。Webpack的入口文件设置为`./src/index`

```js
import React from 'react';
import {render} from 'react-dom';
import App from './container/App';
render(<App />,document.getElementById('app'));
```

以上代码很简单，就不多做解释了，在`./container/App.js`中，放置了聊天室的登陆代码

```js
import React, { Component, PropTypes } from 'react';
import ChatRoom from '../components/ChatRoom';
import './loginbox.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            uid:'',
            socket: io()
        }
    }

    // 生成用户id
    generateUid() {
        return new Date().getTime()+""+Math.floor(Math.random()*9+1);
    }

    // 监控名称变化
    handleChange(e) {
        this.setState({username: e.target.value})
    }

    // 监控点击提交或按回车
    handleClick(e) {
        e.preventDefault();
        this.handleLogin();
    }
    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.handleLogin()
        }
        return false;
    }

    // 登陆
    handleLogin() {
        let username = this.state.username;

        // 随机生成游客名字
        // username = '游客' + Math.floor(Math.random()*89+10)
        const uid = this.generateUid();
        if (!username) {
            username = '游客'+ uid;
        }
        this.setState({uid:uid, username:username});
        this.state.socket.emit('login', {uid:uid, username:username})
    }
    render() {
        let renderDOM;
        if (this.state.uid) {
            // 如果有用户uid，则加载聊天室组件
            renderDOM = <ChatRoom uid={this.state.uid} username={this.state.username} socket={this.state.socket}/>
        } else {
            // 没有用户id时，加载登陆框组件
            renderDOM = (<div className="login-box">
                            <h2>登 陆</h2>
                            <div className="input">
                                <input type="text" placeholder="请输入用户名" onChange={this.handleChange.bind(this)}
                                onKeyPress={this.handleKeyPress.bind(this)}/>
                            </div>
                            <div className="submit">
                                <button type="button" onClick={this.handleClick.bind(this)} >提交</button>
                            </div>
                        </div>)
        }
        return (<div>{renderDOM}</div>)
    }
}
```

随后是`./components/ChatRoom.js`，聊天室组件的代码

```js
import React, {Component} from 'react';
import RoomStatus from './RoomStatus';
import Messages from './Messages';
import ChatInput from './ChatInput';

export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        const socket = this.props.socket;
        this.state = {
            myId: this.props.uid,
            myName: this.props.username,
            uid: this.props.uid,
            username: this.props.username,
            socket: socket,
            messages:[],
            onlineUsers: {},
            onlineCount: 0,
            userhtml:'',
        }
        this.ready();
    }

    // 处理在线人数及用户名，即聊天室状态栏
    handleUsers() {
        const users = this.state.onlineUsers;
        let userhtml = '';
        let separator = '';
        for (let key in users) {
            if (users.hasOwnProperty(key)) {
                userhtml+= separator + users[key];
                separator = '、';
            }
        }
        this.setState({userhtml: userhtml})
    }

    // 生成消息id
    generateMsgId() {
        return new Date().getTime()+""+Math.floor(Math.random()*899+100);
    }

    // 更新系统消息，，此处有个小坑，react中的array不能使用push，而需要concat添加元素，新增的消息有以下属性，
    // 类型type，用户名username，用户IDuid，用户行为action(即为登入登出)，消息ID msgId，时间time
    updateSysMsg(o, action) {
        let messages = this.state.messages;
        const newMsg = {type:'system', username:o.user.username, uid:o.user.uid, action:action, msgId: this.generateMsgId(), time:this.generateTime()}
        messages = messages.concat(newMsg)
        this.setState({
            onlineCount: o.onlineCount,
            onlineUsers: o.onlineUsers,
            messages: messages
        });
        this.handleUsers();
    }

    // 更新消息列表，此处有个小坑，React中的Array不能使用push，而需要concat添加元素，新增的消息有以下属性，
    // 类型type，用户名username，用户IDuid，消息内容（此处使用系统消息中的action），消息ID msgId，发送时间time
    updateMsg(obj) {
        let messages = this.state.messages;
        const newMsg = {type:'chat', username:obj.username, uid:obj.uid, action:obj.message, msgId:this.generateMsgId(), time:this.generateTime()};
        messages = messages.concat(newMsg);
        this.setState({messages:messages})
    }

    // 生成'hh-mm'格式的时间
    generateTime() {
        let hour = new Date().getHours(),
            minute = new Date().getMinutes();
        hour = (hour==0) ? '00' : hour;
        minute = (minute<10) ? '0' + minute : minute;
        return hour + ':' + minute;
    }

    // 登出页面，此处是刷新页面
    handleLogout() {
        location.reload();
    }


    // 开始监控socket
    ready() {
        const socket = this.state.socket;
        // 客户端监控登陆
        socket.on('login', (o)=>{
            this.updateSysMsg(o, 'login');
        })
        // 客户端监控登出
        socket.on('logout', (o)=>{
            this.updateSysMsg(o, 'logout');
        })
        // 客户端监控发送消息
        socket.on('message', (obj)=>{
            this.updateMsg(obj)
        })
    }

    render() {
        return(
            <div className="chat-room">
                <div className="welcome">
                    <div className="room-name">鱼头的聊天室 | {this.state.myName}</div>
                    <div className="button">
                        <button onClick={this.handleLogout}>登出</button>
                    </div>
                </div>
                <RoomStatus onlineCount={this.state.onlineCount} userhtml={this.state.userhtml}/>
                <div ref="chatArea">
                    <Messages messages={this.state.messages} myId={this.state.myId} />
                    <ChatInput myId={this.state.myId} myName={this.state.myName} socket={this.state.socket}/>
                </div>
            </div>)
    }
}
```

`./component/ChatRoom.js`中有三个组件，分别是聊天室状态`./components/RoomStatus.js`

```js
// RoomStatus聊天室状态
import React, {Component} from 'react';

export default class RoomStatus extends Component {
    render() {
        return(<div className="room-status">在线人数: {this.props.onlineCount}, 在线列表: {this.props.userhtml}</div>)
    }
}
```

消息列表`./components/Messages.js`

```js
// Messages消息列表
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Messages extends Component {

    // 组件更新时监控窗口滚动条，保持其在最下
    componentDidUpdate() {
        const messageList = ReactDOM.findDOMNode(this.refs.messages);
        window.scrollTo(0, messageList.clientHeight + 50);
    }
    render() {
        const myId = this.props.myId;

        // 每条消息，判断是否是自己
        const oneMessage = this.props.messages.map(function(message){
            return(
                    <Message key={message.msgId} msgType={message.type} msgUser={message.username} action={message.action} isMe={(myId == message.uid)? true : false} time={message.time}/>
                )
        })
        return(<div className="messages" ref="messages">{oneMessage}</div>)
    }
}

class Message extends Component {
    render() {


        if (this.props.msgType == 'system') {
            // 系统消息
            return (
                <div className="one-message system-message">
                    {this.props.msgUser} {(this.props.action=='login')? '进入了聊天室': '离开了聊天室'} <span className="time">&nbsp;{this.props.time}</span>
                </div>
            )
        } else {
            // 聊天消息，判断是否是自己
            return (
                <div className={(this.props.isMe)? 'me one-message':'other one-message'}>
                        <p className="time"><span>{this.props.msgUser}</span> {this.props.time}</p>
                        <div className="message-content">{this.props.action}</div>
                </div>
            )
        }
    }
}
```

消息输入框`./components/ChatInput.js`

```js
// ChatInput输入框
import React, {Component} from 'react';

export default class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            message:'',
            myId: this.props.myId,
            myName: this.props.myName
        }
    }

    // 监控input变化
    handleChange(e) {
        this.setState({message: e.target.value})
    }

    // 点击提交或按回车
    handleClick(e) {
        e.preventDefault();
        this.sendMessage()
    }
    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.sendMessage()
        }
        return false;
    }

    // 发送聊天信息
    sendMessage(e) {
        const message = this.state.message;
        const socket = this.state.socket;
        if (message) {
            const obj = {
                uid: this.state.myId,
                username: this.state.myName,
                message: message
            }
            socket.emit('message', obj);
            // 发送消息后清空输入框
            this.setState({message:''})
        }
        return false
    }
    render() {
        return(
            <div className="input-box">
                <div className="input">
                    <input type="text" maxLength="140" placeholder="按回车提交" value={this.state.message}
                    onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="button">
                    <button type="button" onClick={this.handleClick.bind(this)}>提交</button>
                </div>
            </div>
            )
    }
}
```

这样我们的聊天室功能就写完啦，随后修改下样式，就初具模型了！

<img src="{{  site.baseurl }}/img/chatdemo.gif" alt="" style="margin:auto">

[项目源码在此](https://github.com/ymyqwe/Websocket-React-Chatroom)，有问题可以在下面留言或者提交issue，也欢迎大家拍砖提交意见~


