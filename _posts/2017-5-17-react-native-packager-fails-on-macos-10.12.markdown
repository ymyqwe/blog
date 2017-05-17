---
layout:    post
title:     "React-Native无法在macOS Sierra 10.12上运行的问题"
subtitle:  "React Native packager fails on macOS 10.12 Sierra"
date:      2017-5-17
author:    "maniaU"
header-img: "img/flying-birds.jpg"
tags:      React 前端
catalog:    true
---

刚刚开始学习 React-Native 就碰到了许多坑，前端环境的配置真的是越来越复杂了，写篇文章记录下碰到的问题~

## cnpm 和 npm 的区别

npm(node package manager) 是 node 的包管理工具，cnpm 则是淘宝在国内的 npm 镜像，包的版本几乎是即时同步的，之前受不了 npm 的速度，就安装了 cnpm，用下来一直没有什么问题，但是在 RN 这边碰壁了。

由于 npm 和 cnpm 的包目录安装结构是不同的，

cnpm 的文件结构如下

<img src="{{site.baseurl}}/img/cnpm-tree.png"/>

npm 的文件结构如下
<img src="{{site.baseurl}}/img/npm-tree.png"/>

由于这样结构差异，在实际使用中总会碰到问题，因此我们使用 npm，但是包安装源指向国内

```
npm config set registry http://registry.cnpmjs.org
```

这样既使用 npm 的文件结构，又可以享受国内包的速度啦~

## react packer 无法运行

安装完了所有包之后，执行`react-native start --port 8081`，却碰到了如下问题

```
[11:45:02 AM] <START> Building Dependency Graph
[11:45:02 AM] <START> Crawling File System
[Hot Module Replacement] Server listening on /hot

React packager ready.

2017-05-09 11:45 node[6397] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2017-05-09 11:45 node[6397] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2017-05-09 11:45 node[6397] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
 ERROR  watch null EMFILE
{"code":"EMFILE","errno":"EMFILE","syscall":"watch null","filename":null}
Error: watch null EMFILE
    at exports._errnoException (util.js:873:11)
    at FSEvent.FSWatcher._handle.onchange (fs.js:1217:21)
```

谷歌了好一会，才明白是 macOS Sierra 由于对监控文件的数量有限制，因此需要做一些操作才能运行，步骤如下

### 增加最大文件限制

```
# 检查最大打开文件限制
sysctl kern.maxfiles

# 编辑 sysctl
sudo vim /etc/sysctl.conf

# 加上如下两行
kern.maxfiles=10485760
kern.maxfilesperproc=1048576

# 重新启动
sudo reboot

# 检查最大打开文件限制
sysctl kern.maxfiles
```

### 更新 watchman 4.6

```
# 克隆仓库
git clone https://github.com/facebook/watchman.git

# 变为 master 分支
git checkout -b v4.6.0 v4.6.0

# 运行编译器
./autogen.sh
./configure --enable-lenient --without-pcre --with-python
make
sudo make install

# 检查 watchman 版本
watchman -v

# result should be 4.6.0
```

接下来应该就能愉快地运行 react-native 啦~



