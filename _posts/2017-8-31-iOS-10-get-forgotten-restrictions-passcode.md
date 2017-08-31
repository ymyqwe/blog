---
layout:    post
title:     "iOS 10找回访问限制密码"
subtitle:  "iOS 10 get forgotten restrictions passcode"
date:      2017-8-31
author:    "maniaU"
header-img: "img/Hole.jpg"
tags:      iOS
catalog:    true
---

最近我的iPhone 6s换过了三次电池，但是仍然掉电很快，因此决定重装下系统来试试看能不能拯救回来。兴冲冲地备份了数据，准备抹除iPhone数据的时候，发现之前设置过访问限制密码，尝试了七次仍然不对之后，显示了请在1小时后重试，于是便开始搜索找回办法，这不，就在万能的google上找到了！视频是由iAppleJailbreaker发布在YouTube上的，因此直接搬运了过来，[原文链接点此](https://www.youtube.com/watch?v=Fi4R3y0UYjk)

## 原理简介

这个方法是根据苹果加密访问限制密码的算法来推算的，源码公布在[github](https://github.com/ios7hash/ios7hash/tree/gh-pages)上粗略看了一下是base64加密的，不得不感叹万能的网友实力之强大。

## 备份数据

首先，打开itunes，备份你的iphone数据，如下图，不要勾选加密数据，
<img src="{{site.baseurl}}/img/ios-backup.jpg"/>

## 搜索备份文件中对应加密数据

先去[iBackupBot](http://www.icopybot.com/download.htm)下载对应版本的软件，安装完成后运行，软件会自动搜索iPhone的备份文件，
进入目录<b>System Files -> HomeDomain -> Library</b>，然后在右边的搜索框中输入restrictions，即可搜索到密码文件。

<img src="{{site.baseurl}}/img/ios-content.jpeg"/>
<img src="{{site.baseurl}}/img/ios-search.jpeg"/>

打开这个文件，问你是否注册时选择取消，会显示如下图片，这样就得到了加密后的访问限制密码
<img src="{{site.baseurl}}/img/ios-code.jpeg"/>

## 破解密码

前往[Recove iOS](http://ios7hash.derson.us/)，将文件中的一长一短密码分别复制到网站的文本框中，选择一下破解密码的起始和结束数字，如下图

<img src="{{site.baseurl}}/img/ios-getcode.jpg"/>

随后会穷举密码直到破解密码
<img src="{{site.baseurl}}/img/ios-result.jpg"/>

这样就得到你的访问限制密码！iOS 10.3.3系统亲测可行，这样就可以愉快地重装系统了！！







