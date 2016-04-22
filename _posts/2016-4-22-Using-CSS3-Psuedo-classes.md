---
layout:    post
title:     "CSS3新增伪类"
subtitle:  
date:      2016-4-22
author:    "maniaU"
header-img: "img/railroad.jpg"
tags:      HTML 技术 CSS3
---

#### :root
	:root {
		background-color: #fcfcfc;
	}

:root伪类指向页面的根元素，99%的情况下是html元素，比如：

	html {
		background-color: #fcfcfc;
	}

#### :NTH-CHILD(N)

	ul li:nth-child(odd)	{
		bakcground-color: #666;
		color: #fff;
	}

这些样式将被应用到奇数项的li元素中，如果你想让另外一行有其他的样式，可以这么写：

	table tr:nth-child(even) { .... }

`:nth-child`也可以更精确地指向某一个元素，你可以指向list中的第三个的元素，像这样：

	li:nth-child(3) { ... }

尽管`n`在一个数列中，注意它并不从0开始。第一个元素是`:nth-child(1)`，第二个是`:nth-child(2)`，并以此类推。

我们也可以这样使用：

	li:nth-child(2n) { ... }

*  无(2 × 0)
*  第二个元素(2 × 1)
*  第四个元素(2 × 2)
*  第六个元素(2 × 3)
*  第八个元素(2 × 4)
*  等等

上面给出的例子和`nth-child(even)`一样，那么我们来看看下面一个例子

	li:nth-child(5n) { ... }

*  无(5 × 0)
*  第五个元素(5 × 1)
*  第十个元素(5 × 2)
*  第十五个元素(5 × 3)
*  第二十元素(5 × 4)
*  等等

