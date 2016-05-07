---
layout:    post
title:     "监控屏幕触摸事件"
subtitle:  
date:      2016-5-5
author:    "maniaU"
header-img: "img/touch.jpg"
tags:      前端 技术 HTML5
---

最近在开发一个新的移动端HTML5小游戏，用到了canvas，于是接触到了touch事件，对于获取触摸位置进行了一些研究，尝试了使用jquery的bind事件来感知屏幕触摸（但是jquery并不适合移动开发，请大家不要效仿，可以使用zepto或者jquery mobile），代码如下：

    var canvas = $("#canvas");
    var context = canvas[0].getContext("2d");
    //$("#canvas")[0] equals to document.getElementById("canvas")
    var inter;  //循环变量
    var e;   //鼠标事件全局变量

	canvas.bind('touchstart', function(eve) {
        e = eve;
        inter = setInterval(function() {
            interFun(e);
        }, 50)
    })
   	
	canvas.bind('touchmove', function(eve) {
        e = eve;
    })

    canvas.bind('touchend', function(eve) {
	    console.log(e.originalEvent.touches.length);
        clearInterval(inter);
    })

    //循环函数
    function interFun(e) {
        console.log(e);
        var touch = e.originalEvent.targetTouches[0];
        var mouseX = touch.pageX + document.body.scrollLeft - document.body.clientLeft - canvas[0].offsetLeft;
        var mouseY = touch.pageY + document.body.scrollTop  - document.body.clientTop - canvas[0].offsetTop;
        console.log(mouseX);
        console.log(mouseY);
        context.beginPath();
        drawStar(context, mouseX, mouseY);
        context.closePath();
        context.fill();
        context.stroke();
    }

其中使用到了jquery包装的事件，因此
