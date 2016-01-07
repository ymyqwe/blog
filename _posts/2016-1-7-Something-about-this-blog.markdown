---
layout:    post
title:     "关于这个博客"
date:      2016-1-7
author:    "maniaU"
header-img: "img/post-bg-01.jpg"
tags:      博客 生活
---

###目录

1.  [技术实现](#技术实现)
2.  [Jekyll配置](#jekyll)
3.  []()
4.  []()

学习前端怎么说也有半年多了，其实全心全意学习一样东西，半年的时间已经不短了，架设这个博客，也是为了记录自己的生活、学习细节。

大家随意看看吧。

##技术实现

####为什么使用[Github-Pages](https://pages.github.com/)？

通常我们在github上放置的代码，只是代码而已。但如果你放置的是<b>HTML</b>代码，那么你可以直接像其他网站一样浏览它的展示，所以你不需要额外购买服务器。

而[Jekyll](http://jekyllrb.com/)可以输出静态的<b>HTML</b>文件，使用git可以轻松将markdown转化为post，而且看到了[Hux Blog](huangxuan.me)这样的开源博客，于是就拿来主义了一下，同时自己修修改改，完成了搭建。

##Jekyll配置

####安装Jekyll
在terminal中，安装Jekyll，运行：

	gem install jekyll

jekyll就安装成功了，然后主题fork的是[Clean-Blog](https://github.com/IronSummitMedia/startbootstrap-clean-blog)，这是一个相当简洁干净的博客主题，修修改改加上tags，基本就只剩下内容填充了。

在terminal中，cd到你的jekyll文档下，运行：

	jekyll serve --watch

加上了 --watch后，我们会强制jekyll在每次保存后更新站点。

####更新`_config.yml`文件

	# Site settings
	title: 鱼头的博客
	header-img: img/home-bg2.jpg
	email: ymyymy_2@hotmail.com
	description: "鱼头的小博客。随便写的，随便看看吧。"
	baseurl: "/blog"

将其中的各项内容替换成你自己的就好了！

####在本地查看你的网站

在浏览器中输入 `http://localhost:4000/blog`以查看你的网站。

####设置`_includes`文件

该主题中，默认的页面添加


