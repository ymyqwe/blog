---
layout:    post
title:     "使用Compass开发移动页面"
subtitle:
date:      2017-1-8
author:    "maniaU"
header-img: "img/responsive-web-design.jpg"
tags:      前端 技术 HTML5 SASS
catalog:    true
---


## 安装

### 安装Ruby

安装Ruby就不在这边赘述了，请参考官方文档：[安装Ruby](https://www.ruby-lang.org/zh_cn/documentation/installation/)

### 安装Compass

```zsh
$ gem update --system
$ gem install compass
```

### 创建Compass项目

```zsh
$ compass create <myproject>
$ cd myproject
```

注意：<i>$是终端的占位符，你不需要输入它。</i>

就会生成如下的目录

```
--sass
--css
--images
--config.rb
```

其中config.rb就是项目的配置文件，配置文件中包含。


### 编译compass项目

compass的编译命令为


```zsh
$ compass compile
```

运行该命令后，sass目录下的scss文件会被编译成css文件，保存到配置文件中的css目录。


## 配置文件注意事项

### 配置文件注释问题

一般来说，编译后的css文件是默认有注释的，可以在配置文件中添加如下内容来取消注释

```
line_comments = false
```

这样的话就能取消注释，大大缩小css文件的大小。

### compass无法编译中文

开发的时候可能会用到中文注释、或者字体名称，但是compass默认是无法编译中文的，因此要在配置文件中加入

```
Encoding.default_external = 'utf-8'
```

同时，在你的scss文件加入

```
@charset 'utf-8';
```

这样compass就可以编译中文了。

### 生产环境自动压缩css文件

默认编译的css文件是不压缩的，但是我们发布的时候为了节省资源，css文件都需要压缩，可以在配置文件中加入如下内容

```
output_stlye = :compressed
```

或者在编译的时候加上

```
compass compile --output_stlye compressed
```

## 开发移动页面

### 使用rem适配移动端

Amfe阿里无线前端团队双11技术连载分享中提到了[手淘H5页面是如何实现多终端匹配](https://github.com/amfe/article/issues/17)，本文主要是在他们的基础上进行。

rem的原理是根据html根元素的font-size值对元素进行大小设置，一般的根元素即为<html></html>，比如在根元素设定font-size = 75px，
那么1rem的代表的长度为1 * 75px。

### 使用Compass转换px，rem

由于rem是写在css里面的，但是设计稿一般给的是px，所以需要将px转化为rem，如果你使用的是sublime text，有一个[cssrem](https://github.com/flashlizi/cssrem)插件可以供你使用，但是仍然需要每次输入px再按键转化为rem。

使用Compass我们可以利用函数来转化

```scss
$originWidth: 750px;
//设计稿的宽度
@function pxToRem($px) {
    @return 10*$px/$ClientWidth/1*1rem;
}
```

再按如下方式使用

```scss
div {
    width: pxToRem(750px);
}
```

这样就得到一个宽度为10rem(整个屏幕)的div了。

### 高清屏下面字体大小设置

设备像素比简称为dpr，定义了物理像素和设备独立响度的关系。它的值可以按下面的公式计算得到：

```
设备像素比 = 物理像素 / 设备独立像素
```

看下图可以明确解释dpr

```hbs
<img src="{{  site.baseurl }}/img/dpr.jpg" alt="" style="margin:auto">
```

众所周知，iPhone6的设备宽度和高度为375pt * 667pt,可以理解为设备的独立像素；而其dpr为2，根据上面公式，我们可以很轻松得知其物理像素为750pt * 1334pt。

屏幕增大之后，页面元素也会随之增大，但是有些比如段落文字的内容我们并不想增大，这时候不适合用rem作为字体单位，我们还是使用px，可以用如下@mixin来解决：

```scss
@mixin font-dpr ($font-size) {
    font-size: $font-size;
    [data-dpr="2"] & {
        font-size: $font-size * 2;
    }
    [data-dpr="3"] & {
        font-size: $font-size * 3;
    }
}
```

这样基本就可以解决移动端大部分的适配问题了。

如有问题，欢迎联系~