---
layout:    post
title:     "React Tornado的配合使用"
subtitle:  
date:      2017-1-9
author:    "maniaU"
header-img: "img/embrace_future.jpg"
tags:      前端 技术 React
---


最近准备把公司的项目使用react来开发，由于公司的服务端使用的是tornado，因此在开发过程中也遇到了一些困难，因此将开发中遇到的一些问题记下来。

### 目录

1.  [Babel配置](#babel)
2.  [Tornado数据处理](#tornado)
3.  [React组件开发](#react)

## Babel配置

虽然目前大多数浏览器已经支持了[ES6](http://es6-features.org/#Constants)，但是仍然避免不了有一些特性无法在现代浏览器中使用。[Babel](https://babeljs.io/)是JavaScript语法转换器，可以将ES6代码转换成浏览器支持的代码。

学习babel可以通过其手册[Babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/README.md)。

### 安装babel-cli

假设node和npm已经安装好，输入如下代码安装babel

```zsh
$ npm install -g babel-cli
```

安装完成后就可以编译文件了

```
$ babel index.js
```

如果要输出到指定文件，可输入如下指令

```sh
$ babel index.js --output-file compiled.js
//或者
$ babel index.js -o compiled.js
```

或者可以修改整个目录

```sb
$ babel src -d lib
```

### 使用npm配置babel-cli

首先初始化项目

```
$ npm init
```

再安装babel

```
$ npm install --save-dev babel-cli
```

在`package.json`中添加scripts命令


```json
{
    //  ...
    "scripts": {
        "build": "babel src -d lib"
    }
    //  ...
}
```

当然，这时候还不能编译，因为还没有配置`.babelrc`文件，在项目的根目录下创建.babelrc文件。为了让babel将ES6转为ES5，安装如下依赖

```
$ npm install --save-dev babel-preset-es2015
```

安装完成后，创建`.babelrc`文件，添加如下参数

```json
{
    "presets": [
        "react", "es2015"
    ]
}
```

此时我们就安装完所有的配置了，在终端中输入命令

    $ npm run build

随后即可编译ES6版本的React啦。

## Tornado数据处理

一般来说，Tornado的数据是通过render_string方法，但是render_string会将函数的参数全部转为字符串，假如我们得到的数据是new_list，则在html的js中，需要如下所写

```javascript
var new_list = { % raw new_list % }
```

这样我们得到的数据就是对象或者数组格式的，可以直接在react中操作。

如果数据是调用get或post接口返回的数据，则要求在接口输出数据的时候格式为json，假设调用接口返回的是send_line函数，则需要如下写接口

```python
def send_line(self, response={}):
    self.set_header("Content-Type", "application/json; charset=UTF-8")
    data = json.dumps(response)
    self.finish(data)
```

随后将数据通过`send_line`返回即可.

## React组件开发

### getInitialState

该方法用于初始化`this.state`的值，只在组件装在前调用一次。如果使用ES6语法，使用该方法会报错，需要在构造函数中初始化状态，比如

```javascript
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { data: new_list }
    }
    render() {
        // ...
    }
}
```

### 生命周期函数


#### 装载组件触发


##### componentWillMount

只会在装载之前调用一次，在`render`之前调用，可以在这个方法里调用`setState`改变状态，并且不会导致额外调用一次`render`

##### componentDidMount

只会在装载完成之后调用一次，在`render`之后调用，从这里开始可以通过`ReactDOM.findDOMNode(this)`获取到组件的DOM节点。

#### 更新组件触发

这些方法不会再首次`render`组件的周期调用

*  componentWillReceiveProps
*  shouldComponentUpdate
*  componentWillUpdate
*  componentDidUpdate

#### 卸载组件触发

*  componentWillUnmount

### 循环插入子元素

如果组件中包含通过循环插入的子元素，为了保证重新渲染UI的时候能够正确显示这些子元素，每个元素都需要通过一个特定的key属性指定一个唯一值。具体原因是因为
Diff的效率，具体原因可以参考[React官方文档](https://facebook.github.io/react/docs/reconciliation.html)，由于mongoDB的所有数据都有一个特定的id，因此正好可以使用，看下面的例子

```javascript
class Posts extends React.Component {
    render() {
        const onePost = this.props.data.map(function(post) {
            return (
                <Post key={post['_id']}/>
                )
        });
        return (
            <div>
                {onePost}
            </div>
            )
    }
}
```

### 组件间的通信

一般来说，父子间的组件是易于维护的模式，所以一般将组件封装到大的组件里，而父子组件间的通信则比较容易，比如在父组件给子组件设置props，然后子组件就可以通过props访问到父组件的数据及方法。

```javascript
class Refresh extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.props.handleRefresh()
    }
    render() {
        return(
            <div className="refresh" onClick={this.handleClick}>
            </div>
            )
    }
}


class Container extends React.Component {
    constructor(props) {
        super(props)
        this.handleRefresh = this.handleRefresh.bind(this);
        this.state = {data: new_list}
    }
    componentWillReceiveProps(nextProps) {
        this.handleRefresh(nextProps)
    }
    handleRefresh(props) {
        $.ajax({
            url:'your-url',
            type: 'GET',
        })
        .done(function(res) {
            this.setState({data: res})
        }.bind(this))
    }
    render() {
        return (
            <div className="bg">
                <Postlist data={this.state.data}/>
                <BottomButton />
                <Refresh handleRefresh={this.handleRefresh}/>
            </div>
            )
    }
}
```

以上代码显示了在一开始加载初始数据，如果点击刷新按钮(Refresh)，则会通过ajax加载新的数据，并且刷新父组件(Container)的数据，并且传输给子组件(Postlist)

现在就来开始全面拥抱React吧！



