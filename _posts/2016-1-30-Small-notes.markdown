---
layout:    post
title:     "Front-End Development Notes"
subtitle:  "Tips"
date:      2016-1-30
author:    "maniaU"
header-img: "img/railroad.jpg"
tags:      技术
---

### 一些小笔记

### 目录
1.  [undefined is not a function ](#section-1)
2.  [transition in safari and firefox is ignored in inline elements.](#section-2)
3.  [Cannot read property 'getElementsByTagName' of null](#section-3)
4.  [ruby rails unable to load fontawesome ](#section-4) 

##Undefined is not a function
Sometimes when you use $(document).ready(function() {})
An error occurs.
It is a collision of jQuery library.
TURN
  $(document).ready(function() { })
into
jQuery(function($)) {  }

## CSS3 transition in safari and firefox is ignored in inline elements.
Display it in block or inline-block element.


## Cannot read property 'getElementsByTagName' of null
Document.body won't get a value assigned to it until the body element has been created.

## ruby rails unable to load fontawesome
Ruby rails loads fontawesome path needs to add 'config.assets.paths << Rails.root.join('app','assets') ' to the application.rb.
Change  font-awesome.min.css to font awesome.min.css.scss.rb
Change the url in the fontawesomw.css.scss.erb to '<%= asset_path("font/fontawesome-webfont.eot") + "?v=3.2.1" %>'
Besides, you need to restart rails server.
<!-- ##郁闷的感情历程 -->

