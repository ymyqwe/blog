---
layout:    post
title:     "Tmux终端服用"
subtitle:  ""
date:      2017-6-30
author:    "maniaU"
header-img: "img/flying-birds.jpg"
tags:      linux
catalog:    true
---

在vps上，虽然数据服务我们用systemctl来管理，但是其他诸如nodejs、python服务，总是需要会话保持功能。这时候就需要tmux了！

## 安装Tmux

```bash
yum install tmux
```

## 使用方法

### 开启或退出session

可以使用`tmux new -s yourname`来指定session名，

也可以直接

```bash
tmux
```

`ctrl+b d`就可以退出session。

### 重命名session

进入一个session之后，他的名字是按你开启session的顺序，给一个数字来命名的，你可以通过`ctrl+b $`修改。

### 新建窗格

`ctrl+b c`可以新建窗口，`ctrl+b %`可以水平分割窗口，`ctrl+b "`垂直分割窗口。

### 其他操作

查看所有session：`tmux ls`，转至某一session:`tmux a -t yourname`

### 快捷键

`ctrl+b`之后，各种快捷键操作

#### Session

```bash
s #list sessions
$ #name session
```

#### Windows(tabs)

```bash
c #create window
w #list windows
n #next window
p #previous window
f #find window
, #name window
& #kill window
```

#### Panes(splits)

```bash
%  #vertical split
"  #horizontal split

o  #swap panes
q  #show pane numbers
x  #kill pane
+  #break pane into window (e.g. to select text by mouse to copy)
-  #restore pane from window
⍽  #space - toggle between layouts
{ # (Move the current pane left)
} # (Move the current pane right)
z # toggle pane zoom
```

#### Misc

```bash
d #detach
t #big clock
? #list shortcuts
: #promt
```



