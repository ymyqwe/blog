---
layout:    post
title:     "Python中文ASCII编码问题"
subtitle:  ""
date:      2016-5-23
author:    "maniaU"
header-img: "img/blog-bg.jpg"
tags:      技术 Python
---
最近在研究网页使用微信登陆拉取用户信息，而我使用的是tornado框架，拉取信息成功后，在网页前端输出的是正常的中文字符，但是在后台使用python print却是"\xe8\xe6"这样的字符，一查之后发现是控制台输出窗口按照`ASCII`编码输出了`utf8`编码字符串的结果。

如果想在控制台检查输出的结果，只要将要输出的信息添加上以上代码就可以了！

	abc.decode('utf-8')
	#abc为你获取到的数据

怎么样，是不是很简单，快去控制台看一看吧~