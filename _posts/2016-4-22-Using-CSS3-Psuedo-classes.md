---
layout:    post
title:     "CSS3新增伪类"
subtitle:
date:      2016-4-22
author:    "maniaU"
header-img: "img/railroad.jpg"
tags:      HTML 技术 CSS3
catalog:    true
---

## 结构型伪类

### :root
	:root {
		background-color: #fcfcfc;
	}

:root伪类指向页面的根元素，99%的情况下是html元素，比如：

	html {
		background-color: #fcfcfc;
	}

### :NTH-CHILD(N)

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

如果你使用更长的表格或列表，我们也可以像这样添加或者扣除数字：

	li:nth-child(4n+1) { ... }

*  第一个元素((4 × 0)-1)
*  第五个元素((4 × 1)-1)
*  第九个元素((4 × 2)-1)
*  第十三个元素((4 × 3)-1)
*  第十七元素((4 × 4)-1)
*  等等

同时，你也可以把`n`设置成负数，像这样：

	li:nth-child(-n + x) { ... }

比如你想要设置列表中的前五个元素，你可以这么做：

	li:nth-child(-n + 5) { ... }

*  第五个元素(-0 + 5)
*  第四个元素(-1 + 5)
*  第三个元素(-2 + 5)
*  第二个元素(-3 + 5)
*  第一个元素(-4 + 5)
*  无(-5 + 5)
*  无(-6 + 5)
*  等等

### NTH-LAST-CHILD(N)

他操作起来就像`:nth-child()`的反向，从最后一个往前数。

	li:nth-last-child(1) { ... }

上面的代码会选中列表中的最后一个元素，你也可以使用其他规则创建：

	li:nth-last-child(2n+1) { ... }

### NTH-OF-TYPE(N)

现在我们将对更精确种类的元素添加样式，比如，你想给文章中第一段一个更大的字体，你可以这么做：

	article p:nth-of-type(1) { font-size: 1.5em; }

又或者，你想让文章每隔一张图靠右，而另一张靠左，我们可以像下面这么做：

	article img:nth-of-type(odd) { float: right; }
	article img:nth-of-type(even) { float:left; }

Simon Foster创建了一个特别的[信息图像表](http://www.fortherecord.simonfosterdesign.com/)，他采用了如下的样式：

	ul#genre li:nth-of-type(1) {
	  width:32.9%;
	  background:url(images/orangenoise.jpg);
	}
	ul#genre li:nth-of-type(2) {
	  width:15.2%;
	  background:url(images/bluenoise.jpg);
	}
	ul#genre li:nth-of-type(3) {
	  width:13.1%;
	  background:url(images/greennoise.jpg);
	}

### :NTH-LAST-OF-TYPE(N)

与`nth-last-child`类似，`:nth-last-of-type()`从被选中的元素的末尾开始，向前计数。

### :FIRST-OF-TYPE与:LAST-OF-TYPE

如果`:nth-of-type()`和`:nth-last-of-type`对你来说太精确了，你可以一些简化的选择器，比如，我们可以用

	article p:first-of-type { font-size: 1.5em }

### ONLY-OF-TYPE

还有另外一种`type`选择器：`:only-of-type()`。这对于选择某种父元素的唯一类型子元素来说很有用，

比如，你可以思考一下这两个选择器之间的区别：

	p { font-size: 18px; }

与

	p:only-of-type {font-size: 18px; }

第一个选择器会选中页面中所有的p元素，而第二种会获取页面中只是它父元素中的唯一段落。

### :LAST-CHILD

CSS2中包含了`:first-child`特性，但是直到CSS3才出现`:last-child`的确让人觉得奇怪，它仅仅选择了它父元素的最后一个子元素而已，例如：

	li  {
		border-bottom: 1px solid #ccc
	}

	li:last-child  {
		border-bottom: none;
	}

这对于移除列表的底部边框很有效，你经常可以在WordPress小工具中看到他。

### :ONLY-CHILD

如果某个元素只有一个子元素，你可以这么选择它：`only-child`。与`only-of-type`不同，无论这是什么种类的元素，你都可以选择他，比如：

	li:only-child { ... }

### :EMPTY

最后的结构型伪类是`:empty`，他选择的是没有内容，没有子元素的元素，他在处理不同数据库输出的动态内容是有用的。

	#results:empty {
		background-color: #fcc;
	}

你可以在一个空的搜索框上使用这样的代码来吸引用户的注意。

## 目标型伪类

### :TARGET

这个伪类允许我们选择基于URL的元素，如果这个元素有一个识别器（比如跟着一个#），那么`:target`伪类会对使用这个ID识别器的元素增加样式。看下面这个链接：

	http://www.example.com/css3-pseudo-selectors#summary

这个有`summary`id的版块会被如下的样式渲染：

	:target {
		background-color: #fcc;
	}

这对于页面上的从外部内容链接过来的元素是很有效的。你也可以用它来标记一些内部的锚点。

## UI元素状态型伪类

### :ENABLED和:DISABLED

和`:checked`、`:enabled`和`:disabled`组成了三种UI元素状态型伪类。他们允许你根据他们的状态来对元素进行样式渲染，用户或开发者设计设置他们的状态来显示样式，比如：

	input:enabled {
		background-color: #dfd;
	}

	input:disabled {
		background-color: #fdd;
	}

这对于用户能不能填写内容来说有一个重要的反馈，你在Javascript控制的动态特性中经常可以看到他们。

### :CHECKED

第三个伪类是`:checked`，它处理了一个确认盒的状态。它也是对于用户的一个重要反馈，比如：

	input[type=radio]:checked {
		font-weight: bold;
	}

## 否定伪类

### :NOT

他选择了除了你指定的那个之外的元素，比如：

	:not(footer) { ... }

它选择了页面上所有元素，除了页脚。

## 一些思考

CSS3伪类选择器并不会占据样式表里大块大块的代码，他们是精确的，动态的，并且更可能添加页面的最后触碰，而不是设置一个整体的样式。可能你想要放弃一个列表的底部边框，或者在用户填表时给用户视觉反馈，<strong>这对于CSS3来说是完全可能的</strong>，在他的用途变得主流时，我期望它成为网页设置及们的常用工具。

如果你看到这些选择器的有趣的、精彩的用途，希望在下面的留言板中给我留言！