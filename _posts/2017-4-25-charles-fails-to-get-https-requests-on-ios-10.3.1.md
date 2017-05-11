---
layout:    post
title:     "Charles无法抓取iOS10.3.1 HTTPS请求的问题"
subtitle:  "Charles Fails to Get HTTPS Requests on iOS 10.3.1"
date:      2017-4-25
author:    "maniaU"
header-img: "img/Mythicalwildanimal.jpg"
tags:      技术 工具 效率
catalog:    true
---

最近一不小心更新了Charles和iOS，没有注意到iOS 10.3.1引入了新的证书允许设置，反复重装了Charles的证书，也一直没法抓包，网上找了好久的资料，由于这个更新才出来，所以一直没有解决，后来问了做iOS开发的同事，才明白了怎么回事。

报错情况如下

<img src="https://i.stack.imgur.com/GBpUd.png" alt="">

手机上安装好了Charles证书后，前往手机的设置->通用->关于本机->证书信任设置，将你安装好的证书设置为信任，如下图

<img src="{{  site.baseurl }}/img/CA.jpg" alt="">

这样，就能愉快地抓取iOS上的HTTPS包了~