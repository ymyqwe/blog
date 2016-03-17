---
layout:    post
title:     "前端问题小结"
subtitle:  
date:      2016-3-17
author:    "maniaU"
header-img: "img/thinking.jpg"
tags:      前端 技术 翻译
---

### 微信修改网页title，如何保证分享结果？

#### 1.使用微信的JS-SDK

#### 2.黑魔法：利用js修改微信title

	//需要jQuery
	var $body = $('body');
	document.title = 'title';
	// hack在微信等webview中无法修改document.title的情况
	var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	$iframe.on('load',function() {
		setTimeout(function() {
			$iframe.off('load').remove();
			}, 0);
		}).appendTo($body);


###  Javascript中本地对象、内置对象和宿主对象

>  本地对象，就是那些官方定义好了的对象。内置对象是本地对象的一种，其只包含Global对象和Math对象。而宿主对象则是那些官方未定义，你自己构建的对象加上DOM和BOM对象组成的。

###  如何优化页面加载速度

减少 HTTP 访问次数、CDN、minify、服务器增加缓存、CSS 放前面 JS 放后面、图片压缩、CSS Sprite。

### 读过那些Javascript的书？

《JavaScript高级程序设计》、《Javascript权威指南》、《Good parts of Javascript》

### AJAX获取数据的两个方式及他们的区别？

1.  GET请求会将参数跟在URL后进行传递，而POST请求则是作为HTTP消息的实体内容发送给WEB服务器。当然在Ajax请求中，这种区别对用户是不可见的。
2.  GET方式对传输的数据大小有限制，通常不能大于2KB,而POST方式传递的数据量要比GET方式大得多，理论上不受限制。
3.  GET方式请求的数据会被浏览器缓存起来，因此其他人就可以从浏览器的历史记录中读取到这些数据，例如账号和密码等。在某种情况下，GET方式会带来严重的安全问题。而POST方式相对来说就可以避免这些问题。
4.  GET方式和POST方式传递的数据在服务器端的获取也不相同。在PHP中，GET方式的数据可以用$_GET[]获取，而POST方式可以用$_POST[]获取。两种方式都可以用$_REQUEST[]来获取。

### BOOTSTRAP 2、3的区别

1.  3以移动优先；
2.  3以扁平化为特点，2则偏向凹凸化；
3.  3兼容性更高，如果你选择兼容IE8或6、7，那么就选择2。


