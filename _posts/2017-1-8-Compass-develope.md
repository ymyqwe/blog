---
layout:    post
title:     "监控屏幕触摸事件"
subtitle:  
date:      2016-5-5
author:    "maniaU"
header-img: "img/touch.jpg"
tags:      前端 技术 HTML5 SASS
---
Encoding.default_external = 'utf-8'

@charset 'utf-8';

$ClientWidth:750px;//UI效果图的宽度一半
@function pxToRem($px){
      @return 10*$px/$ClientWidth/1*1rem;
}

@mixin font-dpr ($font-size) {
    font-size: $font-size;
    [data-dpr="2"] & {
        font-size: $font-size * 2;
    }
    [data-dpr="3"] & {
        font-size: $font-size * 3;
    }
}

css2rem