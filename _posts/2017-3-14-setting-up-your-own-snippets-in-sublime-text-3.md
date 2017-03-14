---
layout:    post
title:     "在Sublime Text 3中设置自己的代码片段"
subtitle:  "Setting Up Your Own Snippets In Sublime Text 3"
date:      2017-3-14
author:    "maniaU"
header-img: "img/bird-dive.jpg"
tags:      技术 工具 效率
catalog:    true
---

写代码的时候，经常会在注释里写一下作者，创建时间等等，这样子也算留下了自己的印记，今天就教大家如何构建自己的注释代码块(Snippets)。

## Sublime Snippets(代码片段)

Sublime text 3 [Snippets](http://docs.sublimetext.info/en/latest/extensibility/snippets.html)是你需要反复输入相同片段的文本、代码时需要的重要功能。

Snippets可以储存在任何一个包的文件夹下，但是为了简单，现在建议先保存在`Packages/User`目录下

Snippets的文件格式是<i>.sublime-snippet</i>，通常Snippet的结构如下

```
<snippet>
    <content><![CDATA[Type your snippet here]]></content>
    <!-- Optional: Tab trigger to activate the snippet -->
    <tabTrigger>xyzzy</tabTrigger>
    <!-- Optional: Scope the tab trigger will be active in -->
    <scope>source.python</scope>
    <!-- Optional: Description to show in the menu -->
    <description>My Fancy Snippet</description>
</snippet>
```

我们只要把CDATA中的内容替换成自己的，就可以完成一个最简单的Snippets的编写。

## 创建自己的Snippets

接下来我们就以自己的代码注释为例，写一个Snippet。

首先，在sublime菜单栏中选择<strong>Tools | Developer | New Snippets...</strong>，然后输入

```
<snippet>
  <content><![CDATA[
/*
* @author:  ManiaU
* @createTime:  ${1:time}
* @description:  ${2:description}
*/
]]></content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>comm</tabTrigger>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <scope>source.js</scope>
</snippet>
```

其中`content`为Snippet的内容，`tabTrigger`是你输入什么内容时可以识别为Snippet，`scope`的表示生效的文件形式，`content`中`${}`为你输入完之后，tab键可以选中的内容，`${1:}`为你输入完之后直接选中，`${2:}`为按一次tab选中的内容，依此类推。

随后保存为<i>comment.sublime-snippet</i>，接下来随便在一个js文件中，输入`comm`，按下tab键盘，你的Snippet就出现了。

## 时间输入插件

Snippet虽然生成了，但是时间还是没有搞定，接下来就创建自己的插件，在sublime菜单栏中选择<strong>Tools | Developer | New Plugin...</strong>，输入以下内容

```python
import sublime, sublime_plugin
from time import localtime, strftime

class InsertDatetimeCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        sel = self.view.sel();
        for s in sel:
            self.view.replace(edit, s, strftime("%Y-%m-%d, %H:%M:%S GMT%z", localtime()))
```

保存为<i>insert_datetime.py</i>，然后在<strong>Preference | Key Bindings</strong>中加上

```
{
  "keys": ["super+ctrl+t"],
  "command": "insert_datetime"
}
```

这表示你按下⌘+Control+T，就可以插入时间了，配合上面的Snippet，插入注释后，加上时间和描述，就可以方便地生成自己的注释，如下

```javascript
/*
* @author:  ManiaU
* @createTime:  2017-03-14, 22:33:00 GMT+0800
* @description:  This is a test!
*/
```

## 后记

当然，Snippets的用处不仅如此，你可以在你的环境下配置各种各样的片段，可以大大提升的工作效率，大家一起去探索吧！







