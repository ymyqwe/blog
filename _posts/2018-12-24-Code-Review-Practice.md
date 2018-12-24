---
layout: post
title: 'Code Review实践'
subtitle: 'Code Review Practice'
date: 2018-12-24
author: 'maniaU'
header-img: 'img/waterfall.jpg'
tags: 技术
catalog: true
---



## Code Review流程
<img src="{{  site.baseurl }}/img/code_review.png" alt="">


## 为什么要Code Review

1. 有了代码审核这个环节，提交人更会整理自己的代码，补充自己的注释，完善自己的TODOS，提升自己的代码
2. 代码审核也是个知识共享的过程（无论是对于审核人还是被审核人）
3. 可以提升团队的代码一致性
4. 可以提升团队的代码可读性
5. 通常自己是很难发现自己写的错误的，其他人来看你的代码则比较容易发现错误

## 什么时候做Code Review

代码审核应该在自动化流程之后进行，对于前端来说，在eslint，样式检测以及CI检测之后进行，并且需要在代码合到主线分支前进行

当一次变化过大时，可以拆分文件来做代码审核，分配给不同人不同文件，或者分次提交给一个人做代码审核

## 最佳实践

### 在提交代码审核之前先交流

首先让其他人知道你做了什么事情，为什么要这么做，对于你的场景有一个理解

### 使用自动化工具节省你的精力

比如eslint，或者自动单元测试的软件，解放你和他人的精力

### 提交信息需要规范

描述下你的commit做了什么事，以及是如何完成的，还有一些其他关联的，可以贴上链接

### 审核评论应该尽量谦虚，带有鼓励性质

不要咄咄逼人，列清利弊关系，讲道理（保持谦虚）

### 对于代码质量，审核人也有责任

如果发生了线上故障，不仅bug产生者有责任，代码审核人同样需要担责

### 400行和60分钟准则

一次代码审核，尽量控制在这个尺度内，否则审核人的效率将会大大降低，出错几率也会提升

### 代码审核清单

列出常见的错误，期望的代码形式，下面列举我自己总结的一个清单：

-  命名规范是否统一
-  `console.log()`等调试代码是否已去除（或者注释掉）
-  组件改动是否覆盖所有引用模块
-  业务和组件是否解耦
-  异常处理是否做得足够充分，比如对象和数据的取值

### 提前提交Code review

让审核人有足够的时间来审核代码，你自己也有足够时间来调整

### 被审核人须知

1. 建议都是好心的，不要感到被冒犯，应该讲道理
2. 回应每一个评论
3. 如果无法达成一致，尽量实时交流去交换意见


## 后记
<b>对事不对人（Love the coder. Hate the code）</b>，这句话无论是在工作还是学习中，都是非常实用的，谨记。

Reference
1. [Humanizing Peer Reviews](http://www.processimpact.com/articles/humanizing_reviews.pdf)
2. [Code Review Best Practice](https://medium.com/palantir/code-review-best-practices-19e02780015f)



