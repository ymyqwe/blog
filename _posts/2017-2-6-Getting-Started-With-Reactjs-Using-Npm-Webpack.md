---
layout:    post
title:     "使用Npm, Webpack开发React应用"
subtitle:  
date:      2017-2-6
author:    "maniaU"
header-img: "img/bridge.jpg"
tags:      前端 技术 React Webpack
---


通过React，Facebook确确实实改变了我们对于前端开发UI组件的思路。尽管React的学习路线并不陡峭，但是对于初学者来说，它的一些工具([Babel](https://babeljs.io/)，[Webpack](https://webpack.github.io/docs/))和类库却是一个难点。

尽管这些工具对于React并不是必须的，但是为充分利用[ES6](http://es6-features.org/#Constants)，[JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)和打包的精髓，我们需要它们。

### 目录

1.  [安装、配置Webpack](#webpack)
2.  [设置Babel-Loader](#babel-loader)
3.  [Hello React](#hello-react)
4.  [便捷化使用webpack](#webpack-1)

###  安装、配置Webpack

[Webpack](https://webpack.github.io/docs/)是一个模块打包工具，它可以通过固定配置将模块依赖打包成静态文件。Webpack支持[加载器](http://webpack.github.io/docs/loaders.html)，这对于React来说简直是一个完美的工具。

首先，进入项目文件，安装webpack(请先安装node、npm)

    npm i webpack -S

使用Webpack的最佳方法是通过一个配置文件`webpack.config.js`来开展工作

    touch webpack.config.js

更新配置文件

    var webpack = require('webpack');
    var path = require('path');

    var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
    var APP_DIR = path.resolve(__dirname, 'src/client/app');

    var config = {
      entry: APP_DIR + '/index.jsx',
      output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
      }
    };

    module.exports = config;

`APP_DIR`是React应用的目录路径，`BUILD_DIR`则是打包文件的输出路径。

`config`对象中，<i>entry</i>表示入口文件，Webpack也支持多入口文件，<i>src/client/app</i> 目录下的 <i>index.js</i> 就是应用的入口文件。<i>output</i> 则表示打包过程完成之后Webpack需要作的输出。这里我们会创建 <i>bundle.js</i> 到 <i>src/client/public</i>。

接下来，在 <i>./src/client/app</i>中创建 <i>index.js</i>文件，添加如下代码

    console.log('Hello World!');

在终端中运行

    webpack -d

上面的代码通过开发者模式运行webpack并且在 <i>src/client/public</i>中打包生成了 <i>bundle.js</i>文件和关联的 <i>bundle.js.map</i>文件。

随后，在 <i>src/client</i>目录下创建 <i>index.html</i>文件，并引入 <i>bundle.js</i>文件

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>React Test</title>
    </head>
    <body>
        <div id="app">
            
        </div>
        <script src="public/bundle.js"></script>
    </body>
    </html>

如果此时你打开浏览器，在console log中就可以看到`Hello World!`

### 设置Babel-Loader

React在使用JSX和ES6的时候是更有效率的，但是JSX语法和ES6并不是在所有浏览器种都支持的。因此，我们需要一个语法转换器，这时候就需要balel了。

首先安装如下npm包

    npm i babel-loader babel-preset-es2015 babel-preset-react -S

<i>babel-preset-es2015</i>用于翻译ES6，<i>babel-preset-react</i>则用于翻译JSX语法。与webpack一样，<i>babel-loader</i>也需要配置文件，这边我们需要告诉他使用ES6，JSX插件。

创建一个`.babelrc`文件

    touch .babelrc

作如下修改

    {
        "presets": ["es2015", "react"]
    }

下一步是告诉webpack打包时使用babel-loader，打开 <i>webpack.config.js</i>并作如下更新

    //  ...
    var config = {
        //  ...
        module : {
            loaders : [
                {
                    test : /\.js$/,
                    include : APP_DIR,
                    loader : 'babel-loader'
                }
            ]
        }
    }

<i>loaders</i>属性接受作为数组的加载器，此处我们使用了 <i>babel-loader</i>。 每个 <i>loader</i>属性需要通过 <i>test</i>属性指定文件扩展。这里我们用正则表达式同时指定了 <i>.js</i>和 <i>.jsx</i>文件。<i>include</i>属性则指定了查找这些文件扩展的目录。<i>loader</i>代表了加载器的名字。

安装完毕后，我们来写一些React代码。

### Hello React

首先安装react和react-dom

    npm i react react-dom -S

用如下内容替换 <i>index.js</i>中的代码

    import React from 'react';
    import {render} from 'react-dom';

    class App extends React.Component {
        render() {
            return <p> Hello React! </p>;
        }
    }

    render(<App />, document.getElementById('app'));

随后执行如下指令来更新打包文件

    webpack -d

随后到浏览器中，你可以看到 <i>Hello React</i>。

### 便捷化使用webpack

#### 通过webpack监控变化

当你每次改变文件时执行webpack指令不是一个高效的工作方式。我们可以执行如下指令

    webpack -d --watch

这样webpack就以监控模式运行，无论检测到什么变化，它会重新自动打包文件。

如果你不喜欢刷新浏览器，那你可以使用[react-hot-loader](http://gaearon.github.io/react-hot-loader/getstarted/)

#### 使用npm作为执行工具

你可以使用npm来执行webpack的指令，更新`packages.json`

    {
        //  ...
        "scripts": {
            "dev": "webpack -d --watch",
            "build": "webpack -p"
        }
        //  ...
    }

随后在终端执行`npm run build`就可以执行webpack的生产模式，它可以自动压缩打包文件，而`npm run dev`则通过监控模式运行webpack

#### 做一个小项目

接下来我们来做一个小的React项目，一个监控移动端手势控制图片大小、旋转角度的app。

[View Demo](http://www.yumingyuan.me/gestures/index.html)(请用移动端打开哦~)

项目源码[在此](https://github.com/ymyqwe/gestures)

该项目fork自[eeandrew/gestures](https://github.com/eeandrew/gestures)







