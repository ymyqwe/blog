---
layout:    post
title:     "关于这个博客"
subtitle:  "人生第一篇博客诞生啦~"
date:      2016-1-7
author:    "maniaU"
header-img: "img/blog-bg.jpg"
tags:      博客 生活
---

### 目录

1.  [技术实现](#section-1)
2.  [Jekyll配置](#jekyll)
3.  [Github-Pages](#github-pages)

学习前端怎么说也有半年多了，其实全心全意学习一样东西，半年的时间已经不短了，架设这个博客，也是为了记录自己的生活、学习细节。

大家随意看看吧。

## 技术实现

#### 为什么使用[Github-Pages](https://pages.github.com/)？

通常我们在github上放置的代码，只是代码而已。但如果你放置的是<b>HTML</b>代码，那么你可以直接像其他网站一样浏览它的展示，所以你不需要额外购买服务器。

而[Jekyll](http://jekyllrb.com/)可以输出静态的<b>HTML</b>文件，使用git可以轻松将markdown转化为post，而且看到了[Hux Blog](huangxuan.me)这样的开源博客，于是就拿来主义了一下，同时自己修修改改，完成了搭建。

## Jekyll配置

#### 安装Jekyll
在terminal中，安装Jekyll，运行：

	gem install jekyll

jekyll就安装成功了，然后主题fork的是[Clean-Blog](https://github.com/IronSummitMedia/startbootstrap-clean-blog)，这是一个相当简洁干净的博客主题，修修改改加上tags，基本就只剩下内容填充了。

在terminal中，cd到你的jekyll文档下，运行：

	jekyll serve --watch

加上了 --watch后，我们会强制jekyll在每次保存后更新站点。

#### 更新`_config.yml`文件

	# Site settings
	title: 鱼头的博客
	header-img: img/home-bg2.jpg
	email: ymyymy_2@hotmail.com
	description: "鱼头的小博客。随便写的，随便看看吧。"
	baseurl: "/blog"

将其中的各项内容替换成你自己的就好了！

#### 在本地查看你的网站

在浏览器中输入 `http://localhost:4000/blog`以查看你的网站。

#### 设置`_includes`文件

该主题中，默认的页面会加载`_includes`文件夹中的页面，比如header、footer，所以想要更新页面的header和footer只需要在_includes文件夹中更新header.html和footer.html。在需要引用的页面添加代码即可。本博客中另外添加了网易云音乐的播放，为music.html，同样只需要引用即可。

#### 利用markdown写作

该静态博客使用markdown写作，对markdown不熟悉的同学可以参考[markdown中文文档]（http://www.appinn.com/markdown/），多加练习就会习惯。

## Github-Pages设置

[Github-Pages](https://pages.github.com/)文档比较简易，不过也很具有参考价值。

Github-Pages的默认域名是 <b>your-username.github.io/your-project-name</b>。

#### 设置你的存放目录

首先创建一个[github repository](https://github.com/new)，再clone到你的电脑。

<img src="{{  site.baseurl }}/img/repository.png" alt="">

#### 创建gh-pages分支

在terminal中cd到你的项目目录下，创建gh-pages分支：

	git checkout gh-pages

然后把你下载的主题文件都复制到你clone过来的目录下面。

#### 让gh-pages成为你的默认分支（可选）

首先，前往项目的分支设置，将gh-pages设置成为默认分支。

<img src="{{  site.baseurl }}/img/branch.png" alt="">

如果你只想要一个分支，你也可以[删除master分支](http://oli.jp/2011/github-pages-workflow/#deleting-master)，按照上面的教程来就可以了。一切搞定之后，

	git add .
	git commit -m "your-message"
	git push

就大功告成了，去<b>your-username.github.io/your-project-name</b>查看你的网站吧！


>第一次写博客，肯定会有不好的地方，欢迎大家拍砖哈。






	


